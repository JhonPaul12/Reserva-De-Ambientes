<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmbienteSolicitudTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ambiente_solicitud', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ambiente_id')->references('id')->on('ambientes')->onDelete('cascade');
            $table->foreignId('solicitud_id')->references('id')->on('solicitudes')->onDelete('cascade');
           
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
        Schema::dropIfExists('ambiente_solicitud');
    }
}
