<?php

namespace App\Http\Controllers;
use App\Models\Notificacion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    public function index()
    {
        $notificacion = Notificacion::all();
        return response()->json($notificacion, 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id_usuario' =>'required|exists:users,id',
            'id_solicitud' => 'nullable|exists:solicitudes,id',
            'contenido' => 'required',
            'visto' => 'required|boolean',
        ]);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $notificacion = Notificacion::create($validator->validated());

            return response()->json(['message' => 'Notificación creada exitosamente', 'data' => $notificacion], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la notificación: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $noti = Notificacion::find($id);
        return response()->json($noti,200);
    }

    public function destroy($id)
    {
        try {
            $notificacion = Notificacion::findOrFail($id);

            $notificacion->delete();

            return response()->json(['message' => 'Notificación eliminada exitosamente'], 200);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Error al eliminar la notificación: ' . $e->getMessage()], 500);
        }
    }
}
