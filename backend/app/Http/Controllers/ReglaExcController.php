<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Regla_exc;
class ReglaExcController extends Controller
{

    public function index()
    {
        $reglaExc = Regla_exc::all();
        return response()->json($reglaExc, 200);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'regla_id' => 'required',
            'excepcion_id' => 'required',
        ]);
        $reglaExc = new Regla_exc($datos);
        $reglaExc->save();
        return response()->json($reglaExc,201);
    }

    public function show($id)
    {
        $reglaExc = Regla_exc::find($id);
        return response()->json($reglaExc,200);
    }

    public function destroy($id)
    {
        $regla = Regla_exc::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $regla
        ],200);
    }
}

