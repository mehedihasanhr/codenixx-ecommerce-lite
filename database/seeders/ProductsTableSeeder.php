<?php

namespace Database\Seeders;

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
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->sentence,
                'price' => $faker->randomFloat(2, 10, 1000),
                'stock' => $faker->numberBetween(1, 100),
                'sku' => Str::upper(Str::random(10)),
                'category_id' => $faker->numberBetween(1, 10), // Adjust based on existing categories
                'brand' => $faker->company,
                'is_active' => $faker->boolean,
                'weight' => $faker->randomFloat(2, 0.1, 10),
                'length' => $faker->randomFloat(2, 1, 100),
                'width' => $faker->randomFloat(2, 1, 100),
                'height' => $faker->randomFloat(2, 1, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
