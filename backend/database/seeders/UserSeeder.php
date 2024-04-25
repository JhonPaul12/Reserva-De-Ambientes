<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User :: create([
            'name' => 'andres',
            'apellidos' => 'guzman',
            'telefono' => '12345678',
            'codigo_sis' => '1234567890', // '1234567890' => '1234567890
            'email' => 'andres@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        User :: create([
            'name' => 'juan',
            'apellidos' => 'perez',
            'telefono' => '12345638',
            'codigo_sis' => '1234567893', // '1234567890' => '1234567890
            'email' => 'juan@gmail.com',
            'password' => bcrypt('12345678')
        ]);
    }
}
