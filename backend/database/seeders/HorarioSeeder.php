<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Horario;
use Carbon\Carbon;

class HorarioSeeder extends Seeder
{
    public function run()
    {
        $diasLaborables = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes','sábado'];

        foreach ($diasLaborables as $dia) {
            $horaInicio = Carbon::createFromTime(6, 45);
            $horaFin = Carbon::createFromTime(21, 00);

            while ($horaInicio <= $horaFin) {
                Horario::create([
                    'dia' => $dia,
                    'hora_inicio' => $horaInicio->toTimeString(),
                    'hora_fin' => $horaInicio->addMinutes(45)->toTimeString(),
                ]);
            }
        }
    }
}
