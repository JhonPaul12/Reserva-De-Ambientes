<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\ExcepcionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PeriodoController;
use App\Http\Controllers\ReglaController;
use App\Http\Controllers\RegexcCotroller;

Route::resource('/ambiente', AmbienteController::class);
Route::resource('/regla',ReglaController::class);
Route::resource('/horario',HorarioController::class);
Route::resource('/excepcion',ExcepcionController::class);
Route::resource('/reglaExc',RegexcCotroller::class);
Route::resource('/periodo',PeriodoController::class);

//Route::get('/obtener-regla/{idAmbiente}',[PeriodoController::class,'obtenerRegla']); //Funciona
