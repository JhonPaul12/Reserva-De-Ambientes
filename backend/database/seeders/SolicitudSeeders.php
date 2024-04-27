<?php

namespace Database\Seeders;

use App\Models\Solicitud;
use Illuminate\Database\Seeder;

class SolicitudSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Solicitud::create([
            'motivo' => 'Reunión de equipo',
            'fecha_solicitud' => '2024-04-23',
            'hora_inicio' => '14:30:00',
            'hora_fin' => '16:00:00',
            'estado' => 'Pendiente',
            'numero_estudiantes' => 90,
            'ambiente_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Solicitud::create([
            'motivo' => 'Conferencia sobre tecnología',
            'fecha_solicitud' => '2024-04-30',
            'hora_inicio' => '13:00:00',
            'hora_fin' => '15:00:00',
            'estado' => 'Pendiente',
            'numero_estudiantes' => 50,
            'ambiente_id' => 3, // Asegúrate de usar un ID de ambiente existente
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Solicitud::create([
            'motivo' => 'Clase de matemáticas',
            'fecha_solicitud' => '2024-04-25',
            'hora_inicio' => '09:00:00',
            'hora_fin' => '11:00:00',
            'estado' => 'Aprobada',
            'numero_estudiantes' => 25,
            'ambiente_id' => 2, // Asegúrate de usar un ID de ambiente existente
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
