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
        $materia1 = Materia::where('nombre_materia', 'Introduccion A La Programacion')->first();
        $materia2 = Materia::where('nombre_materia', 'Programacion')->first();

        $grupo1 = Grupo::create(['grupo' =>1]);
        $grupo2 = Grupo::create(['grupo' => 2]);

        $materia1->grupos()->attach($grupo1->id);
        $materia2->grupos()->attach($grupo1->id);
    }
}