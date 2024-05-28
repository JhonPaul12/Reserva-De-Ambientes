<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'apellidos', 'telefono', 'codigo_sis', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function rols(): BelongsToMany
    {
        return $this->belongsToMany(Rol::class, 'rol_user');
    }

    public function solicitudes(): BelongsToMany
    {
        return $this->belongsToMany(Solicitud::class, 'solicitud_user');
    }
    public function grupos()
    {
        return $this->hasMany(Grupo::class,'user_id');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class,'id_usuario');
    }
}
