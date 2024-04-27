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
            'tipo' => 'aula regular',
            'ubicacion' => 'cerca de la biblioteca',
            'capacidad' => 140,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Sala de juntas',
            'tipo' => 'Oficina',
            'ubicacion' => 'Piso 7',
            'capacidad' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ambiente::create([
            'nombre' => 'Auditorio principal',
            'tipo' => 'Auditorio',
            'ubicacion' => 'Piso 2',
            'capacidad' => 300,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
