<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\ExcepcionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\ReglaController;

Route::resource('/ambiente', AmbienteController::class);
//Route::post('/ambientes/store', [AmbienteController::class, 'store']);
//Route::get('/ambientes/index', [AmbienteController::class, 'index']);
Route::resource('/regla',ReglaController::class);
Route::resource('/horario',HorarioController::class);
Route::resource('/excepcion',ExcepcionController::class);
