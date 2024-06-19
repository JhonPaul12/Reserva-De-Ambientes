<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grupo;
use App\Models\Materia;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // INGLES I
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 1,
            'user_id' => 1
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 1,
            'user_id' => 1
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 1,
            'user_id' => 2
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 1,
            'user_id' => 3
        ]);

        Grupo::create([
            'grupo' => '5',
            'materia_id' => 1,
            'user_id' => 1
        ]);


        // FISICA GENERAL
        Grupo::create([
            'grupo' => '0',
            'materia_id' => 2,
            'user_id' => 4
        ]);

        Grupo::create([
            'grupo' => '1',
            'materia_id' => 2,
            'user_id' => 5
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 2,
            'user_id' => 6
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 2,
            'user_id' => 7
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 2,
            'user_id' => 6
        ]);

        Grupo::create([
            'grupo' => '5',
            'materia_id' => 2,
            'user_id' => 8
        ]);

        Grupo::create([
            'grupo' => '6',
            'materia_id' => 2,
            'user_id' => 8
        ]);


        // ALGEBRA I
        Grupo::create([
            'grupo' => '10',
            'materia_id' => 3,
            'user_id' => 9
        ]);

        Grupo::create([
            'grupo' => '15',
            'materia_id' => 3,
            'user_id' => 10 
        ]);

        Grupo::create([
            'grupo' => '8',
            'materia_id' => 3,
            'user_id' => 11
        ]);


        // CALCULO I
        Grupo::create([
            'grupo' => '11',
            'materia_id' => 4,
            'user_id' => 12
        ]);


        // INTRODUCCION A LA PROGRAMACION
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 5,
            'user_id' => 13
        ]);

        Grupo::create([
            'grupo' => '10',
            'materia_id' => 5,
            'user_id' => 14
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 5,
            'user_id' => 15
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 5,
            'user_id' => 16
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 5,
            'user_id' => 17
        ]);

        Grupo::create([
            'grupo' => '5',
            'materia_id' => 5,
            'user_id' => 18
        ]);

        Grupo::create([
            'grupo' => '6',
            'materia_id' => 5,
            'user_id' => 13
        ]);

        Grupo::create([
            'grupo' => '7',
            'materia_id' => 5,
            'user_id' => 14
        ]);


        // INGLES II
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 6,
            'user_id' => 2
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 6,
            'user_id' => 2
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 6,
            'user_id' => 2
        ]);


        // ALGEBRA II
        Grupo::create([
            'grupo' => '5',
            'materia_id' => 7,
            'user_id' => 19
        ]);

        Grupo::create([
            'grupo' => '6',
            'materia_id' => 7,
            'user_id' => 20
        ]);

        Grupo::create([
            'grupo' => '8',
            'materia_id' => 7,
            'user_id' => 21
        ]);


        // CALCULO II
        Grupo::create([
            'grupo' => '12',
            'materia_id' => 8,
            'user_id' => 22
        ]);

        Grupo::create([
            'grupo' => '6',
            'materia_id' => 8,
            'user_id' => 23
        ]);


        // ELEM. DE PROGRAMACION Y ESTRUC. DE DATOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 9,
            'user_id' => 24
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 9,
            'user_id' => 15
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 9,
            'user_id' => 15
        ]);

        Grupo::create([
            'grupo' => '5',
            'materia_id' => 9,
            'user_id' => 25
        ]);


        // ARQUITECTURA DE COMPUTADORAS I
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 10,
            'user_id' => 26
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 10,
            'user_id' => 15
        ]);


        // PROGRAMACION
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 11,
            'user_id' => 24
        ]);


        // CALCULO NUMERICO
        Grupo::create([
            'grupo' => '2',
            'materia_id' => 12,
            'user_id' => 27
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 12,
            'user_id' => 28
        ]);


        // LOGICA
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 13,
            'user_id' => 29
        ]);


        // ARQUITECTURA DE COMPUTADORAS II
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 14,
            'user_id' => 30
        ]);


        // TEORIA DE GRAFOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 15,
            'user_id' => 31
        ]);


        // ORGANIZACION Y METODOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 16,
            'user_id' => 32
        ]);


        // METODOS Y TECNICAS DE PROGRAMACION
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 17,
            'user_id' => 33
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 17,
            'user_id' => 34
        ]);

        Grupo::create([
            'grupo' => '5',
            'materia_id' => 17,
            'user_id' => 31
        ]);


        // PROBABILIDAD Y ESTADISTICA
        Grupo::create([
            'grupo' => '3',
            'materia_id' => 18,
            'user_id' => 35
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 18,
            'user_id' => 21
        ]);


        // TALLER DE PROGRAMACION EN BAJO NIVEL
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 19,
            'user_id' => 36
        ]);


        // BASE DE DATOS I
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 20,
            'user_id' => 37
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 20,
            'user_id' => 38
        ]);


        // SISTEMAS DE INFORMACION I
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 21,
            'user_id' => 13
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 21,
            'user_id' => 13
        ]);


        // PROGRAMACION FUNCIONAL
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 22,
            'user_id' => 41
        ]);

        // ALGORITMOS AVANZADOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 23,
            'user_id' => 15
        ]);


        // BASE DE DATOS II
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 24,
            'user_id' => 41
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 24,
            'user_id' => 41
        ]);


        // TALLER DE SISTEMAS OPERATIVOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 25,
            'user_id' => 40
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 25,
            'user_id' => 40
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 25,
            'user_id' => 39
        ]);


        // SISTEMAS DE INFORMACION II
        // Grupo::create([
        //     'grupo' => '1',
        //     'materia_id' => 26,
        //     'user_id' => 41
        // ]);

        // Grupo::create([
        //     'grupo' => '2',
        //     'materia_id' => 26,
        //     'user_id' => 42
        // ]);


        // TEORIA DE AUTOMATAS Y LENG. FORMALES
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 27,
            'user_id' => 18
        ]);


        // GRAFICACION POR COMPUTADORA
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 28,
            'user_id' => 38
        ]);


        // INTELIGENCIA ARTIFICIAL I
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 29,
            'user_id' => 42
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 29,
            'user_id' => 43
        ]);


        // INGENIERIA DE SOFTWARE
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 30,
            'user_id' => 32
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 30,
            'user_id' => 24
        ]);


        // REDES DE COMPUTADORAS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 31,
            'user_id' => 40
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 31,
            'user_id' => 40
        ]);


        // ESTRUCTURA Y SEMANTICA DE LENGUAJES DE PROGRA
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 32,
            'user_id' => 43
        ]);


        // TALLER DE BASE DE DATOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 33,
            'user_id' => 38
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 33,
            'user_id' => 38
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 33,
            'user_id' => 50
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 33,
            'user_id' => 38
        ]);


        // INTELIGENCIA ARTIFICIAL II
        Grupo::create([
            'grupo' => '2',
            'materia_id' => 34,
            'user_id' => 42
        ]);


        // PROGRAMACION WEB
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 35,
            'user_id' => 14
        ]);


        // SIMULACION DE SISTEMAS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 36,
            'user_id' => 17
        ]);


        // TALLER DE INGENIERIA DE SOFTWARE
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 37,
            'user_id' => 33
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 37,
            'user_id' => 15
        ]);


        // INTERACCION HUMANO COMPUTADOR
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 38,
            'user_id' => 33
        ]);


        // TECNOLOGIA REDES AVANZADAS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 39,
            'user_id' => 36
        ]);


        // APLICACION DE SISTEMAS OPERATIVOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 40,
            'user_id' => 39
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 40,
            'user_id' => 39
        ]);


        // EVALUACION Y AUDITORIA DE SISTEMAS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 41,
            'user_id' => 44
        ]);

        Grupo::create([
            'grupo' => '2',
            'materia_id' => 41,
            'user_id' => 45
        ]);


        // TALLER DE GRADO I
        Grupo::create([
            'grupo' => '6',
            'materia_id' => 42,
            'user_id' => 33
        ]);

        Grupo::create([
            'grupo' => '7',
            'materia_id' => 42,
            'user_id' => 44
        ]);


        // PROCESOS AGILES
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 43,
            'user_id' => 46
        ]);


        // ENTORNOS VIRTUALES DE APRENDIZAJE
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 44,
            'user_id' => 14
        ]);


        // SERVICIOS TELEMATICOS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 45,
            'user_id' => 47
        ]);


        // RECONOCIMIENTO DE VOZ
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 46,
            'user_id' => 42
        ]);


        // SEGURIDAD DE SISTEMAS
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 47,
            'user_id' => 48
        ]);


        // TALLER DE GRADO II
        Grupo::create([
            'grupo' => '2',
            'materia_id' => 48,
            'user_id' => 18
        ]);

        Grupo::create([
            'grupo' => '3',
            'materia_id' => 48,
            'user_id' => 42
        ]);

        Grupo::create([
            'grupo' => '4',
            'materia_id' => 48,
            'user_id' => 43
        ]);


        // CLOUD COMPUTING
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 49,
            'user_id' => 31
        ]);


        // BUSINESS INTELLIGENCE Y BIG DATA
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 50,
            'user_id' => 49
        ]);


        // CIENCIA DE DATOS Y MACHINE LEARNING
        Grupo::create([
            'grupo' => '1',
            'materia_id' => 51,
            'user_id' => 43
        ]);
     
    }
}