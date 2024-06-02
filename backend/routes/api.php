<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ExcepcionController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PeriodoController;
use App\Http\Controllers\ReglaController;
use App\Http\Controllers\RegexcCotroller;
use App\Http\Controllers\Reserva\ReservaController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\AmbientereglaController;
use App\Http\Controllers\Periodo_SolicitudController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\MateriaController;
use App\Models\Periodo;
use App\Models\Solicitud;

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
Route::delete('/regla/{id}',[ReglaController::class,'destroy']);
//horario
Route::get('/horario',[HorarioController::class,'index']);
Route::get('/horario/{id}',[HorarioController::class,'show']);
Route::get('/buscarHorario',[HorarioController::class,'buscarHorario']);
Route::post('/horario',[HorarioController::class,'store']);
Route::put('/horario/{id}',[HorarioController::class,'update']);
Route::delete('/horario/{id}',[HorarioController::class,'destroy']);

//ambiente
Route::get('/ambiente',[AmbienteController::class,'index']);
Route::get('/ambiente/{id}',[AmbienteController::class,'show']);
Route::post('/ambiente',[AmbienteController::class,'store']);
Route::put('/ambiente/{id}',[AmbienteController::class,'update']);
Route::delete('/ambiente/{id}',[AmbienteController::class,'destroy']);
Route::get('/ambientesLibres',[AmbienteController::class,'libres']);

//periodo
Route::get('/periodo',[PeriodoController::class,'index']);
Route::get('/periodo/{id}',[PeriodoController::class,'show']);
Route::post('/periodo',[PeriodoController::class,'storeNew']);
Route::put('/periodo/{id}',[PeriodoController::class,'update']);
Route::delete('/periodo/{id}',[PeriodoController::class,'destroy']);
//Route::get('/periodo/{id}',[PeriodoController::class,'show']);
Route::delete('/todoPeriodo',[PeriodoController::class,'eliminarPeriodosPorHorario']);
Route::get('/verEstado/{id}',[PeriodoController::class,'showEstado']);
Route::post('/verDispo',[PeriodoController::class,'showHora']);
Route::post('/disposicion',[PeriodoController::class,'listarPeriodosLibresParaReserva']);
Route::put('/updateEstado',[PeriodoController::class,'updateEstado']);
Route::get('/obtener-regAmb/{idamb}/{idreg}', [PeriodoController::class, 'ObtenerReglaAmbiente']);
Route::delete('/eliminarPeriodo',[PeriodoController::class,'EliminarPorSemestre']);
Route::get('/reasignacion',[PeriodoController::class,'verificarReasignacion']);
//Route::get('/ambientesLibres',[PeriodoController::class,'libres']);


//Excepción
Route::get('/excepcion',[ExcepcionController::class,'index']);
Route::get('/excepcion/{id}',[ExcepcionController::class,'show']);
Route::post('/excepcion',[ExcepcionController::class,'store']);
Route::put('/excepcion/{id}',[ExcepcionController::class,'update']);
Route::delete('/excepcion/{id}',[ExcepcionController::class,'destroy']);
//regla
Route::get('/regla',[ReglaController::class,'index']);
Route::get('/regla/{id}',[ReglaController::class,'show']);
Route::post('/regla',[ReglaController::class,'store']);
Route::put('/regla/{id}',[ReglaController::class,'update']);
Route::delete('/regla/{id}',[ReglaController::class,'destroy']);
//regla-Ambiente
Route::get('/ambiente-regla',[AmbientereglaController::class,'index']);
//Route::get('/regla/{id}',[ReglaController::class,'show']);
Route::post('/ambiente-regla',[AmbientereglaController::class,'store']);
//Route::put('/regla/{id}',[ReglaController::class,'update']);
//Route::delete('/regla/{id}',[ReglaController::class,'destroy']);
//regExc
Route::get('/regexc',[RegexcCotroller::class,'index']);
Route::get('/regexc/{id}',[RegexcCotroller::class,'show']);
Route::post('/regexc',[RegexcCotroller::class,'store']);
Route::put('/regexc/{id}',[RegexcCotroller::class,'update']);
Route::delete('/regexc/{id}',[RegexcCotroller::class,'destroy']);

//solicitudes

Route::get('/solicitud/{id}',[SolicitudController::class,'show']);
Route::post('/solicitud',[SolicitudController::class,'store']);
Route::put('/solicitud/{id}',[SolicitudController::class,'update']);
Route::delete('/solicitud/{id}',[SolicitudController::class,'destroy']);
Route::get('/solicitud/docente/{id}', [SolicitudController::class, 'showDocentes']);
Route::get('/solicitud/guardar',[SolicitudController::class,'mostrarGuardado']);
Route::post('/solicitud/guardar',[SolicitudController::class,'guardar']);
Route::get('/verificar-fecha/{fecha}', [SolicitudController::class, 'verificarFecha']);

//NOTIFICACIONES(NUEVO)
Route::get('/notificacion',[NotificacionController::class,'index']);
Route::post('/notificacion',[NotificacionController::class,'store']);
Route::get('/notificacion/{id}',[NotificacionController::class,'show']);
Route::delete('/notificacion/{id}',[NotificacionController::class,'destroy']);
//reserva

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
Route::get('/docentes/solicitudes/{id}', [UserController::class, 'showSolicitudes']);
//ruta para devolver grupos dado un id materia

Route::get('/gruposMateria/{id}', [UserController::class, 'showGrupos']);
//GRUPOS
//ruta para devolver grupos dado un id docente y un id materia
Route::get('/docentes/{docente_id}/{materia_id}', [GrupoController::class, 'getGruposPorUsuarioYMateria']);
//ruta para devolver docentes de una materia y un id docente
Route::get('/docentesMismaMateria/{docente_id}/{materia_id}', [GrupoController::class, 'getOtrosUsuariosConMismaMateria']);

Route::get('/Materias',[MateriaController::class,'index']);






Route::get('/showAllDocentes/{nombre}', [SolicitudController::class, 'showAllDocentes']);

Route::get('/AllDocentes', [SolicitudController::class, 'AllDocentes']);

Route::post('/periodos',[PeriodoController::class,'stores']);
Route::get('/allPeriodos', [PeriodoController::class, 'allPeriodos']);

Route::put('/solicitud/editar/{id}', [SolicitudController::class, 'editar']);


//autenticacion
Route::post('/auth/register',[ AuthController::class,'register']);
Route::post('/auth/login',[ AuthController::class,'login']);
Route::post('/auth/register-admin', [AuthController::class, 'registerAdmin']);


Route::middleware(['auth:sanctum'])->group(function (){
    Route::get('/solicitud',[SolicitudController::class,'index']);
    Route::post('/auth/logout',[ AuthController::class,'logout']);
    Route::get('/auth/checkToken',[AuthController::class,'checkToken']);

});


Route::middleware(['auth:sanctum','rol.admin'])->group(function(){
    Route::post('/auth/admin-action', [AuthController::class, 'adminOnlyAction']);
    Route::get('/reserva', [ReservaController::class, 'index']);
});



Route::get('/periodosAsignados/{id}',[PeriodoController::class,'listarPeriodos']);

Route::post('/cambiarEstadoUser/{id}',[SolicitudController::class,'cambiarEstadoUser']);
Route::post('/cambiarEstadoAdmin/{id}',[SolicitudController::class,'cambiarEstadoAdmin']);

Route::get('/periodoSolicitud', [Periodo_SolicitudController::class, 'index']);

Route::get('/periodoSolicitud2', [Periodo_SolicitudController::class, 'index2']);

Route::get('/nombre_usuario/{nombre}', [Periodo_SolicitudController::class, 'nombre_usuario']);


Route::get('/notificacion2',[NotificacionController::class,'index2']);

Route::get('/nombre_usuario_Notificacion/{nombre}',[NotificacionController::class,'nombre_usuario_Notificacion']);

Route::get('/solicitudID/{nombre}',[NotificacionController::class,'solicitudID']);





// Obtienes la regla pasando un ambiente
Route::get('/regla-ambientes/{id_ambiente}', [AmbientereglaController::class, 'getReglaByAmbiente']);






//DE LAS RESERVAS ACEPTADAS (MUESTRA LAS AULAS) EN LA FECHA-HORAINICIO-HORAFIN(SIN REPETICIONES)
Route::get('/obtenerSolicitudesPorFechaYHorario2/{fecha}/{inicio}/{fin}', [Periodo_SolicitudController::class, 'obtenerSolicitudesPorFechaYHorario2']);

//DE LAS RESERVAS ACEPTADAS (muestra las ubicaciones ) en la fecha-horainicio-horafin(sin repeticiones)
Route::get('/obtenerUbicacionDeSolicitudesAceptadas/{fecha}/{inicio}/{fin}', [Periodo_SolicitudController::class, 'obtenerUbicacionDeSolicitudesAceptadas']);

//CAMBIA EL ESTADO DE LAS RESERVA, POR NOMBRE AMBIENTE EN UNA FECHA-HORAINICIO-HORAFIN
Route::post('/cambiarEstadoPorNombreAmbienteYHorario/{aula}/{fechaSolicitud}/{horaInicio}/{horaFin}',[Periodo_SolicitudController::class,'cambiarEstadoPorNombreAmbienteYHorario']);

//CAMBIA El ESTADO DE LAS RESERVAS ,POR UBICACION FECHA HORA
Route::post('/cambiarEstadoPorUbicacionAmbienteYHorario/{ubicacion}/{fechaSolicitud}/{horaInicio}/{horaFin}',[Periodo_SolicitudController::class,'cambiarEstadoPorUbicacionAmbienteYHorario']);


//DE LAS RESERVAS, POR NOMBRE AMBIENTE EN UNA FECHA-HORAINICIO-HORAFIN => MUESTRA LOS ID_USER Y ID_SOLICITUD
Route::get('/mostrarSolicitudPorNombreAmbienteYHorario/{aula}/{fechaSolicitud}/{horaInicio}/{horaFin}',[Periodo_SolicitudController::class,'mostrarSolicitudPorNombreAmbienteYHorario']);
