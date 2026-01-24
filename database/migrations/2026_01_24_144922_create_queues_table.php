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
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->string('queue_number')->index();
            $table->string('reference_no')->nullable();
            $table->string('client_name');
            $table->string('requesting_office')->nullable;

            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('current_step_id')->nullable();

            $table->enum('status', ['waiting', 'processing', 'on_hold', 'returned', 'completed', 'cancelled'])->default('waiting');



            $table->foreign('service_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade');

            $table->foreign('current_step_id')
                ->references('id')
                ->on('service_steps')
                ->nullOnDelete();

            $table->timestamp('completed_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queues');
    }
};
