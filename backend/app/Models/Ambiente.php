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
    //protected $guarded=[];

    public function periodo(){
        return $this->hasMany(Periodo::class,'id_ambiente');
    }

    public function regla()
    {
        return $this->hasOne(Regla::class);
    }

    public function solicitud(){
        return $this->hasMany(Solicitud::class);
    }

}
