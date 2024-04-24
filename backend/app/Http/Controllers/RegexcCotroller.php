<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reg_exc;

class RegexcCotroller extends Controller
{
    public function index()
    {
        $regex = Reg_exc::all();
        return response()->json($regex, 200);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'regla_id' =>'required',
            'excepcion_id' =>'required',
            'tipo' => 'required|date',
        ]);
        $regla = new Reg_exc($datos);
        $regla->save();
        return response()->json($regla,201);
    }

    public function show($id)
    {
        $regla = Reg_exc::find($id);
        return response()->json($regla,200);
    }

    public function update(Request $request, $id)
    {
        $regla = Reg_exc::find($id);
        $regla->regla_id = $request->regla_id;
        $regla->excepcion_id = $request->excepcion_id;
        $regla->tipo = $request->tipo;
        $regla->save();
        return response()->json([
            'success'=>true,
            'data'=>$regla
        ],200);
    }

    public function destroy($id)
    {
        $regla = Reg_exc::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $regla
        ],200);
    }
}
