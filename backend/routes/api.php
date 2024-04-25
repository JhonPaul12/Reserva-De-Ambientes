<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//lista de todos los usuario
Route::get('/users/index', [UserController::class, 'index']);
// guardar usuario
Route::post('/users/store', [UserController::class, 'store']);



//mostrar docentes
Route::get('/users/docentes', [UserController::class, 'getDocentes']);
// actualizar usuario
Route::put('/users/{id}', [UserController::class, 'update']);

//mostrar usuario por id
Route::get('/users/{id}', [UserController::class, 'show']);

//mostrar materia user
Route::get('/users/materias/{id}', [UserController::class, 'showMaterias']);