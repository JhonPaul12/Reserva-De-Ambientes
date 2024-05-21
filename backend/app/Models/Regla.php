<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regla extends Model
{
    use HasFactory;
    protected $fillable=[
        "nombre",
        "fecha_inicial",
        "fecha_final",
        "activa"
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
