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
        return $this->belongsTo(Ambiente::class);
    }

    public function horario(){
        return $this->belongsTo(Horario::class);
    }

}
