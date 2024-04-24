<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\ExcepcionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\ReglaController;
use App\Http\Controllers\ReglaExcController;
use App\Http\Controllers\Reserva\ReservaController;
use App\Http\Controllers\Solicitud\SolicitudController;
use App\Models\Reserva;

Route::resource('/ambiente', AmbienteController::class);
//Route::post('/ambientes/store', [AmbienteController::class, 'store']);
//Route::get('/ambientes/index', [AmbienteController::class, 'index']);
Route::resource('/regla',ReglaController::class);
Route::resource('/horario',HorarioController::class);
Route::resource('/excepcion',ExcepcionController::class);
Route::resource('/reglaExc',ReglaExcController::class);


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