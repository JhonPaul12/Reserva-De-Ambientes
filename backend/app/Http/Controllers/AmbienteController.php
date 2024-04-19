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

    public function store(Request $request)
    {
        $datos = $request->validate([
        'nombre' => 'required|string|max:40',
        'tipo' => 'required|string|max:40',
        'ubicacion' => 'required|string|max:200',
        'capacidad' => 'required|integer|min:1',
        ]);

        $ambiente = Ambiente::firstOrCreate(['nombre' => $datos['nombre']], $datos);

        return response()->json($ambiente, 201);
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
