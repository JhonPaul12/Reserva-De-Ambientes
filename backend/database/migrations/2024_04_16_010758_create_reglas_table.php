<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReglasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reglas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ambiente_id');
            $table->time('hora_inicial');
            $table->time('hora_final');
            $table->date('fecha_inicial');
            $table->date('fecha_final');
            $table->foreign('ambiente_id')->references('id')->on('ambientes');
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
        Schema::dropIfExists('reglas');
    }
}
