<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Models\User;
use App\Models\Materia;

class GrupoController extends Controller
{
    
public function getGruposPorUsuarioYMateria($user_id, $materia_id)
{
    // Encuentra el usuario por su ID
    $user = User::find($user_id);

    // Si el usuario no existe, devuelve un error
    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Encuentra la materia por su ID
    $materia = Materia::find($materia_id);

    // Si la materia no existe, devuelve un error
    if (!$materia) {
        return response()->json(['message' => 'Materia no encontrada'], 404);
    }

    // Obtiene los grupos que pertenecen al usuario y a la materia
    $grupos = Grupo::where('user_id', $user_id)
                   ->where('materia_id', $materia_id)
                   ->get();

    // Si no hay grupos, devuelve un error
    if ($grupos->isEmpty()) {
        return response()->json(['message' => 'No hay grupos para este usuario y materia'], 404);
    }

    // Devuelve los grupos
    return response()->json($grupos, 200);
}



public function getOtrosUsuariosConMismaMateria($user_id, $materia_id)
{
    // Encuentra la materia por su ID
    $materia = Materia::find($materia_id);

    // Si la materia no existe, devuelve un error
    if (!$materia) {
        return response()->json(['message' => 'Materia no encontrada'], 404);
    }

    // Obtiene los grupos que pertenecen a la materia
    $grupos = $materia->grupos;

    // Filtra los grupos para excluir el user_id proporcionado
    $grupos = $grupos->where('user_id', '!=', $user_id);

    // Obtiene los usuarios de los grupos
    $usuarios = $grupos->map(function ($grupo) {
        return $grupo->user;
    });

    // Elimina los usuarios duplicados
    $usuarios = $usuarios->unique('id');

    // Devuelve los nombres de los usuarios
    return response()->json($usuarios, 200);
}


public function getNullUserGroups()
{
    // Obtiene los grupos y nombres de materias donde user_id es null
    $grupos = Grupo::whereNull('user_id')
                   ->join('materias', 'grupos.materia_id', '=', 'materias.id')
                   ->select('grupos.grupo', 'materias.nombre_materia as materia', 'materias.id as materia_id')
                   ->get();

    // Devuelve los grupos y nombres de materias
    return response()->json($grupos, 200);
}


}
