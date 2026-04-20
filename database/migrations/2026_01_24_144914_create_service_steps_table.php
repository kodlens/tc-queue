<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_steps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade');
            $table->string('name', 255)->nullable();
            $table->string('tts_text', 255)->nullable();
            $table->integer('step_order')->default(0)->nullable();
            $table->integer('sla_minutes')->default(0)->nullable();
            $table->tinyInteger('is_tts')->default(1);
            $table->tinyInteger('active')->nullable();
            $table->index('service_id'); //index for better performance
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_steps');
    }
};
