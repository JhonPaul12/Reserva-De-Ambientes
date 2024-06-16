<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Materia extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_materia'
    ];
    protected $guarded = [];
    
    public function grupos()
    {
        return $this->hasMany(Grupo::class,'materia_id');
    }
  
    public function solicitud(){
        return $this->hasMany(Solicitud::class, 'id_materia');
    }
}
