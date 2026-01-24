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
        Schema::create('queue_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('queue_id');
            $table->unsignedBigInteger('step_id')->nullable();
            $table->enum('action', ['entered', 'completed', 'returned', 'cancelled'])->default('entered');
            $table->text('remarks')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable(); // admin user
            $table->foreign('queue_id')
                ->references('id')
                ->on('queues')
                ->onDelete('cascade');

            $table->foreign('step_id')
                ->references('id')
                ->on('service_steps')
                ->nullOnDelete();

            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queue_logs');
    }
};
