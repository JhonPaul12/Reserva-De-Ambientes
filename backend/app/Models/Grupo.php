<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Grupo extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function materias()
    {
        return $this->belongsTo('materias');
    }

    public function solicitudes()
    {
        return $this->belongsToMany(Solicitud::class, 'grupo_solicitud');
    }
}
