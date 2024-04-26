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
        
        Grupo::create([
            'grupo' =>1,
            'materia_id' => 1
        ]);
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 2
        ]);
        Grupo::create([
            'grupo' =>1,
            'materia_id' => 3
        ]);
        Grupo::create([
            'grupo' => 1,
            'materia_id' => 4
        ]);
        Grupo::create([
            'grupo' =>2,
            'materia_id' => 1
        ]);
        Grupo::create([
            'grupo' => 2,
            'materia_id' => 3
        ]);
       
    }
}