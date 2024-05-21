<?php

namespace App\Http\Controllers;
use App\Models\Ambiente_regla;
use Illuminate\Http\Request;

class AmbientereglaController extends Controller
{
    public function index(){
        $AmbRegla = Ambiente_regla::all();
        return response()->json($AmbRegla,200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'id_ambiente' => 'required|exists:ambientes,id',
            'id_regla' => 'required|exists:reglas,id',
        ]);


        $existingRelation = Ambiente_regla::where('id_ambiente', $request->id_ambiente)
            ->where('id_regla', $request->id_regla)
            ->exists();

        if ($existingRelation) {
            return response()->json(['error' => 'La combinación de regla y horario ya existe.'], 400);
        }

        $reglaAmbiente = new Ambiente_regla();
        $reglaAmbiente->id_ambiente = $request->id_ambiente;
        $reglaAmbiente->id_regla = $request->id_regla;
        $reglaAmbiente->save();


        return response()->json(['message' => 'Relación regla_ambiente creada con éxito.'], 201);
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
