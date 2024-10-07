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
        // Insert default statuses
        DB::table('order_statuses')->insert([
            [
                'name' => 'pending',
                'description' => 'Order is pending',
                'background' => '#fdf2ce',
                'foreground' => '#ac8607'
            ],
            [
                'name' => 'processing',
                'description' => 'Order is being processed',
                'background' => '#e8f2fe',
                'foreground' => '#147ff0'
            ],
            [
                'name' => 'completed',
                'description' => 'Order has been completed',
                'background' => '#e7f8e6',
                'foreground' => '#12b904'
            ],
            [
                'name' => 'cancelled',
                'description' => 'Order has been cancelled',
                'background' => '#fdebe6',
                'foreground' => '#ea3601'
            ],
            [
                'name' => 'shipped',
                'description' => 'Order has been shipped',
                'background' => '#e3f1ff',
                'foreground' => '#0a74da'
            ],
            [
                'name' => 'out_for_delivery',
                'description' => 'Order is out for delivery',
                'background' => '#fff4e6',
                'foreground' => '#ff9000'
            ],
            [
                'name' => 'delivered',
                'description' => 'Order has been delivered',
                'background' => '#eaffea',
                'foreground' => '#34c759'
            ],
            [
                'name' => 'returned',
                'description' => 'Order has been returned',
                'background' => '#ffe6e6',
                'foreground' => '#ff3b30'
            ],
            [
                'name' => 'refunded',
                'description' => 'Payment has been refunded',
                'background' => '#f0e6ff',
                'foreground' => '#8e44ad'
            ],
            [
                'name' => 'on_hold',
                'description' => 'Order is on hold',
                'background' => '#fdf2ce',
                'foreground' => '#e67e22'
            ],
            [
                'name' => 'failed',
                'description' => 'Order has failed',
                'background' => '#fdebe6',
                'foreground' => '#e74c3c'
            ],
            [
                'name' => 'awaiting_payment',
                'description' => 'Awaiting payment for the order',
                'background' => '#fff7e6',
                'foreground' => '#f39c12'
            ],
            [
                'name' => 'awaiting_fulfillment',
                'description' => 'Awaiting order fulfillment',
                'background' => '#e8f2fe',
                'foreground' => '#3498db'
            ],
            [
                'name' => 'awaiting_shipment',
                'description' => 'Awaiting shipment of the order',
                'background' => '#e6f7ff',
                'foreground' => '#1abc9c'
            ],
            [
                'name' => 'partially_shipped',
                'description' => 'Part of the order has been shipped',
                'background' => '#fdf5e6',
                'foreground' => '#d35400'
            ],
            [
                'name' => 'backordered',
                'description' => 'Items are backordered',
                'background' => '#fbe4e6',
                'foreground' => '#c0392b'
            ],
            [
                'name' => 'in_transit',
                'description' => 'Order is in transit',
                'background' => '#e8f4ff',
                'foreground' => '#2980b9'
            ],
            [
                'name' => 'delivery_attempted',
                'description' => 'Delivery attempt was made',
                'background' => '#fff7e6',
                'foreground' => '#e67e22'
            ],
            [
                'name' => 'ready_for_pickup',
                'description' => 'Order is ready for pickup',
                'background' => '#f5f5f5',
                'foreground' => '#2d3436'
            ],
            [
                'name' => 'partially_delivered',
                'description' => 'Some items have been delivered',
                'background' => '#fff3e0',
                'foreground' => '#e67e22'
            ],
            [
                'name' => 'awaiting_processing',
                'description' => 'Awaiting processing of the order',
                'background' => '#fffbf0',
                'foreground' => '#f1c40f'
            ]
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
