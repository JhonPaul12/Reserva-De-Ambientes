<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
class UsuarioController extends Controller
{
    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'telefono' => 'required|string',
            'codigo_sis' => 'required|string|unique:usuarios,codigo_sis',
            'correo_electronico' => 'required|email|unique:usuarios,correo_electronico',
        ]);

        // Crea un nuevo usuario
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombre');
        $usuario->apellidos = $request->input('apellidos');
        $usuario->telefono = $request->input('telefono');
        $usuario->codigo_sis = $request->input('codigo_sis');
        $usuario->correo_electronico = $request->input('correo_electronico');
        $usuario->save();

        // Devuelve la respuesta
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

    public function index()
    {
        $usuarios = Usuario::all();

        return response()->json($usuarios, 200);
    }
}
