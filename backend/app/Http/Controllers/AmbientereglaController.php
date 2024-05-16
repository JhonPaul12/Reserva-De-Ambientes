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
        // Validación de los datos recibidos
        $request->validate([
            'id_ambiente' => 'required|exists:ambientes,id',
            'id_regla' => 'required|exists:reglas,id',
        ]);

        // Verifica si ya existe una relación con la misma regla_id e id_horario
        $existingRelation = Ambiente_regla::where('id_ambiente', $request->id_ambiente)
            ->where('id_regla', $request->id_regla)
            ->exists();

        // Si ya existe, retorna un mensaje de error
        if ($existingRelation) {
            return response()->json(['error' => 'La combinación de regla y horario ya existe.'], 400);
        }

        // Si no existe, crea un nuevo registro en la tabla regla_ambiente
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
