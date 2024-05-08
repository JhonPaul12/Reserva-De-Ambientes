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
        return response()->json($periodo,200);
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
        return response()->json($p,200);
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
            'success'=>true,
            'data'=>$pe
        ],200);
    }

    public function destroy($id)
    {
        $pe = Periodo::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $pe
        ],200);
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
        $estado=$p->estado;
        return response()->json($estado,200);
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
}
