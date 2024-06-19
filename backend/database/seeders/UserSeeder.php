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
       
       //id 1 MARIA BENITA CESPEDES GUIZADA
        User::create([
            'name' => 'MARIA BENITA ',
            'apellidos' => 'CESPEDES GUIZADA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'mariabenita@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 2 MAGDA LENA PEETERS ILONAA
        User::create([
            'name' => 'MAGDA LENA',
            'apellidos' => 'PEETERS ILONAA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'ilonaamagdalena@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 3 MARIA ESTELA GRILO SALVATIERRA
        User::create([
            'name' => 'MARIA ESTELA',
            'apellidos' => 'GRILO SALVATIERRA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'mariaestela@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 4 ROBERTO VALENZUELA MIRANDA
        User::create([
            'name' => 'ROBERTO',
            'apellidos' => 'VALENZUELA MIRANDA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'robertovalenzuela@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 5 RENE MOREIRA CALIZAYA
        User::create([
            'name' => 'RENE',
            'apellidos' => 'MOREIRA CALIZAYA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'renemoreira@gmail.com',
            'password' => bcrypt('12345678')
        ]);


        //id 6 IVAN RUIZ UCUMARI
        User::create([
            'name' => 'IVAN',
            'apellidos' => 'RUIZ UCUMARI',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'ivanruiz@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 7 MIGUEL ANGEL ORDONEZ SALVATIERRA
        User::create([
            'name' => 'MIGUEL ANGEL',
            'apellidos' => 'ORDONEZ SALVATIERRA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'miguelangel@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 8 JUAN CARLOS TERRAZAS VARGAS
        User::create([
            'name' => 'JUAN CARLOS',
            'apellidos' => 'TERRAZAS VARGAS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'juancarlos@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 9 JUAN ANTONIO RODRIGUEZ SEJAS
        User::create([
            'name' => 'JUAN ANTONIO',
            'apellidos' => 'RODRIGUEZ SEJAS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'juanantonio@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 10 ALVARO HERNANDO CARRASCO CALVO
        User::create([
            'name' => 'ALVARO HERNANDO',
            'apellidos' => 'CARRASCO CALVO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'alvaroh@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 11 GUALBERTO LEON ROMERO
        User::create([
            'name' => 'GUALBERTO',
            'apellidos' => 'LEON ROMERO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'gualberto@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 12 RAMIRO ROJAS ZURITA
        User::create([
            'name' => 'RAMIRO',
            'apellidos' => 'ROJAS ZURITA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'ramirorojas@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 13 CARLA SALAZAR SERRUDO
        User::create([
            'name' => 'CARLA',
            'apellidos' => 'SALAZAR SERRUDO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'carla@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 14 VLADIMIR ABEL COSTAS JAUREGUI
        User::create([
            'name' => 'VLADIMIR ABEL',
            'apellidos' => 'COSTAS JAUREGUI',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'vladimirabel@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 15 LETICIA BLANCO COCA
        User :: create([
            'name' => 'LETICIA',
            'apellidos' => 'BLANCO COCA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => '202400535', 
            'email' => 'leticia@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 16 HERNAN USTARIZ VARGAS
        User::create([
            'name' => 'HERNAN',
            'apellidos' => 'USTARIZ VARGAS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'hernan@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 17 HENRY FRANK VILLARROEL TAPIA
        User::create([
            'name' => 'HENRY FRANK',
            'apellidos' => 'VILLARROEL TAPIA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'henryfrank@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 18 VICTOR HUGO MONTANO QUIROGA
        User::create([
            'name' => 'VICTOR HUGO',
            'apellidos' => 'MONTANO QUIROGA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'victorhugo@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 19 WALTER OSCAR GONZALO SALINAS
        User::create([
            'name' => 'WALTER OSCAR GONZALO',
            'apellidos' => 'SALINAS PERICON',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'walteroscar@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 20 HERNAN VICTOR SILVA RAMOS
        User::create([
            'name' => 'HERNAN VICTOR',
            'apellidos' => 'SILVA RAMOS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'hernanvictor@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 21 JOSE ROBERTO OMONTE OJALVO
        User::create([
            'name' => 'JOSE ROBERTO',
            'apellidos' => 'OMONTE OJALVO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'joseroberto@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 22 AMILCAR SAUL MARTINEZ MAIDA
        User::create([
            'name' => 'AMILCAR SAUL',
            'apellidos' => 'MARTINEZ MAIDA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'amilcar@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 23 JUAN TERRAZAS LOBO
        User::create([
            'name' => 'JUAN',
            'apellidos' => 'TERRAZAS LOBO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'juan@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 24 ROSEMARY TORRICO BASCOPE
        User::create([
            'name' => 'ROSEMARY',
            'apellidos' => 'TORRICO BASCOPE',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'rosemary@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 25 HELDER OCTAVIO FERNANDEZ GUZMAN
        User::create([
            'name' => 'HELDER OCTAVIO',
            'apellidos' => 'FERNANDEZ GUZMAN',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'helder@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 26 SAMUEL ACHA PEREZ
        User::create([
            'name' => 'SAMUEL',
            'apellidos' => 'ACHA PEREZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'samuel@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 27 DEMETRIO JUCHANI BAZUALDO
        User::create([
            'name' => 'DEMETRIO',
            'apellidos' => 'JUCHANI BAZUALDO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'demetrio@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 28 OSCAR A. ZABALAGA MONTANO
        User::create([
            'name' => 'OSCAR A.',
            'apellidos' => 'ZABALAGA MONTANO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'oscar@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 29 MAURICIO HOEPFNER REYNOLDS
        User::create([
            'name' => 'MAURICIO',
            'apellidos' => 'HOEPFNER REYNOLDS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'mauricio@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 30 LUIS ROBERTO AGREDA CORRALES
        User::create([
            'name' => 'LUIS ROBERTO',
            'apellidos' => 'AGREDA CORRALES',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'luis@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 31 YONY RICHARD MONTOYA BURGOS
        User::create([
            'name' => 'YONY RICHARD',
            'apellidos' => 'MONTOYA BURGOS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'yony@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 32 INDIRA CAMACHO DEL CASTILLO
        User::create([
            'name' => 'INDIRA',
            'apellidos' => 'CAMACHO DEL CASTILLO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'indira@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 33 CORINA FLORES VILLARROEL
        User::create([
            'name' => 'CORINA',
            'apellidos' => 'FLORES VILLARROEL',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'corina@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 34 CARLOS B. MANZUR SORIA
        User::create([
            'name' => 'CARLOS B.',
            'apellidos' => 'MANZUR SORIA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'carlosb@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 35 DAVID ALFREDO DELGADILLO COSSIO
        User::create([
            'name' => 'DAVID ALFREDO',
            'apellidos' => 'DELGADILLO COSSIO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'davidalfredo@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 36 MARCO ANTONIO MONTECINOS CHOQUE
        User::create([
            'name' => 'MARCO ANTONIO',
            'apellidos' => 'MONTECINOS CHOQUE',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'marcoantonio@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 37 VITTER JESUS MEDRANO PEREZ
        User::create([
            'name' => 'VITTER JESUS',
            'apellidos' => 'MEDRANO PEREZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'vitterjesus@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 38 BORIS CALANCHA NAVIA
        User::create([
            'name' => 'BORIS',
            'apellidos' => 'CALANCHA NAVIA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'boris@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 39 GROVER HUMBERTO CUSSI NICOLAS
        User::create([
            'name' => 'GROVER HUMBERTO',
            'apellidos' => 'CUSSI NICOLAS',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'groverhumberto@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        
        //id 40 JORGE WALTER ORELLANA ARAOZ
        User::create([
            'name' => 'JORGE WALTER',
            'apellidos' => 'ORELLANA ARAOZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'jorgewalter@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 41 TATIANA APARICIO YUJA
        User::create([
            'name' => 'TATIANA',
            'apellidos' => 'APARICIO YUJA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'tatiana@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 42 CARMEN ROSA GARCIA PEREZ
        User::create([
            'name' => 'CARMEN ROSA',
            'apellidos' => 'GARCIA PEREZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'carmen@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 43 ERIKA PATRICIA RODRIGUEZ BILBAO
        User::create([
            'name' => 'ERIKA PATRICIA',
            'apellidos' => 'RODRIGUEZ BILBAO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'erika@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        
        //id 44 PATRICIA ROMERO RODRIGUEZ
        User::create([
            'name' => 'PATRICIA',
            'apellidos' => 'ROMERO RODRIGUEZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'patricia@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 45 JIMMY VILLARROEL NOVILLO
        User::create([
            'name' => 'JIMMY',
            'apellidos' => 'VILLARROEL NOVILLO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'jimmy@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 46 NIBETH MENA MAMANI
        User::create([
            'name' => 'NIBETH',
            'apellidos' => 'MENA MAMANI',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'nibeth@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 47 AMERICO FIORILO LOZADA
        User::create([
            'name' => 'AMERICO',
            'apellidos' => 'FIORILO LOZADA',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'americo@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 48 MARCELO ANTEZANA CAMACHO
        User::create([
            'name' => 'MARCELO',
            'apellidos' => 'ANTEZANA CAMACHO',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'marcelo@gmail.com',
            'password' => bcrypt('12345678')
        ]);

        //id 49 VICTOR ADOLFO RODRIGUEZ ESTEVEZ
        User::create([
            'name' => 'VICTOR ADOLFO',
            'apellidos' => 'RODRIGUEZ ESTEVEZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'victor@gmail.com',
            'password' => bcrypt('12345678')
        ]);
        
        //id 50 JUAN MARCELO FLOREZ SOLIZ
        User::create([
            'name' => 'JUAN MARCELO',
            'apellidos' => 'FLOREZ SOLIZ',
            'telefono' => '6' . rand(1000000, 9999999),
            'codigo_sis' => rand(100000000, 999999999),
            'email' => 'juanmarcelo@gmail.com',
            'password' => bcrypt('12345678')
        ]);
    }
}
