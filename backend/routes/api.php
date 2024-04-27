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


/*Route::resource('/ambiente', AmbienteController::class);
Route::resource('/regla',ReglaController::class);
Route::resource('/horario',HorarioController::class);
Route::resource('/excepcion',ExcepcionController::class);
Route::resource('/reglaExc',RegexcCotroller::class);
Route::resource('/periodo',PeriodoController::class);*/
//regla
Route::get('/regla',[ReglaController::class,'index']);
Route::get('/regla/{id}',[ReglaController::class,'show']);
Route::post('/regla',[ReglaController::class,'store']);
Route::put('/regla/{id}',[ReglaController::class,'update']);
Route::get('/regla/{id}',[ReglaController::class,'destroy']);
//horario
Route::get('/horario',[HorarioController::class,'index']);
Route::get('/horario/{id}',[HorarioController::class,'show']);
Route::post('/horario',[HorarioController::class,'store']);
Route::put('/horario/{id}',[HorarioController::class,'update']);
Route::get('/horario/{id}',[HorarioController::class,'destroy']);
//ambiente
Route::get('/ambiente',[AmbienteController::class,'index']);
Route::get('/ambiente/{id}',[AmbienteController::class,'show']);
Route::post('/ambiente',[AmbienteController::class,'store']);
Route::put('/ambiente/{id}',[AmbienteController::class,'update']);
Route::get('/solicitud/{id}',[AmbienteController::class,'destroy']);

//periodo
Route::get('/periodo',[PeriodoController::class,'index']);
Route::get('/periodo/{id}',[PeriodoController::class,'show']);
Route::post('/periodo',[PeriodoController::class,'store']);
Route::put('/periodo/{id}',[PeriodoController::class,'update']);
Route::get('/periodo/{id}',[PeriodoController::class,'destroy']);
Route::delete('/todoPeriodo',[PeriodoController::class,'eliminarPeriodosPorHorario']);
//Excepción
Route::get('/excepcion',[ExcepcionController::class,'index']);
Route::get('/excepcion/{id}',[ExcepcionController::class,'show']);
Route::post('/excepcion',[ExcepcionController::class,'store']);
Route::put('/excepcion/{id}',[ExcepcionController::class,'update']);
Route::get('/excepcion/{id}',[ExcepcionController::class,'destroy']);
//regla
Route::get('/regla',[ReglaController::class,'index']);
Route::get('/regla/{id}',[ReglaController::class,'show']);
Route::post('/regla',[ReglaController::class,'store']);
Route::put('/regla/{id}',[ReglaController::class,'update']);
Route::get('/regla/{id}',[ReglaController::class,'destroy']);
//regExc
Route::get('/regexc',[RegexcCotroller::class,'index']);
Route::get('/regexc/{id}',[RegexcCotroller::class,'show']);
Route::post('/regexc',[RegexcCotroller::class,'store']);
Route::put('/regexc/{id}',[RegexcCotroller::class,'update']);
Route::get('/regexc/{id}',[RegexcCotroller::class,'destroy']);

//solicitudes
Route::get('/solicitud',[SolicitudController::class,'index']);
Route::get('/solicitud/{id}',[SolicitudController::class,'show']);
Route::post('/solicitud',[SolicitudController::class,'store']);
Route::put('/solicitud/{id}',[SolicitudController::class,'update']);
Route::delete('/solicitud/{id}',[SolicitudController::class,'destroy']);
Route::get('/solicitud/docente/{id}', [SolicitudController::class, 'showDocentes']);

//reserva
Route::get('/reserva', [ReservaController::class, 'index']);
Route::post('/reserva', [ReservaController::class, 'store']);
Route::get('/reserva/{id}', [ReservaController::class, 'show']);
Route::put('/reserva/{id}', [ReservaController::class, 'update']);
Route::delete('/reserva/{id}', [ReservaController::class, 'destroy']);


//lista de todos los usuario
Route::get('/usuario', [UserController::class, 'index']);
// guardar usuario
Route::post('/usuario', [UserController::class, 'store']);
//mostrar docentes
Route::get('/usuario/docentes', [UserController::class, 'getDocentes']);
// actualizar usuario
Route::put('/usuario/{id}', [UserController::class, 'update']);
//mostrar usuario por id
Route::get('/usuario/{id}', [UserController::class, 'show']);
//mostrar materia user
Route::get('/usuario/materias/{id}', [UserController::class, 'showMaterias']);
//mostrar grupos de materia de docente
Route::get('/docentes/{docente_id}/{materia_id}', [UserController::class, 'getGruposDeMateriaDeDocente']);
