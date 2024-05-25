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
            'ubicacion' => 'EDIFICIO ACADÉMICO 2 PLANTA BAJA',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Ambiente::create([
            'nombre' => '690B',
            'tipo' => 'Aula',
            'ubicacion' => 'EDIFICIO ACADÉMICO 2 PLANTA BAJA',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Ambiente::create([
            'nombre' => '690C',
            'tipo' => 'Aula',
            'ubicacion' => 'EDIFICIO ACADÉMICO 2 PLANTA BAJA',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Ambiente::create([
            'nombre' => '691A',
            'tipo' => 'Aula',
            'ubicacion' => 'EDIFICIO ACADÉMICO 2 PRIMER PISO',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Ambiente::create([
            'nombre' => '691B',
            'tipo' => 'Aula',
            'ubicacion' => 'Edificio Central',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Ambiente::create([
            'nombre' => '691C',
            'tipo' => 'Aula',
            'ubicacion' => 'EDIFICIO ACADÉMICO 2 PRIMER PISO',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Sala de juntas',
            'tipo' => 'Multifuncional',
            'ubicacion' => 'BIBLIOTECA FCYT',
            'capacidad' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Laboratorio 1',
            'tipo' => 'Laboratorio',
            'ubicacion' => 'AULAS INFLAB',
            'capacidad' => 300,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
