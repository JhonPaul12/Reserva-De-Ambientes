<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmbienteReglasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ambiente_reglas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_ambiente');
            $table->unsignedBigInteger('id_regla');
            $table->foreign('id_ambiente')->references('id')->on('ambientes')->onDelete('cascade');
            $table->foreign('id_regla')->references('id')->on('reglas')->onDelete('cascade');
            $table->unique(['id_ambiente', 'id_regla']);
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
        Schema::dropIfExists('ambiente_reglas');
    }
}
