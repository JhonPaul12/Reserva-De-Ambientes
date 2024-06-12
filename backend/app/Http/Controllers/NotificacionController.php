<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeMail;
use App\Models\Notificacion;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
            'id_usuario' => 'required|exists:users,id',
            'id_solicitud' => 'nullable|exists:solicitudes,id',
            'titulo' => 'required',
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
        return response()->json($noti, 200);
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

    public function index2()
    {
        $notificacion = Notificacion::with('user', 'solicitud.materia', 'solicitud.ambiente')->get();
        return response()->json($notificacion, 200);
    }

    public function nombre_usuario_Notificacion($idUsuario = null)
    {
        $query = Notificacion::with('user', 'solicitud.materia', 'solicitud.ambiente');

        if ($idUsuario) {
            $query->whereHas('user', function ($query) use ($idUsuario) {
                $query->where('id', $idUsuario);
            });
        }
        $notificaciones = $query->get();
        return response()->json($notificaciones, 200);
    }



    public function solicitudID($idSolicitud = null)
    {
        $query = Notificacion::query()->select('titulo');

        if ($idSolicitud) {
            $query->where('id_solicitud', $idSolicitud);
        }

        $contenidos = $query->pluck('titulo');
        return response()->json($contenidos, 200);
    }
    public function store2(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'title' => 'required',
            'description' => 'required',
        ]);

        $title = $request->title;
        $description = $request->description;

        Mail::to($request->email)->send(new WelcomeMail($title, $description));

        return response()->json(['message' => 'Correo enviado!']);
    }
    public function notificacionSinVista($idUsuario = null)
    {
        $query = Notificacion::with(['solicitud' => function ($query) {
            $query->select('id', 'estado');
        }])
            ->where('visto', 1)
            ->select('id', 'titulo', 'contenido', 'id_solicitud');

        if ($idUsuario) {
            $query->whereHas('user', function ($query) use ($idUsuario) {
                $query->where('id', $idUsuario);
            });
        }

        $notificaciones = $query->get()->map(function ($notificacion) {
            return [
                'id' => $notificacion->id,
                'titulo' => $notificacion->titulo,
                'contenido' => $notificacion->contenido,
                'estado' => $notificacion->solicitud->estado,
            ];
        });

        return response()->json($notificaciones, 200);
    }
    public function cambiarEstadoNotificacion($idNotificacion)
    {
        $notificacion = Notificacion::find($idNotificacion);

        if (!$notificacion) {
            return response()->json(['message' => 'Notificación no encontrada'], 404);
        }

        $notificacion->visto = 0;

        $notificacion->save();

        return response()->json(['message' => 'Estado de notificación actualizado correctamente'], 200);
    }
}
