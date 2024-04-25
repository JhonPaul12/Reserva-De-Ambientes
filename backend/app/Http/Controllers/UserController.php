<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
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
        ]);

        // Crea un nuevo rol
        $rol = Rol::Create(['nombre' => 'docente', 'estado' => 'habilitado']);

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
        
        // Devuelve la respuesta
        return response()->json(['message' => 'Usuario y rol creados correctamente'], 201);
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
            $query->where('nombre', 'Docente');
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

}
