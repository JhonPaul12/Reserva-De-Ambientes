<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo_Solicitud extends Model
{
    use HasFactory;

    protected $table = 'periodo_solicitud';

    protected $fillable = [
        'solicitud_id',
        'periodo_id',
    ];
    public function periodo(){
        return $this->belongsTo(Periodo::class,'periodo_id');
    }
    public function solicitud(){
        return $this->belongsTo(Solicitud::class,'solicitud_id');
    }
}
