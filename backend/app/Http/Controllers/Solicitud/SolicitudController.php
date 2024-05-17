<?php

namespace App\Http\Controllers\Solicitud;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\FuncCall;
use Symfony\Contracts\Service\Attribute\Required;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitudes = Solicitud::with('ambiente')->get();

        return response()->json([
            'solicitudes' => $solicitudes
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validador = Validator::make($request->all(), [
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'hora_inicio' => 'required',
            'hora_fin' => 'required',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required',
            'ambiente_id' => 'required|exists:ambientes,id'
        ]);

        if ($validador->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'erros' => $validador->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $solicitud = Solicitud::create([
            'motivo' => $request->motivo,
            'fecha_solicitud' => $request->fecha_solicitud,
            'hora_inicio' => $request->hora_inicio,
            'hora_fin' => $request->hora_fin,
            'estado' => $request->estado,
            'numero_estudiantes' => $request->numero_estudiantes,
            'ambiente_id' => $request->input('ambiente_id')
        ]);

        $solicitud->load('ambiente');

        if (!$solicitud) {
            $data = [
                'message' => 'Error al crear una solicitud',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        $data = [
            'solicitud' => $solicitud,
            'status' => 201
        ];

        return response()->json($data, 201);
    }
    public function guardar(Request $request)
    {
        $validador = Validator::make($request->all(), [
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'periodos' => 'required|array', // Asegúrate de que 'periodos' es un array
            'periodos.*' => 'exists:periodos,id', // Asegúrate de que cada ID de periodo existe en la tabla de periodos
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required',
            'ambiente_id' => 'required|exists:ambientes,id',
            'docentes' => 'required|array', // Asegúrate de que 'docentes' es un array
            'docentes.*' => 'exists:users,id', // Asegúrate de que cada ID de docente existe en la tabla de usuarios
            'id_materia' => 'required|exists:materias,id',
            'id_grupo' => 'required|exists:grupos,id'
        ]);

        if ($validador->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'erros' => $validador->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $solicitud = Solicitud::create([
            'motivo' => $request->motivo,
            'fecha_solicitud' => $request->fecha_solicitud,
            'estado' => $request->estado,
            'numero_estudiantes' => $request->numero_estudiantes,
            'id_materia' => $request->id_materia, // Utiliza directamente $request->materia_id en lugar de $request->input('materia_id')
            'id_grupo' => $request->id_grupo, // Utiliza directamente $request->grupo_id en lugar de $request->input('grupo_id')
            'ambiente_id' => $request->ambiente_id // Utiliza directamente $request->ambiente_id en lugar de $request->input('ambiente_id')
        ]);

        $solicitud->load('ambiente');


        // Asocia los docentes con la solicitud
        $docentes = $request->input('docentes');
        $solicitud->users()->attach($docentes);


        // Asocia los periodos con la solicitud
        $periodos = $request->input('periodos');
        $solicitud->periodos()->attach($periodos);


        if (!$solicitud) {
            $data = [
                'message' => 'Error al crear una solicitud',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        $data = [
            'solicitud' => $solicitud,
            'status' => 201
        ];

        return response()->json($data, 201);
    }


    public function editar(Request $request, $id)
    {
        $validador = Validator::make($request->all(), [
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'hora_inicio' => 'required',
            'hora_fin' => 'required',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required',
            'ambiente_id' => 'required|exists:ambientes,id|unique:solicitudes,ambiente_id,' . $id, // Agrega la validación de unicidad, excluyendo el ID actual
            'docentes' => 'required|array',
            'docentes.*' => 'exists:users,id',
            'id_materia' => 'required|exists:materias,id',
            'id_grupo' => 'required|exists:grupos,id'
        ]);

        if ($validador->fails()) {
            $errors = $validador->errors();

            // Agregar mensajes de error adicionales para campos faltantes o datos incompletos
            $missingFields = [];
            foreach (['motivo', 'fecha_solicitud', 'hora_inicio', 'hora_fin', 'estado', 'numero_estudiantes', 'ambiente_id', 'docentes', 'id_materia', 'id_grupo'] as $field) {
                if ($errors->has($field)) {
                    $missingFields[] = $field;
                }
            }

            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validador->errors(),
                'missing_fields' => $missingFields, // Agregar los campos faltantes al mensaje de error
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $solicitud = Solicitud::findOrFail($id);
        if (!$solicitud) {
            $data = [
                'message' => 'No se encontró la solicitud con el ID proporcionado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $solicitud->update([
            'motivo' => $request->motivo,
            'fecha_solicitud' => $request->fecha_solicitud,
            'hora_inicio' => $request->hora_inicio,
            'hora_fin' => $request->hora_fin,
            'estado' => $request->estado,
            'numero_estudiantes' => $request->numero_estudiantes,
            'id_materia' => $request->id_materia,
            'id_grupo' => $request->id_grupo,
            'ambiente_id' => $request->ambiente_id
        ]);

        $solicitud->load('ambiente');

        // Actualiza la asociación de los docentes con la solicitud
        $docentes = $request->input('docentes');
        $solicitud->users()->sync($docentes);

        $data = [
            'solicitud' => $solicitud,
            'status' => 200
        ];

        return response()->json($data, 200);
    }






    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $solicitud = Solicitud::with('ambiente')->findOrFail($id);

        if (!$solicitud) {
            $data = [
                'message' => 'Solicitud no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'solicitud' => $solicitud,
            'status' => 200
        ];

        return response()->json($data, 200);
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
        if (!$solicitud) {
            $data = [
                'message' => 'Solicitud no encontrada',
                'status' => 404
            ];
        }

        $validador = Validator::make($request->all(), [
            'motivo' => 'required|max:250',
            'fecha_solicitud' => 'required',
            'hora_inicio' => 'required',
            'hora_fin' => 'required',
            'estado' => 'required|in:Rechazado,Aceptado,Pendiente',
            'numero_estudiantes' => 'required',
            'ambiente_id' => 'required|exists:ambiente'
        ]);

        if ($validador->fails()) {
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
        $solicitud->ambiente_id = $request->ambiente_id;

        $solicitud->save();

        $data = [
            'message' => 'Solicitud actualizado',
            'solicitud' => $solicitud,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solicitud = Solicitud::findOrFail($id);

        if (!$solicitud) {
            $data = [
                'message' => 'Solicitud no encontrada',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $solicitud->delete();

        $data = [
            'message' => 'Solicitud eliminada',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function showDocentes($id)
    {

        // Encuentra el usuario por ID
        $user = User::find($id);

        // Si el usuario no existe, devuelve un error
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Obtiene las materias del usuario
        $solicitudes = $user->solicitudes;

        // Devuelve las materias
        return response()->json([
            "docente" => $solicitudes
        ], 200);
    }

    public function showAllDocentes($nombreDocente)
    {
        $users = User::where('name', $nombreDocente)
            ->with(['solicitudes' => function ($query) {
                $query->with(['materia', 'ambiente']);
            }])
            ->get();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios con ese nombre'], 404);
        }
        $todasLasSolicitudes = [];
        foreach ($users as $user) {
            foreach ($user->solicitudes as $solicitud) {
                $solicitudConDocente = $solicitud->toArray();
                $solicitudConDocente['docente'] = [
                    'id' => $user->id,
                    'nombre' => $user->name,
                    'apellido' => $user->apellidos,
                ];
                $todasLasSolicitudes[] = $solicitudConDocente;
            }
        }
        return response()->json($todasLasSolicitudes, 200);
    }
    public function AllDocentes()
    {
        $users = User::with(['solicitudes' => function ($query) {
            $query->with(['materia', 'ambiente']);
        }])->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios/docentes'], 404);
        }

        $todasLasSolicitudes = [];

        foreach ($users as $user) {
            foreach ($user->solicitudes as $solicitud) {
                $solicitudConDocente = $solicitud->toArray();
                $solicitudConDocente['docente'] = [
                    'id' => $user->id,
                    'nombre' => $user->name,
                    'apellido' => $user->apellidos,
                ];
                $todasLasSolicitudes[] = $solicitudConDocente;
            }
        }

        return response()->json($todasLasSolicitudes, 200);
    }

    
    public function cambiarEstadoUser($idSolicitud)
    {
        $solicitud = Solicitud::find($idSolicitud);

        if (!$solicitud) {
            return response()->json(['message' => 'La solicitud no fue encontrada'], 404);
        }

        $solicitud->estado = "Cancelado";
        $solicitud->save();
            // Cambia el estado de todos los periodos asociados a la solicitud
        foreach ($solicitud->periodos as $periodo) {
            $periodo->estado = "libre";
            $periodo->save();
        }

        return response()->json(['message' => 'El estado de la solicitud ha sido cambiado a Rechazado'], 200);
    }
    public function cambiarEstadoAdmin($idSolicitud)
    {
        $solicitud = Solicitud::find($idSolicitud);

        if (!$solicitud) {
            return response()->json(['message' => 'La solicitud no fue encontrada'], 404);
        }
        // Cambia el estado de todos los periodos asociados a la solicitud
        foreach ($solicitud->periodos as $periodo) {
            $periodo->estado = "libre";
            $periodo->save();
        }

        $solicitud->estado = "Rechazado";
        $solicitud->save();

        return response()->json(['message' => 'El estado de la solicitud ha sido cambiado a Rechazado'], 200);
    }
}
