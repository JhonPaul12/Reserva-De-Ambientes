<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Solicitud\SolicitudRequest;
use App\Http\Resources\Solicitud\SolicitudCollection;
use App\Http\Resources\Solicitud\SolicitudResource;
use App\Models\Solicitud;
use App\Models\User;
use App\Models\Excepcion;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\FuncCall;
use Symfony\Contracts\Service\Attribute\Required;
use Illuminate\Support\Facades\DB;

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
    public function store(SolicitudRequest $request)
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
            'estado' => 'required|in:Cancelada,Aceptada',
            'numero_estudiantes' => 'required',
            'ambiente_ids' => 'required|array', // Modificado para aceptar un array de IDs
            'ambiente_ids.*' => 'exists:ambientes,id', // Asegura que cada ID exista
            'docentes' => 'required|array', // Asegúrate de que 'docentes' es un array
            'docentes.*' => 'exists:users,id', // Asegúrate de que cada ID de docente existe en la tabla de usuarios
            'id_materia' => 'required|exists:materias,id',
            'grupos' => 'required|array',
            'grupos.*' => 'exists:grupos,id'
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
             // Utiliza directamente $request->ambiente_id en lugar de $request->input('ambiente_id')

        ]);

        $solicitud->load('ambientes');


        // Asocia los docentes con la solicitud
        $docentes = $request->input('docentes');
        $solicitud->users()->attach($docentes);
        $grupos = $request->input('grupos');
        $solicitud->grupos()->attach($grupos);

        // Asocia los periodos con la solicitud
        $periodos = $request->input('periodos');
        $solicitud->periodos()->attach($periodos);
        $solicitud->ambientes()->attach($request->ambiente_ids);


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
            //'ambiente_id' => 'required|exists:ambientes,id|unique:solicitudes,ambiente_id,' . $id, // Agrega la validación de unicidad, excluyendo el ID actual
            'docentes' => 'required|array',
            'docentes.*' => 'exists:users,id',
            'id_materia' => 'required|exists:materias,id',
            'id_grupo' => 'required|exists:grupos,id',
            'ambientes' => 'required|array', // Añadido para validar 'ambientes'
            'ambientes.*' => 'exists:ambientes,id', // Añadido para asegurar que cada ID de ambiente exista

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
    public function update(SolicitudRequest $request, $id)
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
                $query->with(['materia', 'ambientes']);
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
            $query->with(['materia', 'ambientes']);
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

    public function verificarFecha($fecha)
    {
        $validated = Validator::make(['fecha' => $fecha], [
            'fecha' => 'required|date',
        ]);

        if ($validated->fails()) {
            return response()->json(['error' => 'Fecha no válida'], 400);
        }

        $excepcion = Excepcion::where('fecha_exepcion', $fecha)->first();

        if ($excepcion) {
            return response()->json([
                'fecha' => $fecha,
                'excepcion' => true,
                'descripcion' => $excepcion->motivo
            ], 200);
        } else {
            return response()->json([
                'fecha' => $fecha,
                'excepcion' => false,
                'mensaje' => 'No hay excepciones para esta fecha'
            ], 200);
        }
    }
    public function informeAmbientes()
    {
        $solicitudes = Solicitud::with('ambiente')->get();

        $agrupadoPorIniciales = $solicitudes->groupBy(function ($solicitud) {
            return substr($solicitud->ambiente->nombre, 0, 2);
        });

        $conteoPorIniciales = $agrupadoPorIniciales->map(function ($items, $key) {
            return count($items);
        });

        $resultado = $conteoPorIniciales->map(function ($count, $initials) {
            return [
                'Aulas' => $initials . '0s',
                'Cantidad de Reservas' => $count
            ];
        })->values();

        return response()->json($resultado, 200);
    }

    public function informeAmbientes2()
    {
        $solicitudes = Solicitud::with('ambiente')->get();

        $agrupadoPorIniciales = $solicitudes->groupBy(function ($solicitud) {
            return substr($solicitud->ambiente->nombre, 0, 2);
        });

        $resultado = [];

        foreach ($agrupadoPorIniciales as $iniciales => $solicitudesPorIniciales) {
            $conteoPorMes = [];

            foreach ($solicitudesPorIniciales as $solicitud) {
                $fechaSolicitud = new DateTime($solicitud->fecha_solicitud);
                $mes = $fechaSolicitud->format('F');

                if (!isset($conteoPorMes[$mes])) {
                    $conteoPorMes[$mes] = 1;
                } else {
                    $conteoPorMes[$mes]++;
                }
            }

            $data = [];

            $mesesEnEspañol = [
                "January" => "Enero", "February" => "Febrero", "March" => "Marzo",
                "April" => "Abril", "May" => "Mayo", "June" => "Junio",
                "July" => "Julio"/*, "August" => "Agosto", "September" => "Septiembre",
                "October" => "Octubre", "November" => "Noviembre", "December" => "Diciembre"*/
            ];

            foreach ($mesesEnEspañol as $mes => $mesEnEspañol) {
                $data[] = [
                    'mes' => $mesEnEspañol,
                    'cantidad' => $conteoPorMes[$mes] ?? 0
                ];
            }

            $resultado[] = [
                'Aula' => $iniciales . '0s',
                'Meses' => $data
            ];
        }

        return response()->json($resultado, 200);
    }

    public function informeAmbientes2_v2()
    {
        $solicitudes = Solicitud::with('ambiente')->get();

        $resultado = [];

        $mesesEnEspañol = [
            "January" => "Enero", "February" => "Febrero", "March" => "Marzo",
            "April" => "Abril", "May" => "Mayo", "June" => "Junio",
            "July" => "Julio"/*, "August" => "Agosto", "September" => "Septiembre",
        "October" => "Octubre", "November" => "Noviembre", "December" => "Diciembre"*/
        ];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = [
                    'Aula' => $aulaNombre,
                    'Data' => array_fill_keys(array_values($mesesEnEspañol), 0)
                ];
            }

            $fechaSolicitud = new DateTime($solicitud->fecha_solicitud);
            $mes = $fechaSolicitud->format('F');
            $mesEnEspañol = $mesesEnEspañol[$mes];

            $resultado[$aulaNombre]['Data'][$mesEnEspañol]++;
        }

        $formatoResultado = [];
        foreach ($resultado as $aula) {
            $data = [];
            foreach ($aula['Data'] as $mes => $valor) {
                $data[] = [
                    'mes' => $mes,
                    'cantidad' => $valor
                ];
            }
            $formatoResultado[] = [
                'Aula' => $aula['Aula'],
                'Meses' => $data
            ];
        }

        return response()->json($formatoResultado, 200);
    }

    public function informeAmbientes_v2()
    {
        $solicitudes = Solicitud::with('ambiente')->get();

        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = 1;
            } else {
                $resultado[$aulaNombre]++;
            }
        }

        $formatoResultado = [];
        foreach ($resultado as $aula => $count) {
            $formatoResultado[] = [
                'Aulas' => $aula,
                'Cantidad_de_Reservas' => $count
            ];
        }

        return response()->json($formatoResultado, 200);
    }
    public function informeAmbientesTable()
    {
        $solicitudes = Solicitud::with('ambiente', 'users', 'periodos.horario')->get();

        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;
            $fechaSolicitud = $solicitud->fecha_solicitud;

            $nombresUsuarios = $solicitud->users->map(function ($user) {
                return $user->name . ' ' . $user->apellidos;
            })->toArray();

            $horariosInicio = $solicitud->periodos->map(function ($periodo) {
                return $periodo->horario->hora_inicio;
            });
            $horariosFin = $solicitud->periodos->map(function ($periodo) {
                return $periodo->horario->hora_fin;
            });

            $horaInicio = $horariosInicio->min();
            $horaFin = $horariosFin->max();

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = [
                    'Cantidad_de_Reservas' => 1,
                    'Fechas' => [
                        [
                            'Fecha_de_Solicitud' => $fechaSolicitud,
                            'Hora_de_Inicio' => $horaInicio,
                            'Hora_de_Fin' => $horaFin,
                            'Docentes' => $nombresUsuarios
                        ]
                    ]
                ];
            } else {
                $resultado[$aulaNombre]['Cantidad_de_Reservas']++;
                $resultado[$aulaNombre]['Fechas'][] = [
                    'Fecha_de_Solicitud' => $fechaSolicitud,
                    'Hora_de_Inicio' => $horaInicio,
                    'Hora_de_Fin' => $horaFin,
                    'Docentes' => $nombresUsuarios
                ];
            }
        }

        $formatoResultado = [];
        foreach ($resultado as $aula => $datos) {
            $formatoResultado[] = [
                'Aulas' => $aula,
                'Cantidad_de_Reservas' => $datos['Cantidad_de_Reservas'],
                'Fechas_de_Solicitudes' => $datos['Fechas']
            ];
        }

        return response()->json($formatoResultado, 200);
    }
    public function informeAmbientesTableID($userId)
    {
        $solicitudes = Solicitud::with(['ambiente', 'users', 'periodos.horario'])
            ->whereHas('users', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            })
            ->get();

        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;
            $fechaSolicitud = $solicitud->fecha_solicitud;

            $nombresUsuarios = $solicitud->users->map(function ($user) {
                return $user->name . ' ' . $user->apellidos;
            })->toArray();

            $horariosInicio = $solicitud->periodos->map(function ($periodo) {
                return $periodo->horario->hora_inicio;
            });
            $horariosFin = $solicitud->periodos->map(function ($periodo) {
                return $periodo->horario->hora_fin;
            });

            $horaInicio = $horariosInicio->min();
            $horaFin = $horariosFin->max();

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = [
                    'Cantidad_de_Reservas' => 1,
                    'Fechas' => [
                        [
                            'Fecha_de_Solicitud' => $fechaSolicitud,
                            'Hora_de_Inicio' => $horaInicio,
                            'Hora_de_Fin' => $horaFin,
                            'Docentes' => $nombresUsuarios
                        ]
                    ]
                ];
            } else {
                $resultado[$aulaNombre]['Cantidad_de_Reservas']++;
                $resultado[$aulaNombre]['Fechas'][] = [
                    'Fecha_de_Solicitud' => $fechaSolicitud,
                    'Hora_de_Inicio' => $horaInicio,
                    'Hora_de_Fin' => $horaFin,
                    'Docentes' => $nombresUsuarios
                ];
            }
        }

        $formatoResultado = [];
        foreach ($resultado as $aula => $datos) {
            $formatoResultado[] = [
                'Aulas' => $aula,
                'Cantidad_de_Reservas' => $datos['Cantidad_de_Reservas'],
                'Fechas_de_Solicitudes' => $datos['Fechas']
            ];
        }

        return response()->json($formatoResultado, 200);
    }
    public function informeAmbientes_v2ID($userId)
    {
        $solicitudes = Solicitud::with(['ambiente', 'users'])
            ->whereHas('users', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            })
            ->get();

        $resultado = [];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = 1;
            } else {
                $resultado[$aulaNombre]++;
            }
        }

        $formatoResultado = [];
        foreach ($resultado as $aula => $count) {
            $formatoResultado[] = [
                'Aulas' => $aula,
                'Cantidad_de_Reservas' => $count
            ];
        }

        return response()->json($formatoResultado, 200);
    }
    public function informeAmbientes2_v2ID($userId)
    {
        $solicitudes = Solicitud::with(['ambiente', 'users'])
            ->whereHas('users', function ($query) use ($userId) {
                $query->where('users.id', $userId);
            })
            ->get();

        $resultado = [];

        $mesesEnEspañol = [
            "January" => "Enero", "February" => "Febrero", "March" => "Marzo",
            "April" => "Abril", "May" => "Mayo", "June" => "Junio",
            "July" => "Julio"/*, "August" => "Agosto", "September" => "Septiembre",
        "October" => "Octubre", "November" => "Noviembre", "December" => "Diciembre"*/
        ];

        foreach ($solicitudes as $solicitud) {
            $aulaNombre = $solicitud->ambiente->nombre;

            if (!isset($resultado[$aulaNombre])) {
                $resultado[$aulaNombre] = [
                    'Aula' => $aulaNombre,
                    'Data' => array_fill_keys(array_values($mesesEnEspañol), 0)
                ];
            }

            $fechaSolicitud = new DateTime($solicitud->fecha_solicitud);
            $mes = $fechaSolicitud->format('F');
            $mesEnEspañol = $mesesEnEspañol[$mes];

            $resultado[$aulaNombre]['Data'][$mesEnEspañol]++;
        }

        $formatoResultado = [];
        foreach ($resultado as $aula) {
            $data = [];
            foreach ($aula['Data'] as $mes => $valor) {
                $data[] = [
                    'mes' => $mes,
                    'cantidad' => $valor
                ];
            }
            $formatoResultado[] = [
                'Aula' => $aula['Aula'],
                'Meses' => $data
            ];
        }

        return response()->json($formatoResultado, 200);
    }
    public function datosDocente()
    {
        $solicitudes = Solicitud::with('users')->get();

        $usuariosConReserva = [];

        foreach ($solicitudes as $solicitud) {
            foreach ($solicitud->users as $user) {
                if (!isset($usuariosConReserva[$user->id])) {
                    $usuariosConReserva[$user->id] = [
                        'nombre' =>  $user->name . ' ' . $user->apellidos,
                        'id' => $user->id
                    ];
                }
            }
        }

        $formatoResultado = array_values($usuariosConReserva);

        return response()->json($formatoResultado, 200);
    }

    public function LibresUnAula(Request $request)
    {

        $validador = Validator::make($request->all(), [
            'fecha' => 'required|date',
            'aula' => 'required|string',
        ]);

        if ($validador->fails()) {
            return response()->json(['errors' => $validador->errors()], 422);
        }


        $idAmbiente = DB::table('ambientes')
            ->where('nombre', $request->aula)
            ->value('id');

        if ($idAmbiente === null) {
            return response()->json(['message' => 'Aula no encontrada'], 404);
        }


        $libresID = DB::table('periodos')
            ->where('fecha', $request->fecha)
            ->where('id_ambiente', $idAmbiente)
            ->where('estado', 'libre')
            ->pluck('id_horario');


        $horariosLibres = DB::table('horarios')
            ->whereIn('id', $libresID)
            ->pluck('hora_inicio');

        return response()->json(['horarios_libres' => $horariosLibres]);
    }


    public function LibresComunes(Request $request)
{

    $validador = Validator::make($request->all(), [
        'fecha' => 'required|date',
        'aulas' => 'required|array|min:1',
        'aulas.*' => 'required|string'
    ]);

    if ($validador->fails()) {
        return response()->json(['errors' => $validador->errors()], 422);
    }


    $fecha = $request->input('fecha');
    $nombresAulas = $request->input('aulas');


    $idsAmbientes = DB::table('ambientes')
        ->whereIn('nombre', $nombresAulas)
        ->pluck('id');

    if ($idsAmbientes->isEmpty()) {
        return response()->json(['message' => 'Aulas no encontradas'], 404);
    }

    // Obtener los IDs de horarios libres para cada aula en la fecha dada
    $horariosLibresPorAula = [];

    foreach ($idsAmbientes as $idAmbiente) {
        $libresID = DB::table('periodos')
            ->where('fecha', $fecha)
            ->where('id_ambiente', $idAmbiente)
            ->where('estado', 'libre')
            ->pluck('id_horario');

        $horariosLibresPorAula[] = $libresID->toArray();
    }

    // Encontrar los periodos libres comunes entre todas las aulas
    if (count($horariosLibresPorAula) > 1) {
        $horariosLibresComunes = call_user_func_array('array_intersect', $horariosLibresPorAula);
    } else {
        $horariosLibresComunes = $horariosLibresPorAula[0];
    }

    if (empty($horariosLibresComunes)) {
        return response()->json(['message' => 'No hay horarios libres comunes'], 404);
    }


    $periodosLibres = DB::table('periodos')
        ->join('horarios', 'periodos.id_horario', '=', 'horarios.id')
        ->join('ambientes', 'periodos.id_ambiente', '=', 'ambientes.id')
        ->whereIn('periodos.id_horario', $horariosLibresComunes)
        ->where('periodos.fecha', $fecha)
        ->whereIn('periodos.id_ambiente', $idsAmbientes)
        ->select('periodos.*', 'horarios.hora_inicio', 'horarios.hora_fin', 'ambientes.nombre as nombre_ambiente')
        ->get();

    return response()->json(['periodos_libres' => $periodosLibres]);
}

}
