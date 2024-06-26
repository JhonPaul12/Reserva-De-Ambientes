<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
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
        $ambiente = Ambiente::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $ambiente
        ],200);
    }
}
