<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    protected $table = 'solicitudes';
    protected $fillable = [
        'motivo',
        'fecha_solicitud',
        'hora_inicio',
        'hora_fin',
        'estado',
        'numero_estudiantes'
    ];
    use HasFactory;

}
