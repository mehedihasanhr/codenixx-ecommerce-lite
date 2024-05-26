<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class GalleriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create a new Faker instance
        $faker = Faker::create();

        // Get all product IDs
        $productIds = DB::table('products')->pluck('id');

        // Seed galleries data
        foreach ($productIds as $productId) {
            // Each product will have between 1 and 5 images
            $numberOfImages = rand(1, 5);

            for ($i = 0; $i < $numberOfImages; $i++) {
                DB::table('galleries')->insert([
                    'image_url' => $faker->imageUrl(640, 480, 'products', true),
                    'imageable_id' => $productId,
                    'imageable_type' => 'App\\Models\\Product',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
