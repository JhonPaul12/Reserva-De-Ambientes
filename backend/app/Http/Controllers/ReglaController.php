<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Regla;
use App\Http\Controllers\PeriodoController;

class ReglaController extends Controller
{
    public function index()
    {
        $regla = Regla::all();
        return response()->json($regla, 200);
    }
    public function store(Request $request)
    {
        try {
            // Validar si el nombre ya está registrado
            $nombreExistente = Regla::where('nombre', $request->nombre)->exists();

            if ($nombreExistente) {
                return response()->json([
                    'success' => false,
                    'message' => 'El nombre ya está registrado.'
                ], 400);
            }

            // Verificar si ya existe una regla activa
            $activaExistente = Regla::where('activa', true)->first();

            // Si ya existe una regla activa y la nueva regla debe ser activa, establecer 'activa' en false para la nueva regla
            if ($activaExistente && $request->input('activa') == true) {
                $request->merge(['activa' => false]);
            }

            // Si pasan todas las validaciones, crear la nueva regla
            $datos = $request->validate([
                'nombre' => 'required|string|max:255',
                'fecha_inicial' => 'required|date',
                'fecha_final' => 'required|date|after_or_equal:fecha_inicial',
                'activa' => 'required|boolean',
            ]);

            $regla = Regla::create($datos);

            return response()->json([
                'success' => true,
                'data' => $regla,
                'message' => 'Regla creada con éxito'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la regla: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $regla = Regla::find($id);
        return response()->json($regla,200);
    }

    public function update(Request $request, $id)
    {
        $regla = Regla::find($id);
        $regla->ambiente_id = $request->ambiente_id;
        $regla->fecha_inicial = $request->fecha_inicial;
        $regla->fecha_final = $request->fecha_final;
        $regla->save();
        return response()->json([
            'success'=>true,
            'data'=>$regla
        ],200);

    }


    public function destroy($id)
    {
        $regla = Regla::find($id);
        if (!$regla) {
            return response()->json([
                'success' => false,
                'message' => 'No se encontró la regla.'
            ], 404);
        }
        $idAmbiente = $regla->ambiente_id;
        $regla->delete();
        $periodoController = new PeriodoController();
        $periodoController->destroy($idAmbiente);
        return response()->json([
            'success' => true,
            'message' => 'La regla y los periodos asociados al ambiente se han eliminado correctamente.'
        ], 200);
    }
    public function getReglasActivas()
    {
        $reglaActiva = Regla::where('activa', 1)->first();
        if ($reglaActiva) {
            return response()->json($reglaActiva, 200);
        } else {
            return response()->json(['message' => 'No active rule found'], 404);
        }
    }


}




    // public function store(Request $request)
    // {
    //     $datos = $request->validate([
    //         'nombre' => 'required|string|max:255|unique:reglas,nombre',
    //         'fecha_inicial' => 'required|date',
    //         'fecha_final' => 'required|date|after_or_equal:fecha_inicial',
    //         'activa' => 'required|boolean',
    //     ]);

    //     // Verificación adicional para nombres "primer semestre" y "segundo semestre"
    //     if (in_array($datos['nombre'], ['Primer semestre', 'Segundo semestre'])) {
    //         $fechaInicial = new \DateTime($datos['fecha_inicial']);
    //         $fechaFinal = new \DateTime($datos['fecha_final']);
    //         $interval = $fechaInicial->diff($fechaFinal);

    //         if ($interval->m > 5 || ($interval->y == 1 && $interval->m == 0)) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Las fechas para "primer semestre" o "segundo semestre" deben ser menores a 6 meses.',
    //             ], 422);
    //         }
    //     }

    //     // Verificación adicional para nombres "invierno" y "verano"
    //     if (in_array($datos['nombre'], ['Invierno', 'Verano'])) {
    //         $fechaInicial = new \DateTime($datos['fecha_inicial']);
    //         $fechaFinal = new \DateTime($datos['fecha_final']);
    //         $interval = $fechaInicial->diff($fechaFinal);

    //         if ($interval->m > 1 || ($interval->m == 1 && $interval->d > 0) || $interval->y >= 1) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Las fechas para "invierno" o "verano" deben ser de máximo un mes.',
    //             ], 422);
    //         }
    //     }

    //     try {
    //         // Crear la regla
    //         $regla = Regla::create($datos);

    //         // Ejecutar el método store de AmbienteReglaController
    //         $ambienteReglaController = new AmbientereglaController();
    //         $response = $ambienteReglaController->store(new Request([
    //             'id_regla' => $regla->id
    //         ]));

    //         // Verificar la respuesta del método store de AmbienteReglaController
    //         if ($response->getStatusCode() === 201) {
    //             return response()->json([
    //                 'success' => true,
    //                 'data' => $regla,
    //                 'message' => 'Regla y relaciones regla_ambiente creadas con éxito'
    //             ], 201);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Error al crear las relaciones regla_ambiente'
    //             ], $response->getStatusCode());
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Error al crear la regla: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }

        //Elemer
    // public function store(Request $request)
    // {
    //     $datos = $request->validate([
    //         'nombre' => 'required|string|max:255|unique:reglas,nombre',
    //         'fecha_inicial' => 'required|date',
    //         'fecha_final' => 'required|date|after_or_equal:fecha_inicial',
    //         'activa' => 'required|boolean',
    //     ]);

    //     try {
    //         $regla = Regla::create($datos);
    //         return response()->json([
    //             'success' => true,
    //             'data' => $regla,
    //             'message' => 'Regla creada con éxito'
    //         ], 201);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Error al crear la regla: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }