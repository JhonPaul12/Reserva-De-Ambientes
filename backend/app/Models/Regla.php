<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regla extends Model
{
    use HasFactory;
    protected $fillable=[
        "ambiente_id",
        "fecha_inicial",
        "fecha_final",
        "estado" //para ver si esta activa o no.
    ];

    public function regla_excs()
    {
        return $this->hasMany(Reg_exc::class);
    }

    public function reglaAmbientes()
    {
        return $this->hasMany(Ambiente_regla::class);
    }
}
