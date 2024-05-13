<?php

namespace Database\Seeders;

use App\Models\Ambiente;
use Illuminate\Database\Seeder;

class AmbienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ambiente::create([
            'nombre' => '690A',
            'tipo' => 'Aula',
            'ubicacion' => 'Edificio Central',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Sala de juntas',
            'tipo' => 'Multifuncional',
            'ubicacion' => 'Piso 7',
            'capacidad' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Laboratorio 1',
            'tipo' => 'Laboratorio',
            'ubicacion' => 'Memi',
            'capacidad' => 300,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
