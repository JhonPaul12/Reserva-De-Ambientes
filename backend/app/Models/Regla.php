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
        "fecha_final"
    ];

    public function regla_excs()
    {
        return $this->hasMany(Reg_exc::class);
    }

    public function ambiente()
    {
        return $this->belongsTo(Ambiente::class);
    }
}
