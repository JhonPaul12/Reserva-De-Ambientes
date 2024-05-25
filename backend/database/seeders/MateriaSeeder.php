<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Materia;
class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //1
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 1	
        ]);
        //2
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 2	
        ]);
        //3
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 3	
        ]);
        //4
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 4	
        ]);
        //5
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 5
        ]);
        //6
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 6	
        ]);
        //7
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 7	
        ]);
        //8
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 3
        ]);
        //9
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 8
        ]);
        //10
        Materia::create([
            'nombre_materia' => 'Programacion Web',
            'user_id' => 2	
        ]);
     
    }
}
