<?php

namespace App\Http\Controllers\Solicitud;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitudes = Solicitud::all();
        
        return response() -> json([
            'solicitudes' => $solicitudes
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validador = Validator::make($request->all(),[
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'hora_inicio' => 'required',
            'hora_fin' => 'required',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required'
        ]);

        if($validador->fails()){
            $data = [
                'message' => 'Error en la validacion de datos',
                'erros' => $validador->errors(),
                'status' => 400
            ];
            return response()->json($data,400);
        }

        $solicitud = Solicitud::create([
            'motivo' => $request->motivo,
            'fecha_solicitud' => $request->fecha_solicitud,
            'hora_inicio' => $request->hora_inicio,
            'hora_fin' => $request->hora_fin,
            'estado' => $request->estado,
            'numero_estudiantes' => $request->numero_estudiantes
        ]);
        
        if(!$solicitud){
            $data = [
                'message' => 'Error al crear una solicitud',
                'status' => 500
            ];
            return response()->json($data,500);
        }
        $data = [
            'solicitud' => $solicitud,
            'status' => 201
        ];

        return response()->json($data,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $solicitud = Solicitud::find($id);

        if(!$solicitud){
            $data = [
                'message' => 'Solicitud no encontrada',
                'status' => 404
            ];
            return response()->json($data,404);
        }

        $data = [
            'solicitud' => $solicitud,
            'status' => 200
        ];

        return response()->json($data,200);
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
        $solicitud = Solicitud::find($id);
        if(!$solicitud){
            $data = [
                'message' => 'Solicitud no encontrada',
                'status' => 404 
            ];
        }

        $validador = Validator::make($request->all(),[
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'hora_inicio' => 'required',
            'hora_fin' => 'required',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required'
        ]);

        if($validador->fails()){
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validador->errors(),
                'status' => 400
            ];
        }

        $solicitud->motivo = $request->motivo;
        $solicitud->fecha_solicitud = $request->fecha_solicitud;
        $solicitud->hora_inicio = $request->hora_inicio;
        $solicitud->hora_fin = $request->hora_fin;
        $solicitud->estado = $request->estado;
        $solicitud->numero_estudiantes = $request->numero_estudiantes;

        $solicitud->save();

        $data = [
            'message' => 'Solicitud actualizado',
            'solicitud' => $solicitud, 
            'status' => 200
        ];

        return response()->json($data,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solicitud = Solicitud::find($id);

        if(!$solicitud){
           $data = [
               'message' => 'Solicitud no encontrada',
               'status' => 404
           ];
           return response()->json($data,404);
       }

       $solicitud->delete();
       
       $data = [
           'message' => 'Solicitud eliminada',
           'status' => 200
       ];

       return response()->json($data,200);
    }
}
