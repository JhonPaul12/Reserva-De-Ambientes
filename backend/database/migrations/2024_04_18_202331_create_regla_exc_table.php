<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReglaExcTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regla_exc', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('regla_id');
            $table->unsignedBigInteger('excepcion_id');
            $table->foreign('regla_id')->references('id')->on('reglas');
            $table->foreign('excepcion_id')->references('id')->on('excepcions');
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
        Schema::dropIfExists('regla_exc');
    }
}
