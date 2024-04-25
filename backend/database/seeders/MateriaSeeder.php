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
            'nombre_materia' => 'Introduccion A La Programacion'	
        ]);
        Materia::create([
            'nombre_materia' => 'Programacion'
        ]);
        Materia::create([
            'nombre_materia' => 'Redes'
        ]);
        Materia::create([
            'nombre_materia' => 'Base De Datos I'
        ]);
        Materia::create([
            'nombre_materia' => 'Base De Datos II'
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas Operativos'
        ]);
        Materia::create([
            'nombre_materia' => 'Taller De Ingenieria De Software'
        ]);
        Materia::create([
            'nombre_materia' => 'Taller de Base de Datos'
        ]);
        Materia::create([
            'nombre_materia' => 'Algoritmos Avanzados'
        ]);
        Materia::create([
            'nombre_materia' => 'Programacion Web'
        ]);
        Materia::create([
            'nombre_materia' => 'Redes Avanzadas'
        ]);
        Materia::create([
            'nombre_materia' => 'Teoria De Grafos'
        ]);
        Materia::create([
            'nombre_materia' => 'Inteligencia Artificial'
        ]);
        Materia::create([
            'nombre_materia' => 'Inteligencia Artificial II'
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas de Informacion'
        ]);
        Materia::create([
            'nombre_materia' => 'Sistemas de Informacion II'
        ]);

        DB::table ('materia_user')->insert([
            'materia_id' => 2,
            'user_id' => 1
        ]);
        DB::table ('materia_user')->insert([
            'materia_id' => 2,
            'user_id' => 2
        ]);
    }
}
