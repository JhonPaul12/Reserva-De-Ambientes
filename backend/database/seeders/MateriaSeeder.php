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
        //1
        Materia::create([
            'nombre_materia' => 'Introduccion A La Programacion',
            
        ]);
      
        //2
        Materia::create([
            'nombre_materia' => 'Elementos De Programacion Y Estructura De Datos',
            
        ]);
        //3
       
        Materia::create([
            'nombre_materia' => 'Programacion Web',
            
        ]);
        //4 
        Materia::create([
            'nombre_materia' => 'Teoria De Grafos',
            
        ]);
        //5
        Materia::create([
            'nombre_materia' => 'Arquitecura De Computadoras I',
            
        ]);
        //6 
        Materia::create([
            'nombre_materia' => 'Programacion',
            
        ]);
        //7
        Materia::create([
            'nombre_materia' => 'Organizacion Y Metodos',
           
        ]);
        //8
        Materia::create([
            'nombre_materia' => 'Metodos Y Tecnicas De Programacion',
          
        ]);
    }
}
