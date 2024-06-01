<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create a new Faker instance
        $faker = Faker::create();

        // Define the number of products to create
        $numberOfProducts = 100;

        // Seed products data
        for ($i = 0; $i < $numberOfProducts; $i++) {
            Product::create([
                'name' => $faker->word,
                'slug' => Str::slug($faker->word),
                'description' => "<h1>Product description</h1>",
                // pricing
                'price' => $faker->randomFloat(2, 10, 1000),
                'compare_price' => $faker->randomFloat(2, 10, 1000),
                'cost_per_item' => $faker->randomFloat(2, 10, 1000),
                // inventory
                'stock' => $faker->numberBetween(1, 100),
                'stock_unit' => 'pice',
                'sku' => Str::upper(Str::random(10)),
                'barcode' => Str::upper(Str::random(10)),
                // organization
                'category_id' => $faker->numberBetween(1, 10), // Adjust based on existing categories
                'brand_id' => $faker->numberBetween(1, 10),
                // active status
                'status' => 'published',

                // shipping
                'is_physical_product' => $faker->boolean,
                'weight' => $faker->randomFloat(2, 0.1, 10),
                'length' => $faker->randomFloat(2, 1, 100),
                'width' => $faker->randomFloat(2, 1, 100),
                'height' => $faker->randomFloat(2, 1, 100),

                // variant
                'sizes' => ["sm", "md", 'lg'],
                'colors' => ["red", "green", "blue"],
                'trash' => $faker->boolean,

                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
