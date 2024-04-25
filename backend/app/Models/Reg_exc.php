<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reg_exc extends Model
{
    use HasFactory;
    protected $filleable = [
        "regla_id",
        "excepcion_id",
        "tipo"
    ];
}
