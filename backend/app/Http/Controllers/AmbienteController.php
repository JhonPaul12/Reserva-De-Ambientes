<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Periodo;
use App\Models\Regla;
use Illuminate\Validation\ValidationException;


class AmbienteController extends Controller
{

    public function index()
    {
        $ambientes = Ambiente::all();
        return response()->json($ambientes,200);
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|unique:ambientes|max:40',
            'tipo' => 'required|max:40',
            'ubicacion' => 'required|max:200',
            'capacidad' => 'required|integer|min:0',
        ]);

        $ambiente = new Ambiente();
        $ambiente->nombre = $request->nombre;
        $ambiente->tipo = $request->tipo;
        $ambiente->ubicacion = $request->ubicacion;
        $ambiente->capacidad = $request->capacidad;

        $ambiente->save();
        return response()->json(['message' => 'Ambiente creado exitosamente'], 201);
    }


    public function show($id)
    {
        $ambiente = Ambiente::find($id);
        return response()->json($ambiente,200);
    }

    public function update(Request $request, $id)
    {
        $ambiente = Ambiente::find($id);
        $ambiente->nombre = $request->nombre;
        $ambiente->tipo = $request->tipo;
        $ambiente->ubicacion = $request->ubicacion;
        $ambiente->capacidad = $request->capacidad;
        $ambiente->save();

        return response()->json([
            'success'=> true,
            'data'=> $ambiente
        ],200);
    }
    public function destroy($id)
    {
        // Buscar el ambiente por su ID
        $ambiente = Ambiente::find($id);

        if (!$ambiente) {
            return response()->json([
                'success' => false,
                'message' => 'No se encontró el ambiente.'
            ], 404);
        }

        // Guardar el ID del ambiente antes de eliminarlo
        $idAmbiente = $ambiente->id;

        // Eliminar los periodos asociados al ambiente
        $periodosEliminados = Periodo::where('id_ambiente', $idAmbiente)->delete();

        // Eliminar las reglas asociadas al ambiente
        $reglasEliminadas = Regla::where('ambiente_id', $idAmbiente)->delete();

        // Eliminar el ambiente
        $ambiente->delete();

        if ($periodosEliminados || $reglasEliminadas) {
            return response()->json([
                'success' => true,
                'message' => 'El ambiente, las reglas y los periodos asociados se han eliminado correctamente.'
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'No se encontraron periodos o reglas asociados al ambiente para eliminar.'
            ], 404);
        }
    }

}
