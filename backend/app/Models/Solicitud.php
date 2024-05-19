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
        'numero_estudiantes',
        'id_materia',
        'ambiente_id'
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class, 'id_materia');
    }

    public function grupos()
    {
        return $this->belongsToMany(Grupo::class, 'grupo_solicitud');
    }
    public function ambiente(){
        return $this->belongsTo(Ambiente::class);
    }
    use HasFactory;
    public function users()
    {
        return $this->belongsToMany(User::class, 'solicitud_user');
    }
    public function periodos()
    {
    return $this->belongsToMany(Periodo::class,'periodo_solicitud');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class);
    }
    public function periodo_solicitud(){
        return $this->hasMany(Periodo_Solicitud::class,'solicitud_id');
    }
}
