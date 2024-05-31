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

        DB::table('rols')->insert([
            ['id' => 1, 'nombre_rol' => 'Admin'],
            ['id' => 2, 'nombre_rol' => 'User']
        ]);
    //    Rol::create([
    //         'nombre' => 'Administrador',
    //         'estado' => 'Habilitado',
    //     ]);
    //     Rol::create([
    //         'nombre' => 'Docente',
    //         'estado' => 'Habilitado'
    //     ]); 
    //     Rol::create([
    //         'nombre' => 'Administrador',
    //         'estado' => 'Desabilitado',
    //     ]);
    //     Rol::create([
    //         'nombre' => 'Docente',
    //         'estado' => 'Desabilitado'
    //     ]);
        
        

        DB::table ('rol_user')->insert([
            'rol_id' => 2,       
            'user_id' => 1,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 2,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 3,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 4,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 5,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 6,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 7,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 8,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 9,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 10,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 11,
            'rol_id' => 2,
        ]);
        DB::table ('rol_user')->insert([
            'user_id' => 12,
            'rol_id' => 2,
        ]);



    //     DB::table ('rol_user')->insert([
    //         'rol_id' => 4,
    //         'user_id' => 15
    //     ]);
    //     DB::table ('rol_user')->insert([
    //         'rol_id' => 1,
    //         'user_id' => 13
    //     ]);

    }
}
