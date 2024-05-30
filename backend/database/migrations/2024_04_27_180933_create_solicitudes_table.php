<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->id();
            $table->string('motivo');
            $table->date('fecha_solicitud');
            $table->String('estado')->default('Pendiente');
            $table->integer('numero_estudiantes');
            $table->foreignId('id_materia')->references('id')->on('materias')->onDelete('cascade');
           
            
            $table->foreignId('ambiente_id')->references('id')->on('ambientes')->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitudes');
    }
}
