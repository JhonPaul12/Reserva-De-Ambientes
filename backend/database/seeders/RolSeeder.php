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
            'estado' => 'Habilitado',
        ]);
        Rol::create([
            'nombre' => 'Docente',
            'estado' => 'Habilitado'
        ]); 
        Rol::create([
            'nombre' => 'Administrador',
            'estado' => 'Desabilitado',
        ]);
        Rol::create([
            'nombre' => 'Docente',
            'estado' => 'Desabilitado'
        ]);
        
        

        DB::table ('rol_user')->insert([
            'rol_id' => 1,
            'user_id' => 1
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 1
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 2
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 3
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 4
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 5
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 6
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 7
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 8
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 9
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 10
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 11
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 12
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 2,
            'user_id' => 14
        ]);



        DB::table ('rol_user')->insert([
            'rol_id' => 4,
            'user_id' => 15
        ]);
        DB::table ('rol_user')->insert([
            'rol_id' => 1,
            'user_id' => 13
        ]);

    }
}
