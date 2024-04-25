<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegExcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reg_excs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('regla_id');
            $table->unsignedBigInteger('excepcion_id');
            $table->string('tipo',10);
            $table->foreign('regla_id')->references('id')->on('reglas')->onDelete('cascade');
            $table->foreign('excepcion_id')->references('id')->on('excepcions')->onDelete('cascade');
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
        Schema::dropIfExists('reg_excs');
    }
}
