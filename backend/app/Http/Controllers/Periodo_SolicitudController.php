<?php

namespace App\Http\Controllers;

use App\Models\Periodo_Solicitud;
use App\Models\User;
use Illuminate\Http\Request;

class Periodo_SolicitudController extends Controller
{
    public function index()
    {
        $periodo_solicitudes = Periodo_Solicitud::with('periodo.horario', 'solicitud.materia.user', 'solicitud.ambiente')->get();
        return response()->json($periodo_solicitudes, 200);
    }
    public function index2()
    {
        $periodo_solicitudes = Periodo_Solicitud::with('periodo.horario', 'solicitud.materia.user', 'solicitud.ambiente')->get();

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
    public function nombre_usuario($nombreUsuario = null)
    {
        $query = Periodo_Solicitud::with('periodo.horario', 'solicitud.materia.user', 'solicitud.ambiente');

        if ($nombreUsuario) {
            $users = User::where('name', $nombreUsuario)->get();

            if ($users->isEmpty()) {
                return response()->json(['message' => 'No se encontraron usuarios con ese nombre'], 404);
            }

            $query->whereHas('solicitud.materia.user', function ($query) use ($users) {
                $query->whereIn('id', $users->pluck('id'));
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
}
