<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_materia'
    ];
    protected $guarded = [];
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'materia_user');
    }
}
