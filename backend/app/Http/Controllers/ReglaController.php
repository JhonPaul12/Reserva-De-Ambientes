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
        'ambiente_id' =>'required|unique:reglas',
        'fecha_inicial' => 'required|date',
        'fecha_final' => 'required|date',
    ]);

    // Verificar si ya existe una regla para el mismo ambiente
    $reglaExistente = Regla::where('ambiente_id', $datos['ambiente_id'])->exists();

    if ($reglaExistente) {
        return response()->json(['error' => 'Ya existe una regla para este ambiente'], 400);
    }

    // Si no hay regla existente, crear una nueva regla
    $regla = new Regla($datos);
    $regla->save();

    return response()->json($regla, 201);
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

        // Guardar el ID del ambiente asociado a la regla antes de eliminarla
        $idAmbiente = $regla->ambiente_id;

        // Eliminar la regla
        $regla->delete();

        // Instanciar el controlador de Periodo
        $periodoController = new PeriodoController();

        // Llamar al método destroy del controlador de Periodo para eliminar los periodos asociados al ambiente
        $periodoController->destroy($idAmbiente);

        return response()->json([
            'success' => true,
            'message' => 'La regla y los periodos asociados al ambiente se han eliminado correctamente.'
        ], 200);
    }

}
