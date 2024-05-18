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
    $datos = $request->validate([
        'nombre' => 'required|string|max:255|unique:reglas,nombre',
        'fecha_inicial' => 'required|date',
        'fecha_final' => 'required|date|after_or_equal:fecha_inicial',
        'activa' => 'required|boolean',
    ]);

    try {
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

}
