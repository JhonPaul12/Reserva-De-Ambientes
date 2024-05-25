<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grupo;
use App\Models\Materia;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Introduccion a la Programacion 
        //Carla
        Grupo::create([
            'grupo' =>1,
            'materia_id' => 1
        ]);
        //Vladimir
        Grupo::create([
            'grupo' =>10,
            'materia_id' => 2
        ]);
        //Leticia
        Grupo::create([
            'grupo' =>2,
            'materia_id' => 3
        ]);
        //Ustariz
        Grupo::create([
            'grupo' =>3,
            'materia_id' => 4
        ]);
        //Henry 
        Grupo::create([
            'grupo' =>4,
            'materia_id' => 5
        ]);
        // Montañio
        Grupo::create([
            'grupo' =>6,
            'materia_id' => 6
        ]);
        //Carla
        Grupo::create([
            'grupo' =>6,
            'materia_id' => 1
        ]);
        //Vladimir
        Grupo::create([
            'grupo' =>7,
            'materia_id' => 2
        ]);
        //elementos
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 7
        ]);
        Grupo::create([
            'grupo' => 2,
            'materia_id' => 8
        ]);
        Grupo::create([
            'grupo' => 3,
            'materia_id' => 8
        ]);
        Grupo::create([
            'grupo' => 5 ,
            'materia_id' => 9
        ]);;
        //Programacion Web
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 10
        ]);        
    }
}