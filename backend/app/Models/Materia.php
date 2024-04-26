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
        return $this->hasMany('grupos');
    }
    public function user(): BelongsToMany
    {
        return $this->belongsTo('users');
    }
}
