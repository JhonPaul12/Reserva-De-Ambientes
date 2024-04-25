<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\ExcepcionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PeriodoController;
use App\Http\Controllers\ReglaController;
use App\Http\Controllers\RegexcCotroller;
use App\Http\Controllers\Reserva\ReservaController;
use App\Http\Controllers\Solicitud\SolicitudController;
use App\Http\Controllers\UserController;

//lista de todos los usuario
Route::get('/users/index', [UserController::class, 'index']);
// guardar usuario
Route::post('/users/store', [UserController::class, 'store']);



Route::resource('/ambiente', AmbienteController::class);
Route::resource('/regla',ReglaController::class);
Route::resource('/horario',HorarioController::class);
Route::resource('/excepcion',ExcepcionController::class);
Route::resource('/reglaExc',RegexcCotroller::class);
Route::resource('/periodo',PeriodoController::class);
//ambiente
Route::get('/ambiente',[AmbienteController::class,'index']);
Route::get('/ambiente/{id}',[AmbienteController::class,'show']);
Route::post('/ambiente',[AmbienteController::class,'store']);
Route::put('/ambiente/{id}',[AmbienteController::class,'update']);
Route::get('/solicitud/{id}',[AmbienteController::class,'destroy']);





//solicitudes
Route::get('/solicitud',[SolicitudController::class,'index']);
Route::get('/solicitud/{id}',[SolicitudController::class,'show']);
Route::post('/solicitud',[SolicitudController::class,'store']);
Route::put('/solicitud/{id}',[SolicitudController::class,'update']);
Route::delete('/solicitud/{id}',[SolicitudController::class,'destroy']);

//reserva
Route::get('/reserva', [ReservaController::class, 'index']);
Route::post('/reserva', [ReservaController::class, 'store']);
Route::get('/reserva/{id}', [ReservaController::class, 'show']);
Route::put('/reserva/{id}', [ReservaController::class, 'update']);
Route::delete('/reserva/{id}', [ReservaController::class, 'destroy']);




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
