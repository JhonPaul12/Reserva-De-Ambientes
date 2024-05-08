<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;

    protected $fillable = [
        "dia",
        "hora_inicio",
        "hora_fin"
    ];

    public function periodo(){
        return $this->hasMany(Periodo::class,'id_horario');
    }
}
