<?php

namespace App\Models;
use App\Models\Usuario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Rol extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'rol_user');
    }
}
