<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(){

    }
    public function register(AuthRegisterRequest $request){
        $credentiales = $request->validated();
        $user = User::create($credentiales);
        
        return response() -> json([
            'message' => 'Usuario registrado con exito',
            'user'=>$user
        ],201);

    }
    public function logout(){
        
    }
}
