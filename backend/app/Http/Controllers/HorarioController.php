<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horario;
class HorarioController extends Controller
{
    public function index()
    {
       $horario = Horario::all();
       return response()->json($horario,200);
    }

    public function store(Request $request)
    {
    $request->validate([
        'dia' => 'required|string',
        'hora_inicio' => 'required',
        'hora_fin' => 'required',
    ]);

    $horario = Horario::create([
        'dia' => $request->dia,
        'hora_inicio' => $request->hora_inicio,
        'hora_fin' => $request->hora_fin,
    ]);

    return response()->json($horario, 201);
    }
    public function show($id)
    {
        $horario = Horario::find($id);
        return response()->json($horario,200);
    }

    public function update(Request $request, $id)
    {
        $horario = Horario::find($id);
        $horario->dia = $request->dia;
        $horario->hora_inicio = $request->hora_inicio;
        $horario->hora_fin = $request->hora_fin;
        $horario->save();

        return response()->json([
            'success'=> true,
            'data'=> $horario
        ],200);
    }


    public function destroy($id)
    {
        $horario = Horario::find($id)->delete();
        return response()->json([
            'success'=>true,
            'data'=> $horario
        ],200);
    }

    public function buscarHorario(Request $request){
        $dia = $request->dia;
        $horaInicio = $request->hora_inicio;
        $horaFin = $request->hora_fin;

        // Buscar el horario con los mismos datos
        $horario = Horario::where('dia', $dia)
            ->where('hora_inicio', $horaInicio)
            ->where('hora_fin', $horaFin)
            ->first();

        // Verificar si se encontró un horario con los mismos datos
        if ($horario) {
            return response()->json(['id_horario' => $horario->id], 200);
        } else {
            return response()->json(['message' => 'No se encontró un horario con los mismos datos'], 404);
        }
    }


}
