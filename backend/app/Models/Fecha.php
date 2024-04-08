<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fecha extends Model
{
    use HasFactory;

    protected $fillable=[
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
