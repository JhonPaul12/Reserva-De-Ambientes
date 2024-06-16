<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Grupo extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function solicitudes()
    {
        return $this->belongsToMany(Solicitud::class, 'grupo_solicitud');
    }
}
