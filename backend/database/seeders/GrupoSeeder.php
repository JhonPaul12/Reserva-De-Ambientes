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
        //intro - lety
        Grupo::create([
            'grupo' =>1,
            'materia_id' => 2
        ]);
        //elemento-rosmary
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 7
        ]);
        //arqui-acha
        Grupo::create([
            'grupo' =>1,
            'materia_id' => 11
        ]);
        //programacion-rosemary
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 12
        ]);
        //




        Grupo::create([
            'grupo' => 2,
            'materia_id' => 1
        ]);
        
    }
}