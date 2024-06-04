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
        Schema::create('products', function (Blueprint $table) {
            $table->id()->startingValue(11111);
            $table->string('uuid')->uniqid();
            $table->string('name');
            $table->string('slug')->uniqid();
            $table->longText('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->decimal('compare_price', 8, 2)->nullable();
            $table->decimal('cost_per_item', 8, 2)->nullable();

            // inventory
            $table->unsignedInteger('stock');
            $table->string('stock_unit');
            $table->boolean('out_of_stock_selling')->default(false);
            $table->string('sku')->unique()->nullable();
            $table->string('barcode')->unique()->nullable();

            // organization
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();

            // shipping details
            $table->boolean('is_physical_product')->default(false);
            $table->decimal('weight', 8, 2)->nullable();
            $table->string('weight_unit')->nullable();
            $table->decimal('length', 8, 2)->nullable();
            $table->decimal('width', 8, 2)->nullable();
            $table->decimal('height', 8, 2)->nullable();

            // variants
            $table->json('sizes')->nullable();
            $table->json('colors')->nullable();

            // active status
            $table->string('status')->default('drafted');

            // trash
            $table->boolean('trash')->default(false);

            // time stamp
            $table->timestamps();

            // Foreign keys and indexes
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            $table->index('name');
            $table->index('price');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
