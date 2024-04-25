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
        return $this->hasMany(Periodo::class);
    }

    public function regla()
    {
        return $this->hasOne(Regla::class);
    }

<<<<<<< HEAD
    
=======
    public function solicitud(){
        return $this->hasMany(Solicitud::class);
    }
>>>>>>> 8936eb01f649e72eac306f1d8cb383471ba793ba
}
