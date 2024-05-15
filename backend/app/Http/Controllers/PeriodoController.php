<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Periodo;
use App\Models\Regla;
use App\Models\Ambiente;
use App\Models\Horario;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class PeriodoController extends Controller
{
    public function index()
    {
        $periodo = Periodo::all();
        return response()->json($periodo, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_ambiente' => 'required',
            'id_horario' => 'required',
            'estado' => 'required',
            'fecha' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $ambiente = Ambiente::find($request->id_ambiente);

        if (!$ambiente) {
            return response()->json(['error' => 'No se encontró el ambiente asociado al período'], 404);
        }

        $regla = $ambiente->regla;

        if (!$regla) {
            return response()->json(['error' => 'No se encontró regla asociada al ambiente del período'], 404);
        }

        //$regla->fecha_final->copy()->addDay();
        $finish = Carbon::parse($regla->fecha_final);
        $fechaPeriodo = Carbon::parse($request->fecha);
        if ($fechaPeriodo < $regla->fecha_inicial || $fechaPeriodo > $finish) {
            return response()->json(['error' => 'La fecha del período está fuera del rango de la regla'], 400);
        }

        $est = $request->estado;
        $ini = $regla->fecha_inicial;
        $end = $regla->fecha_final;
        if ($est === 'libre') {
            $this->crearPeriodosRegulares($request->id_ambiente, $request->id_horario, $request->fecha, $est, $end);
            return response()->json(['message' => 'Periodos creados exitosamente'], 201);
        } else {
            $periodo = new Periodo($validator->validated());
            $periodo->save();
            return response()->json(['message' => 'El período se ha creado exitosamente'], 201);
        }
    }


    public function crearPeriodosRegulares($idAmbiente, $idHorario, $fecha, $estado, $fechaFinRegla)
    {
        $fechaActual = Carbon::parse($fecha);
        $fechaFin = Carbon::parse($fechaFinRegla);

        $datosComunes = [
            'id_ambiente' => $idAmbiente,
            'id_horario' => $idHorario,
            'estado' => $estado,
        ];

        while ($fechaActual <= $fechaFin) {
            $datosPeriodo = array_merge($datosComunes, ['fecha' => $fechaActual->toDateString()]);
            Periodo::create($datosPeriodo);
            $fechaActual->addWeek();
        }
    }


    public function show($id)
    {
        $p = Periodo::find($id);
        return response()->json($p, 200);
    }

    public function update(Request $request, $id)
    {
        $pe = Periodo::find($id);
        $pe->id_ambiente = $request->id_ambiente;
        $pe->id_horario = $request->id_horario;
        $pe->estado = $request->estado;
        $pe->fecha = $request->fecha;
        $pe->save();
        return response()->json([
            'success' => true,
            'data' => $pe
        ], 200);
    }

    public function destroy($id)
    {
        $periodosEliminados = Periodo::where('id_ambiente', $id)->delete();

        if ($periodosEliminados) {
            return response()->json([
                'success' => true,
                'message' => 'Los periodos asociados al ambiente se han eliminado correctamente.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No se encontraron periodos asociados al ambiente para eliminar.'
            ], 404);
        }
    }



    public function eliminarPeriodosPorHorario(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_ambiente' => 'required|exists:ambientes,id',
            'id_horario' => 'required|exists:horarios,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $idAmbiente = $request->id_ambiente;
        $idHorario = $request->id_horario;

        try {

            DB::table('periodos')
                ->where('id_ambiente', $idAmbiente)
                ->where('id_horario', $idHorario)
                ->delete();


            return response()->json(['message' => 'Los periodos se han eliminado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar los periodos: ' . $e->getMessage()], 500);
        }
    }

    public function showEstado($id)
    {
        $p = Periodo::find($id);
        $estado = $p->estado;
        return response()->json($estado, 200);
    }

    public function showHora(Request $request)
    {
        $idAmbiente = $request->input('id_ambiente');
        $horaInicio = $request->input('hora_inicio');
        $horaFin = $request->input('hora_fin');
        $fecha = $request->input('fecha');

        $periodos = Periodo::where('id_ambiente', $idAmbiente)
            ->whereDate('fecha', $fecha)
            ->get();

        foreach ($periodos as $periodo) {
            $horario = Horario::find($periodo->id_horario);
            if ($horario) {
                $horarioInicio = $horario->hora_inicio;
                $horarioFin = $horario->hora_fin;
                if ($horarioInicio == $horaInicio && $horarioFin == $horaFin) {
                    return response()->json($periodo->estado, 200);
                }
            }
        }
        return response()->json('No se encontró un horario con la misma hora de inicio y fin', 404);
    }
    public function stores(Request $request)
    {
        // Validar la solicitud
        $validator = Validator::make($request->all(), [
            'periodos.*.id_ambiente' => 'required',
            'periodos.*.id_horario' => 'required',
            'periodos.*.estado' => 'required',
            'periodos.*.fecha' => 'required|date',
        ]);

        // Si la validación falla, retornar los errores
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Array para almacenar períodos creados
        $periodosCreados = [];

        // Array para almacenar errores
        $errores = [];

        // Recorrer cada periodo enviado en la solicitud
        foreach ($request->input('periodos') as $periodoData) {
            $ambiente = Ambiente::find($periodoData['id_ambiente']);

            // Verificar si el ambiente existe
            if (!$ambiente) {
                $errores[] = ['id_ambiente' => $periodoData['id_ambiente'], 'error' => 'No se encontró el ambiente asociado al período'];
                continue;
            }

            // Obtener la regla asociada al ambiente
            $regla = $ambiente->regla;

            // Verificar si la regla existe
            if (!$regla) {
                $errores[] = ['id_ambiente' => $periodoData['id_ambiente'], 'error' => 'No se encontró regla asociada al ambiente del período'];
                continue;
            }

            // Verificar si la fecha del período está dentro del rango de la regla
            $fechaPeriodo = Carbon::parse($periodoData['fecha']);
            $fechaFin = Carbon::parse($regla->fecha_final);
            if ($fechaPeriodo < $regla->fecha_inicial || $fechaPeriodo > $fechaFin) {
                // Agregar el período al array de errores
                $errores[] = [
                    'id_ambiente' => $periodoData['id_ambiente'],
                    'fecha' => $periodoData['fecha'],
                    'error' => 'La fecha del período está fuera del rango de la regla'
                ];
                continue;
            }

            // Crear los periodos regulares si el estado es 'libre', de lo contrario, guardar el periodo
            $estado = $periodoData['estado'];
            $idAmbiente = $periodoData['id_ambiente'];
            $idHorario = $periodoData['id_horario'];
            $fecha = $periodoData['fecha'];

            if ($estado === 'libre') {
                $this->crearPeriodosRegulares($idAmbiente, $idHorario, $fecha, $estado, $regla->fecha_final);
            } else {
                $periodo = new Periodo($periodoData);
                $periodo->save();
                // Agregar el período al array de períodos creados
                $periodosCreados[] = $periodo;
            }
        }

        // Construir la respuesta
        $response = [];
        if (!empty($periodosCreados)) {
            $response['periodos_creados'] = $periodosCreados;
        }
        if (!empty($errores)) {
            $response['errores'] = $errores;
        }

        // Si no hay errores, retornar un mensaje de éxito
        if (empty($errores)) {
            $response['message'] = 'Periodos creados exitosamente';
        }

        return response()->json($response, 201);
    }
    public function allPeriodos()
    {
        $periodos = Periodo::with(['ambiente', 'horario'])->get();
        if ($periodos->isEmpty()) {
            return response()->json(['message' => 'No se encontraron periodos'], 404);
        }
        return response()->json($periodos, 200);
    }

    //recibir una fecha y un ambiente y listar los periodos libres, suceptibles a reserva.
    public function listarPeriodosLibresParaReserva(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_ambiente' => 'required|exists:ambientes,id',
            'fecha' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $idAmbiente = $request->input('id_ambiente');
        $fecha = $request->input('fecha');

        try {
            // Buscar todos los períodos libres para el ambiente y la fecha específicos
            $periodosLibres = Periodo::with('horario') // Cargar la relación 'horario'
                                ->where('id_ambiente', $idAmbiente)
                                ->where('fecha', $fecha)
                                ->where('estado', 'libre')
                                ->get();

            if ($periodosLibres->isEmpty()) {
                return response()->json(['error' => 'No se encontraron períodos libres para reserva'], 404);
            }

            // Construir un arreglo de respuesta para cada período libre
            $response = [];
            foreach ($periodosLibres as $periodo) {
                $response[] = [
                    'id' => $periodo->id,
                    'id_ambiente' => $periodo->id_ambiente,
                    'id_horario' => $periodo->id_horario,
                    'hora_inicio' => $periodo->horario->hora_inicio,
                    'hora_fin' => $periodo->horario->hora_fin,
                    'estado' => $periodo->estado,
                    'fecha' => $periodo->fecha,
                    'created_at' => $periodo->created_at,
                    'updated_at' => $periodo->updated_at,
                ];
            }

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al buscar períodos libres para reserva: ' . $e->getMessage()], 500);
        }
    }

    public function listarPeriodos($id)
{
    // Validar el ID del ambiente
    $validator = Validator::make(['id_ambiente' => $id], [
        'id_ambiente' => 'required|exists:ambientes,id',
    ]);
    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    try {
        // Buscar todos los períodos para el ambiente específico
        $periodos = Periodo::with('horario') // Cargar la relación 'horario'
                            ->where('id_ambiente', $id)
                            ->get();

        if ($periodos->isEmpty()) {
            return response()->json(['error' => 'No se encontraron períodos para el ambiente especificado'], 404);
        }

        // Utilizar una colección de Laravel para agrupar los períodos por ID de horario
        $periodosAgrupados = $periodos->groupBy('id_horario');

        // Construir un arreglo de respuesta con el primer período de cada grupo
        $response = [];
        foreach ($periodosAgrupados as $grupo) {
            $primerPeriodo = $grupo->first(); // Obtener el primer período del grupo
            $response[] = [
                'id_horario' => $primerPeriodo->id_horario,
                'hora_inicio' => $primerPeriodo->horario->hora_inicio,
                'hora_fin' => $primerPeriodo->horario->hora_fin,
                'dia' => $primerPeriodo->horario->dia,
                'estado' => $primerPeriodo->estado,
            ];
        }

        return response()->json($response, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al buscar períodos para el ambiente: ' . $e->getMessage()], 500);
    }
}

public function updateEstado(Request $request)
{
    $validator = Validator::make($request->all(), [
        'id' => 'required|exists:periodos,id',
        'estado' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    try {
        $periodo = Periodo::findOrFail($request->id);

        $periodo->estado = $request->estado;
        $periodo->save();

        return response()->json([
            'success' => true,
            'data' => $periodo
        ], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error al actualizar el estado del período: ' . $e->getMessage()], 500);
    }
}


}
