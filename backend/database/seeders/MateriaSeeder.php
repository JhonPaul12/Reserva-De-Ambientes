<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Materia;
class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $materias = [
            ['nombre_materia' => 'INGLES I'],//id 1
            ['nombre_materia' => 'FISICA GENERAL'],//id 2
            ['nombre_materia' => 'ALGEBRA I'],//id 3
            ['nombre_materia' => 'CALCULO I'],//id 4
            ['nombre_materia' => 'INTRODUCCION A LA PROGRAMACION'],//id 5
            ['nombre_materia' => 'INGLES II'],//id 6
            ['nombre_materia' => 'ALGEBRA II'],//id 7
            ['nombre_materia' => 'CALCULO II'],//id 8
            ['nombre_materia' => 'ELEM. DE PROGRAMACION Y ESTRUC. DE DATOS'],//id 9
            ['nombre_materia' => 'ARQUITECTURA DE COMPUTADORAS I'],//id 10
            ['nombre_materia' => 'PROGRAMACION'],//id 11
            ['nombre_materia' => 'CALCULO NUMERICO'],//id 12
            ['nombre_materia' => 'LOGICA'],//id 13
            ['nombre_materia' => 'ARQUITECTURA DE COMPUTADORAS II'],//id 14
            ['nombre_materia' => 'TEORIA DE GRAFOS'],//id 15
            ['nombre_materia' => 'ORGANIZACION Y METODOS'],//id 16
            ['nombre_materia' => 'METODOS Y TECNICAS DE PROGRAMACION'],//id 17
            ['nombre_materia' => 'PROBABILIDAD Y ESTADISTICA'],//id 18
            ['nombre_materia' => 'TALLER DE PROGRAMACION EN BAJO NIVEL'],//id 19
            ['nombre_materia' => 'BASE DE DATOS I'],//id 20
            ['nombre_materia' => 'SISTEMAS DE INFORMACION I'],//id 21
            ['nombre_materia' => 'PROGRAMACION FUNCIONAL'],//id 22
            ['nombre_materia' => 'ALGORITMOS AVANZADOS'],//id 23
            ['nombre_materia' => 'BASE DE DATOS II'],//id 24
            ['nombre_materia' => 'TALLER DE SISTEMAS OPERATIVOS'],//id 25
            ['nombre_materia' => 'SISTEMAS DE INFORMACION II'],//id 26
            ['nombre_materia' => 'TEORIA DE AUTOMATAS Y LENG. FORMALES'],//id 27
            ['nombre_materia' => 'GRAFICACION POR COMPUTADORA'],//id 28
            ['nombre_materia' => 'INTELIGENCIA ARTIFICIAL I'],//id 29
            ['nombre_materia' => 'INGENIERIA DE SOFTWARE'],//id 30
            ['nombre_materia' => 'REDES DE COMPUTADORAS'],//id 31
            ['nombre_materia' => 'ESTRUCTURA Y SEMANTICA DE LENGUAJES DE PROGRA'],//id 32
            ['nombre_materia' => 'TALLER DE BASE DE DATOS'],//id 33
            ['nombre_materia' => 'INTELIGENCIA ARTIFICIAL II'],//id 34
            ['nombre_materia' => 'PROGRAMACION WEB'],//id 35
            ['nombre_materia' => 'SIMULACION DE SISTEMAS'],//id 36
            ['nombre_materia' => 'TALLER DE INGENIERIA DE SOFTWARE'],//id 37
            ['nombre_materia' => 'INTERACCION HUMANO COMPUTADOR'],//id 38
            ['nombre_materia' => 'TECNOLOGIA REDES AVANZADAS'],//id 39
            ['nombre_materia' => 'APLICACION DE SISTEMAS OPERATIVOS'],//id 40
            ['nombre_materia' => 'EVALUACION Y AUDITORIA DE SISTEMAS'],//id 41
            ['nombre_materia' => 'TALLER DE GRADO I'],//id 42
            ['nombre_materia' => 'PROCESOS AGILES'],//id 43
            ['nombre_materia' => 'ENTORNOS VIRTUALES DE APRENDIZAJE'],//id 44
            ['nombre_materia' => 'SERVICIOS TELEMATICOS'],//id 45
            ['nombre_materia' => 'RECONOCIMIENTO DE VOZ'],//id 46
            ['nombre_materia' => 'SEGURIDAD DE SISTEMAS'],//id 47
            ['nombre_materia' => 'TALLER DE GRADO II'],//id 48
            ['nombre_materia' => 'CLOUD COMPUTING'],//id 49
            ['nombre_materia' => 'BUSINESS INTELLIGENCE Y BIG DATA'],//id 50
            ['nombre_materia' => 'CIENCIA DE DATOS Y MACHINE LEARNING'],//id 51
        ];

        // Iterar sobre el array de materias y crear cada una en la base de datos
        foreach ($materias as $materia) {
            Materia::create($materia);
        }
    }
}
