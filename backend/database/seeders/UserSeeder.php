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
            'name' => 'Leticia',
            'apellidos' => 'Blanco Coca',
            'telefono' => '12345678',
            'codigo_sis' => '202400535', // '1234567890' => '1234567890
            'email' => 'leticia@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        User :: create([
            'name' => 'Vladimir Abel',
            'apellidos' => 'Costas Jauregui',
            'telefono' => '12345678',
            'codigo_sis' => '202300535', // '1234567890' => '1234567890
            'email' => 'vladimir@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        User :: create([
            'name' => 'Yony Richard',
            'apellidos' => 'Montoya Burgos',
            'telefono' => '202200535',
            'codigo_sis' => '1234567890', // '1234567890' => '1234567890
            'email' => 'yony@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        User :: create([
            'name' => 'Corina',
            'apellidos' => 'Flores Villarroel',
            'telefono' => '12345678',
            'codigo_sis' => '202100535', // '1234567890' => '1234567890
            'email' => 'corina@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        User :: create([
            'name' => 'Tatiana',
            'apellidos' => 'Aparicio Yuja',
            'telefono' => '12345678',
            'codigo_sis' => '202000535', // '1234567890' => '1234567890
            'email' => 'tatiana@gmail.com',
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
