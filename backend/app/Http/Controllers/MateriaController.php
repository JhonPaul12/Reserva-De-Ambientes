<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
{
    public function index()
    {
        $materias = Materia::all(); // Obtiene todas las materias

        return response()->json($materias); // Devuelve las materias como JSON
    }
}
