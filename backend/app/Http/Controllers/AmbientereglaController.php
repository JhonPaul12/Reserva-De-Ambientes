<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
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
    // Validar la entrada
    $request->validate([
        'id_regla' => 'required|exists:reglas,id',
    ]);

    // Obtener todos los ambientes
    $ambientes = Ambiente::all();

    // Inicializar un contador para contar cuántas relaciones nuevas se han creado
    $createdRelationsCount = 0;

    foreach ($ambientes as $ambiente) {
        // Verificar si la relación ya existe
        $existingRelation = Ambiente_regla::where('id_ambiente', $ambiente->id)
            ->where('id_regla', $request->id_regla)
            ->exists();

        if (!$existingRelation) {
            // Crear una nueva relación
            $reglaAmbiente = new Ambiente_regla();
            $reglaAmbiente->id_ambiente = $ambiente->id;
            $reglaAmbiente->id_regla = $request->id_regla;
            $reglaAmbiente->save();
            $createdRelationsCount++;
        }
    }

    if ($createdRelationsCount === 0) {
        return response()->json(['message' => 'No se crearon nuevas relaciones porque todas ya existían.'], 200);
    } else {
        return response()->json(['message' => "Relación regla_ambiente creada con éxito para $createdRelationsCount ambientes."], 201);
    }
}

    // public function store(Request $request)
    // {

    //     $request->validate([
    //         'id_ambiente' => 'required|exists:ambientes,id',
    //         'id_regla' => 'required|exists:reglas,id',
    //     ]);


    //     $existingRelation = Ambiente_regla::where('id_ambiente', $request->id_ambiente)
    //         ->where('id_regla', $request->id_regla)
    //         ->exists();

    //     if ($existingRelation) {
    //         return response()->json(['error' => 'La combinación de regla y horario ya existe.'], 400);
    //     }

    //     $reglaAmbiente = new Ambiente_regla();
    //     $reglaAmbiente->id_ambiente = $request->id_ambiente;
    //     $reglaAmbiente->id_regla = $request->id_regla;
    //     $reglaAmbiente->save();


    //     return response()->json(['message' => 'Relación regla_ambiente creada con éxito.'], 201);
    // }


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
