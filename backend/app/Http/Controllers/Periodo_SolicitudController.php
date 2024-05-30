<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use App\Models\Periodo_Solicitud;
use App\Models\Solicitud;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;

class Periodo_SolicitudController extends Controller
{
    public function index()
    {
        $periodo_solicitudes = Periodo_Solicitud::with('periodo.horario', 'solicitud.users', 'solicitud.ambiente')->get();
        return response()->json($periodo_solicitudes, 200);
    }
    public function index2()
    {
        $periodo_solicitudes = Periodo_Solicitud::with('periodo.horario', 'solicitud.users', 'solicitud.ambiente')->get();

        $grouped = $periodo_solicitudes->groupBy('solicitud_id')->map(function ($items, $key) {
            return [
                'solicitud_id' => $key,
                'solicitud' => $items->first()->solicitud,
                'periodos' => $items->map(function ($item) {
                    return [
                        'periodo_id' => $item->periodo_id,
                        'periodo' => $item->periodo
                    ];
                })->values()
            ];
        })->values();

        return response()->json($grouped, 200);
    }
    public function nombre_usuario($nombreUsuario )
    {
        $query = Periodo_Solicitud::with('periodo.horario', 'solicitud.users', 'solicitud.ambiente');

        if ($nombreUsuario) {
            $users = User::where('name', $nombreUsuario)->get();

            if ($users->isEmpty()) {
                return response()->json(['message' => 'No se encontraron usuarios con ese nombre'], 404);
            }

            $query->whereHas('solicitud.users', function ($query) use ($users) {
                $query->whereIn('users.id', $users->pluck('id'));
            });
        }

        $periodo_solicitudes = $query->get()->groupBy('solicitud_id')->map(function ($items, $key) {
            return [
                'solicitud_id' => $key,
                'solicitud' => $items->first()->solicitud,
                'periodos' => $items->map(function ($item) {
                    return [
                        'periodo_id' => $item->periodo_id,
                        'periodo' => $item->periodo
                    ];
                })->values()
            ];
        })->values();
        return response()->json($periodo_solicitudes, 200);
    }









    public function index3()
    {
        $periodo_solicitudes = Periodo_Solicitud::with('solicitud')->get();
        return response()->json($periodo_solicitudes, 200);
    }
    
    public function obtenerSolicitudesPorFechaYHorario2($fechaSolicitud, $horaInicio, $horaFin)
    {
        $fecha = DateTime::createFromFormat('Y-m-d', $fechaSolicitud);
        if (!$fecha) {
            return response()->json(['message' => 'Formato de fecha inválido. Use el formato año-mes-día'], 400);
        }
        $fechaFormateada = $fecha->format('Y-m-d');

        if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFin)) {
            return response()->json(['message' => 'Formato de hora inválido. Use el formato HH:MM:SS'], 400);
        }

        $periodoSolicitudes = Periodo_Solicitud::whereHas('solicitud', function ($query) use ($fechaFormateada) {
            $query->whereDate('fecha_solicitud', $fechaFormateada)
                ->where('estado', 'Aceptada');
        })->whereHas('periodo.horario', function ($query) use ($horaInicio, $horaFin) {
            $query->where('hora_inicio', '>=', $horaInicio)
                ->where('hora_fin', '<=', $horaFin);
        })->with(['solicitud.ambiente' => function ($query) {
            $query->select('id', 'nombre');
        }])->get();

        if ($periodoSolicitudes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron ambientes para la fecha y el horario especificados'], 404);
        }

        $result = $periodoSolicitudes->map(function ($periodoSolicitud) {
            return [
                $periodoSolicitud->solicitud->ambiente->nombre
            ];
        })->unique()->values()->all();

        return response()->json($result, 200);
    }

    public function obtenerUbicacionDeSolicitudesAceptadas($fechaSolicitud, $horaInicio, $horaFin)
    {
        $fecha = DateTime::createFromFormat('Y-m-d', $fechaSolicitud);
        if (!$fecha) {
            return response()->json(['message' => 'Formato de fecha inválido. Use el formato año-mes-día'], 400);
        }
        $fechaFormateada = $fecha->format('Y-m-d');

        if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFin)) {
            return response()->json(['message' => 'Formato de hora inválido. Use el formato HH:MM:SS'], 400);
        }

        $periodoSolicitudes = Periodo_Solicitud::whereHas('solicitud', function ($query) use ($fechaFormateada) {
            $query->whereDate('fecha_solicitud', $fechaFormateada)
                ->where('estado', 'Aceptada');
        })->whereHas('periodo.horario', function ($query) use ($horaInicio, $horaFin) {
            $query->where('hora_inicio', '>=', $horaInicio)
                ->where('hora_fin', '<=', $horaFin);
        })->with(['solicitud.ambiente' => function ($query) {
            $query->select('id', 'ubicacion');
        }])->get();

        if ($periodoSolicitudes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron ambientes para la fecha y el horario especificados'], 404);
        }

        $result = $periodoSolicitudes->map(function ($periodoSolicitud) {
            return [
                $periodoSolicitud->solicitud->ambiente->ubicacion
            ];
        })->unique()->values()->all();

        return response()->json($result, 200);
    }









    public function cambiarEstadoPorNombreAmbienteYHorario($nombreAmbiente, $fechaSolicitud, $horaInicio, $horaFin)
    {
        $fecha = DateTime::createFromFormat('Y-m-d', $fechaSolicitud);
        if (!$fecha) {
            return response()->json(['message' => 'Formato de fecha inválido. Use el formato año-mes-día'], 400);
        }
        $fechaFormateada = $fecha->format('Y-m-d');

        if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFin)) {
            return response()->json(['message' => 'Formato de hora inválido. Use el formato HH:MM:SS'], 400);
        }

        $ambiente = Ambiente::where('nombre', $nombreAmbiente)->first();

        if (!$ambiente) {
            return response()->json(['message' => 'El ambiente no fue encontrado'], 404);
        }

        $periodoSolicitudes = Periodo_Solicitud::whereHas('solicitud', function ($query) use ($fechaFormateada, $ambiente) {
            $query->whereDate('fecha_solicitud', $fechaFormateada)
                ->where('ambiente_id', $ambiente->id);
        })->whereHas('periodo.horario', function ($query) use ($horaInicio, $horaFin) {
            $query->where('hora_inicio', '>=', $horaInicio)
                ->where('hora_fin', '<=', $horaFin);
        })->with('solicitud')->get();

        if ($periodoSolicitudes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron solicitudes para la fecha, horario y ambiente especificados'], 404);
        }
        foreach ($periodoSolicitudes as $periodoSolicitud) {
            $solicitud = $periodoSolicitud->solicitud;
            $solicitud->estado = "Rechazado";
            $solicitud->save();
        }
        return response()->json(['message' => 'El estado de todas las solicitudes ha sido cambiado a Rechazado'], 200);
    }

    public function cambiarEstadoPorUbicacionAmbienteYHorario($ubicacion, $fechaSolicitud, $horaInicio, $horaFin)
    {
        $fecha = DateTime::createFromFormat('Y-m-d', $fechaSolicitud);
        if (!$fecha) {
            return response()->json(['message' => 'Formato de fecha inválido. Use el formato año-mes-día'], 400);
        }
        $fechaFormateada = $fecha->format('Y-m-d');

        if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFin)) {
            return response()->json(['message' => 'Formato de hora inválido. Use el formato HH:MM:SS'], 400);
        }

        $ambiente = Ambiente::where('ubicacion', $ubicacion)->first();

        if (!$ambiente) {
            return response()->json(['message' => 'El ambiente no fue encontrado'], 404);
        }

        $periodoSolicitudes = Periodo_Solicitud::whereHas('solicitud', function ($query) use ($fechaFormateada, $ambiente) {
            $query->whereDate('fecha_solicitud', $fechaFormateada)
                ->where('ambiente_id', $ambiente->id);
        })->whereHas('periodo.horario', function ($query) use ($horaInicio, $horaFin) {
            $query->where('hora_inicio', '>=', $horaInicio)
                ->where('hora_fin', '<=', $horaFin);
        })->with('solicitud')->get();

        if ($periodoSolicitudes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron solicitudes para la fecha, horario y ambiente especificados'], 404);
        }
        foreach ($periodoSolicitudes as $periodoSolicitud) {
            $solicitud = $periodoSolicitud->solicitud;
            $solicitud->estado = "Rechazado";
            $solicitud->save();
        }
        return response()->json(['message' => 'El estado de todas las solicitudes ha sido cambiado a Rechazado'], 200);
    }










    public function mostrarSolicitudPorNombreAmbienteYHorario($nombreAmbiente, $fechaSolicitud, $horaInicio, $horaFin)
    {
        $fecha = DateTime::createFromFormat('Y-m-d', $fechaSolicitud);
        if (!$fecha) {
            return response()->json(['message' => 'Formato de fecha inválido. Use el formato año-mes-día'], 400);
        }
        $fechaFormateada = $fecha->format('Y-m-d');

        if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaInicio) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $horaFin)) {
            return response()->json(['message' => 'Formato de hora inválido. Use el formato HH:MM:SS'], 400);
        }

        $ambiente = Ambiente::where('nombre', $nombreAmbiente)->first();
        if (!$ambiente) {
            return response()->json(['message' => 'El ambiente no fue encontrado'], 404);
        }

        $periodoSolicitudes = Periodo_Solicitud::whereHas('solicitud', function ($query) use ($fechaFormateada, $ambiente) {
            $query->whereDate('fecha_solicitud', $fechaFormateada)
                ->where('ambiente_id', $ambiente->id);
        })->whereHas('periodo.horario', function ($query) use ($horaInicio, $horaFin) {
            $query->where('hora_inicio', '>=', $horaInicio)
                ->where('hora_fin', '<=', $horaFin);
        })->with('solicitud.users', 'periodo')->get();

        if ($periodoSolicitudes->isEmpty()) {
            return response()->json(['message' => 'No se encontraron solicitudes para la fecha, horario y ambiente especificados'], 404);
        }

        $agrupadosPorSolicitud = $periodoSolicitudes->groupBy('solicitud_id')->map(function ($group) {
            $firstSolicitud = $group->first()->solicitud;
            return [
                'id_solicitud' => $firstSolicitud->id,
                'id_usuario' => $firstSolicitud->users->pluck('id')->toArray(),
            ];
        })->values();

        return response()->json($agrupadosPorSolicitud, 200);
    }
}
