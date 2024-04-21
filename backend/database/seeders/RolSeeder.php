<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;
use Illuminate\Support\Facades\DB;
class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       Rol::create([
            'nombre' => 'Administrador',
            'estado' => 'habilitado',
        ]);
        Rol::create([
            'nombre' => 'Docente',
            'estado' => 'habilitado'
        ]); 
        DB::table ('rol_user')->insert([
            'rol_id' => 1,
            'user_id' => 1
        ]);
    }
}
