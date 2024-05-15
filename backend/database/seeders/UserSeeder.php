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
        //id 1
        User :: create([
            'name' => 'CARLA',
            'apellidos' => 'SALAZAR SERRUDO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202400535', // '1234567890' => '1234567890
            'email' => 'carla@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        //id 2	
        User :: create([
            'name' => 'VLADIMIR ABEL',
            'apellidos' => 'COSTAS JAUREGUI',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202300535', // '1234567890' => '1234567890
            'email' => 'vladimir@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        //id 3
        User :: create([
            'name' => 'LETICIA',
            'apellidos' => 'BLANCO COCA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '1234567890', // '1234567890' => '1234567890
            'email' => 'leticia@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        //id 4
        User :: create([
            'name' => 'HERNAN',
            'apellidos' => 'USTARIZ VARGAS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202000535', // '1234567890' => '1234567890
            'email' => 'ustariz@gmail.com',
            'password' => bcrypt('12345678')

        ]);
        //id 5
        
        User :: create([
            'name' => 'HENRY FRANK',
            'apellidos' => 'VILLAROEL TAPIA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202001535', // '1234567890' => '1234567890
            'email' => 'villaroel@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        
        //id 6
        User :: create([
            'name' => 'VICTOR HUGO',
            'apellidos' => 'MONTAÑO QUIROGA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202002535', // '1234567890' => '1234567890
            'email' => 'montano@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 7
        User :: create([
            'name' => 'ROSEMARY',
            'apellidos' => 'TORRICO BASCOPE',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202005535', // '1234567890' => '1234567890
            'email' => 'torrico@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 8
        User :: create([
            'name' => 'HELDER OCTAVIO',
            'apellidos' => 'FERNANDEZ GUZMAN',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202006535', // '1234567890' => '1234567890
            'email' => 'fernandezg@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 9
        User :: create([
            'name' => 'SAMUEL',
            'apellidos' => 'ACHA PEREZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202007535', // '1234567890' => '1234567890
            'email' => 'achag@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 10
        User :: create([
            'name' => 'LUIS ROBERTO',
            'apellidos' => 'AGREDA CORRALES',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202008535', // '1234567890' => '1234567890
            'email' => 'agreda@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 11
        User :: create([
            'name' => 'INDIRA',
            'apellidos' => 'CAMACHO DEL CASTILLO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202009535', // '1234567890' => '1234567890
            'email' => 'camacho@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        //id 12        

        User :: create([
            'name' => 'CARLOS B.',
            'apellidos' => 'MANZUR SORIA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202000635', // '1234567890' => '1234567890
            'email' => 'manzur@gmail.com',
            'password' => bcrypt('12345678')
        ]);
      
    }
}
