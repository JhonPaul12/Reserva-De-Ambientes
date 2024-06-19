<?php

namespace App\Http\Controllers;
use App\Models\Excepcion;
use Illuminate\Http\Request;

class ExcepcionController extends Controller
{
    public function index()
    {
        $exc = Excepcion::all();
        return response()->json($exc,200);
    }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //      'fecha_excepcion' => 'required',
    //      'motivo' => 'required',
    //  ]);

    //  $horario = Excepcion::create([
    //         'fecha_excepcion' => $request->fecha_excepcion,
    //         'motivo' => $request->motivo
    //     ]);
    // }
    public function store(Request $request)
    {
        $request->validate([
            'fecha_excepcion' => 'required|date',
            'motivo' => 'required|string',
        ]);

        // Verificar si la fecha ya existe
        $existe = Excepcion::where('fecha_excepcion', $request->fecha_excepcion)->exists();

        if ($existe) {
            return response()->json([
                'success' => false,
                'message' => 'La fecha ya esta asociada a un feriado',
            ], 400); // Código de estado 409 Conflict
        }

        // Crear la excepción si la fecha no existe
        $horario = Excepcion::create([
            'fecha_excepcion' => $request->fecha_excepcion,
            'motivo' => $request->motivo,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Excepción creada con éxito',
            'data' => $horario
        ], 201);
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
