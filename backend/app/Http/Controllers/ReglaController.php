<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Regla;
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
            'ambiente_id' =>'required',
            'fecha_inicial' => 'required|date',
            'fecha_final' => 'required|date',
        ]);
        $regla = new Regla($datos);
        $regla->save();
        return response()->json($regla,201);
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
        $regla = Regla::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $regla
        ],200);
    }
}
