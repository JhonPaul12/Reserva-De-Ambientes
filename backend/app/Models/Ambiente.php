<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasFactory;
    protected $fillable = [
        "nombre",
        "tipo",
        "ubicacion",
        "capacidad"
    ];

    public function fecha(){
        return $this->hasMany(Fecha::class);
    }
}
