<?php

namespace App\Http\Controllers\Reserva;

use App\Http\Controllers\Controller;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservas = Reserva::with('solicitud')->get();
        return response()->json(['reservas' => $reservas]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'fecha_reserva' => 'required|date',
            'solicitud_id' => 'required|exists:solicitudes,id',
        ]);

        $reserva = Reserva::create([
            'fecha_reserva' => $request->input('fecha_reserva'),
            'solicitud_id' => $request->input('solicitud_id'),
        ]);

        $reserva->load('solicitud');


        return response()->json(['message' => 'Reserva creada con éxito', 'reserva' => $reserva], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reserva = Reserva::with('solicitud')->findOrFail($id);
        return response()->json(['reserva' => $reserva]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'fecha_reserva' => 'required|date',
            'solicitud_id' => 'required|exists:solicitudes,id',
        ]);

        $reserva = Reserva::findOrFail($id);
        $reserva->update($request->all());

        $reserva->load('solicitud');

        return response()->json(['message' => 'Reserva actualizada con éxito', 'reserva' => $reserva]);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->delete();

        return response()->json(['message' => 'Reserva eliminada con éxito']);
    }
}
