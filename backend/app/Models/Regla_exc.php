<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Regla_exc extends Model
{
    use HasFactory;
    protected $filleable = [
        "regla_id",
        "excepcion_id"
    ];

    public function regla(){
        return $this->belongsTo(Regla::class);
    }

    public function excepcion(){
        return $this->belongsTo(Excepcion::class);
    }
}
