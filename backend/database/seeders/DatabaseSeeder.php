<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([

            UserSeeder::class,
            RolSeeder::class,
            MateriaSeeder::class,
            GrupoSeeder::class,
            HorarioSeeder::class,
            AmbienteSeeder::class,
            SolicitudSeeders::class
        ]);
    }
}
