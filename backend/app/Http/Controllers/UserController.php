<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
use App\Models\Materia;
class UserController extends Controller
{
    
    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
    }


    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'name' => 'required|string',
            'apellidos' => 'required|string',
            'telefono' => 'required|string',
            'codigo_sis' => 'required|string|unique:users,codigo_sis',
            'email' => 'required|email|unique:users,email',
            'materias' => 'required|array',
        ]);

        // Crea un nuevo rol
        $rol = Rol::find(2);

        // Crea un nuevo usuario
        $user = new User();
        $user->name = $request->input('name');
        $user->apellidos = $request->input('apellidos');
        $user->telefono = $request->input('telefono');
        $user->codigo_sis = $request->input('codigo_sis');
        $user->email = $request->input('email');
        $user->save();

        // Crea un nuevo UsuarioRol
        $rol->users()->attach($user->id);
        // Asocia las materias al usuario
        $materias = $request->input('materias');
        $user->materias()->attach($materias);
        // Devuelve la respuesta
        return response()->json(['message' => 'Usuario, rol y materias creados correctamente'], 201);
    }


    
    public function show($id)
    {
        // Busca el usuario por su ID
        $user = User::find($id);

        // Si no se encuentra el usuario, devuelve un error 404
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Devuelve la información del usuario
        return response()->json($user, 200);
    }
    
    public function getDocentes()
    {
        // Obtiene todos los usuarios que tienen el rol "docente"
        $docentes = User::whereHas('rols', function ($query) {
            $query->where('nombre_rol', 'Docente');
        })->get();

        // Devuelve la lista de docentes
        return response()->json($docentes, 200);
    }
    public function update(Request $request, $id)
    {
        // Encuentra el usuario por su ID
        $user = User::find($id);
    
        // Actualiza los campos del usuario
        $user->name = $request->input('name');
        $user->apellidos = $request->input('apellidos');
        $user->telefono = $request->input('telefono');
        $user->codigo_sis = $request->input('codigo_sis');
        $user->email = $request->input('email');
        $user->save();
    
        // Devuelve una respuesta
        return response()->json(['message' => 'Usuario actualizado correctamente'], 200);
    }

        
   
  
    public function showMaterias($id)
    {
        // Encuentra el usuario por ID
        $user = User::find($id);
    
        // Si el usuario no existe, devuelve un error
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        // Obtiene los grupos del usuario
        $grupos = $user->grupos;
    
        // Obtiene las materias de los grupos
        $materias = $grupos->map(function ($grupo) {
            return $grupo->materia;
        });
    
        // Elimina las materias duplicadas
        $materias = $materias->unique('id');
    
        // Devuelve las materias
        return response()->json($materias->values(), 200);
    }
    

    public function showSolicitudes($id)
{
    // Encuentra el usuario por ID
    $user = User::find($id);

    // Si el usuario no existe, devuelve un error
    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Obtiene las solicitudes del usuario
    $solicitudes = $user->solicitudes;

    // Devuelve las solicitudes
    return response()->json($solicitudes, 200);
}


public function showGrupos($id)
{
    // Encuentra el usuario por ID
    $user = User::find($id);

    // Si el usuario no existe, devuelve un error
    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Obtiene los grupos del usuario
    $grupos = $user->grupos;

    // Devuelve los grupos
    return response()->json($grupos, 200);
}

}
