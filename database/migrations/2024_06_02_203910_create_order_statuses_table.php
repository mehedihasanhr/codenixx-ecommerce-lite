<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('background')->nullable();
            $table->string('foreground')->nullable();
            $table->timestamps();
        });

        // Insert default statuses
        DB::table('order_statuses')->insert([
            ['name' => 'pending', 'description' => 'Order is pending', 'background' => '#fdf2ce', 'foreground' => '#ac8607'],
            ['name' => 'processing', 'description' => 'Order is being processed', 'background' => '#e8f2fe', 'foreground' => '#147ff0'],
            ['name' => 'completed', 'description' => 'Order has been completed', 'background' => '#e7f8e6', 'foreground' => '#12b904'],
            ['name' => 'cancelled', 'description' => 'Order has been cancelled', 'background' => '#fdebe6', 'foreground' => '#ea3601']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_statuses');
    }
};
