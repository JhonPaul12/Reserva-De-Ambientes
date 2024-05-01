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
            'user_id' => 6	
        ]);
        //3
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 2	
        ]);
        //4
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 7	
        ]);
        //5
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 8
        ]);
        //6
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 9	
        ]);
        //7
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 10	
        ]);
        //8
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 1
        ]);
        //9
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion y Estructura De Datos',
            'user_id' => 11
        ]);
        //10
        Materia::create([
            'nombre_materia' => 'Arquitectura De Computadoras I',
            'user_id' => 1	
        ]);
        //11
        Materia::create([
            'nombre_materia' => 'Arquitectura De Computadoras I',
            'user_id' => 12	
        ]);
        //12

        Materia::create([
            'nombre_materia' => 'Programacion',
            'user_id' => 10	
        ]);
        //13
        Materia::create([
            'nombre_materia' => 'Teoria De Grafos',
            'user_id' => 3	
        ]);
        //14
        Materia::create([
            'nombre_materia' => 'Metodos Y Tecnicas De Programacion',
            'user_id' => 4	
        ]);
        //15
        Materia::create([
            'nombre_materia' => 'Metodos Y Tecnicas De Programacion',
            'user_id' => 15	
        ]);
        //16
        Materia::create([
            'nombre_materia' => 'Metodos Y Tecnicas De Programacion',
            'user_id' => 3	
        ]);
        //17
        Materia::create([
            'nombre_materia' => 'Organizacion Y Metodos',
            'user_id' => 14	
        ]);
        //18
        Materia::create([
            'nombre_materia' => 'Algoritmos Avanzados',
            'user_id' => 1	
        ]);
        //19
        Materia::create([
            'nombre_materia' => 'Programacion Funcional',
            'user_id' => 5	
        ]);

     
    }
}
