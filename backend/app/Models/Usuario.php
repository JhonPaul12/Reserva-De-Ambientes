<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre', 'apellidos', 'telefono', 'codigo_sis', 'correo_electronico'
    ];


    public function roles()
    {
        return $this->hasMany(UsuarioRol::class);
    }
}
