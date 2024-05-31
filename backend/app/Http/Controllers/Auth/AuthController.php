<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Http\Resources\Auth\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                "message" => "Correo o contraseña incorrectos"
            ], 422);
        }
        $user = User::find(Auth::user()->id);
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function register(AuthRegisterRequest $request)
    {
        $credentials = $request->validated();
        $credentials['password'] = Hash::make($credentials['password']); 

        $user = User::create($credentials);

        
        $user->rols()->attach(2);

        return response()->json([
            'message' => 'Usuario registrado',
            'user' => new UserResource($user)
        ], 201);
    }

    public function registerAdmin(AuthRegisterRequest $request)
    {
        $credentials = $request->validated();
        $credentials['password'] = Hash::make($credentials['password']); 

        $user = User::create($credentials);

        $user->rols()->attach(1); 

        return response()->json([
            'message' => 'Administrador registrado',
            'user' => new UserResource($user)
        ], 201);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            "message" => "La sesión se cerró correctamente",
        ]);
    }

    public function checkToken(Request $request)
    {
        $user = $request->user();
        $user->load('rols'); 
        return response()->json([
            "user" => new UserResource($user),
        ]);
    }

    // Método para verificar si el usuario es administrador
    private function isAdmin($user)
    {
        return $user->rols()->where('nombre_rol', 'admin')->exists();
    }

    // Ejemplo de método protegido solo para administradores
    public function adminOnlyAction(Request $request)
    {
        $user = $request->user();

        if (!$this->isAdmin($user)) {
            return response()->json([
                "message" => "No tienes permisos para realizar esta acción"
            ], 403);
        }

        // Acción solo para administradores
        return response()->json([
            "message" => "Acción de administrador realizada con éxito"
        ]);
    }
}
