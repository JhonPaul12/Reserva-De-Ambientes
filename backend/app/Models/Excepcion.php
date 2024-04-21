<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Excepcion extends Model
{
    use HasFactory;

    protected $filleable=[
        "fecha_excepcion",
        "motivo"
    ];

    public function regla_excs()
    {
        return $this->hasMany(Regla_exc::class);
    }
}
