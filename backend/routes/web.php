<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('index');
// });

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api).*$'); 



Route::get('/insert-rol-user', function () {
    DB::table('rol_user')->insert([
        'rol_id' => 1,
        'user_id' => 2
    ]);
});
