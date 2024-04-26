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
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            'user_id' => 1	
        ]);
        Materia::create([
            'nombre_materia' => 'Programacion',
            'user_id' => 2
        ]);
        Materia::create([
            'nombre_materia' => 'Redes',
            'user_id' => 2
        ]);
        Materia::create([
            'nombre_materia' => 'Base De Datos I',
            'user_id' => 3
        ]);
        Materia::create([
            'nombre_materia' => 'Base De Datos II',
            'user_id' => 3
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas Operativos',
            'user_id' => 4
        ]);
        Materia::create([
            'nombre_materia' => 'Taller De Ingenieria De Software',
            'user_id' => 4
        ]);
        Materia::create([
            'nombre_materia' => 'Taller de Base de Datos',
            'user_id' => 5
        ]);
        Materia::create([
            'nombre_materia' => 'Algoritmos Avanzados',
            'user_id' => 2
        ]);
        Materia::create([
            'nombre_materia' => 'Programacion Web',
            'user_id' => 3
        ]);
        Materia::create([
            'nombre_materia' => 'Redes Avanzadas',
            'user_id' => 4
        ]);
        Materia::create([
            'nombre_materia' => 'Teoria De Grafos',
            'user_id' => 5
        ]);
        Materia::create([
            'nombre_materia' => 'Inteligencia Artificial',
            'user_id' => 2
        ]);
        Materia::create([
            'nombre_materia' => 'Inteligencia Artificial II',
            'user_id' => 3
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas de Informacion',
            'user_id' => 4
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas de Informacion II',
            'user_id' => 5
        ]);
    }
}
