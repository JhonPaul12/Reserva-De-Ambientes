<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;
    protected $fillable=[
        "id_ambiente",
        "id_horario",
        "estado",
        "fecha"
    ];

    public function ambiente(){
        return $this->belongsTo(Ambiente::class,'id_ambiente');
    }

    public function horario(){
        return $this->belongsTo(Horario::class,'id_horario');
    }

    public function reserva()
    {
        return $this->belongsTo(Reserva::class);
    }
    public function solicitudes()
    {
        return $this->belongsToMany(Solicitud::class,'periodo_solicitud');
    }
    public function periodo_solicitud(){
        return $this->hasMany(Periodo_Solicitud::class,'periodo_id');
    }
}
