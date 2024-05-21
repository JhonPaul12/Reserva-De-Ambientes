<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente_regla extends Model
{
    use HasFactory;

    protected $fillable = [
        "id_ambiente",
        "id_regla"
    ];
    public function regla()
    {
        return $this->belongsTo(Regla::class);
    }

    public function ambiente()
    {
        return $this->belongsTo(Ambiente::class);
    }
}
