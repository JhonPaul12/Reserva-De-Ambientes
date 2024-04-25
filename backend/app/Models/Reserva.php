<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reservas';
    protected $fillable = [
        'fecha_reserva',
        'solicitud_id'
    ];

    public function solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }

    public function periodos()
    {
        return $this->hasMany(Periodo::class);
    }
    use HasFactory;
}
