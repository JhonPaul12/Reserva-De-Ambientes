<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regla extends Model
{
    use HasFactory;
    protected $fillable=[
        "id_ambiente",
        "hora_inicial",
        "hora_final",
        "fecha_inicial",
        "fecha_final"
    ];

    public function regla_excs()
    {
        return $this->hasMany(Regla_exc::class);
    }
}
