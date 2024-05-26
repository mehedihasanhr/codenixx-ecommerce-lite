<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Main categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'All electronic items', 'slug' => Str::slug('Electronics')],
            ['name' => 'Fashion', 'description' => 'Clothing and accessories', 'slug' => Str::slug('Fashion')],
            ['name' => 'Home & Garden', 'description' => 'Furniture and home decor', 'slug' => Str::slug('Home & Garden')],
            ['name' => 'Sports & Outdoors', 'description' => 'Sporting goods and outdoor equipment', 'slug' => Str::slug('Sports & Outdoors')],
            ['name' => 'Beauty & Health', 'description' => 'Beauty products and health items', 'slug' => Str::slug('Beauty & Health')],
            ['name' => 'Toys & Hobbies', 'description' => 'Toys and hobbies', 'slug' => Str::slug('Toys & Hobbies')],
            ['name' => 'Automotive', 'description' => 'Vehicle parts and accessories', 'slug' => Str::slug('Automotive')],
        ];

        foreach ($categories as $category) {
            $categoryId = DB::table('categories')->insertGetId($category);

            // Subcategories
            $subcategories = [];
            switch ($category['name']) {
                case 'Electronics':
                    $subcategories = [
                        ['name' => 'Mobile Phones', 'description' => 'Smartphones and accessories', 'slug' => Str::slug('Mobile Phones'), 'parent_id' => $categoryId],
                        ['name' => 'Laptops', 'description' => 'Laptops and notebooks', 'slug' => Str::slug('Laptops'), 'parent_id' => $categoryId],
                        ['name' => 'Cameras', 'description' => 'Digital cameras and accessories', 'slug' => Str::slug('Cameras'), 'parent_id' => $categoryId],
                        ['name' => 'Televisions', 'description' => 'LED, LCD, and Smart TVs', 'slug' => Str::slug('Televisions'), 'parent_id' => $categoryId],
                        ['name' => 'Audio Equipment', 'description' => 'Headphones, speakers, and audio devices', 'slug' => Str::slug('Audio Equipment'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Fashion':
                    $subcategories = [
                        ['name' => 'Men\'s Clothing', 'description' => 'Clothing for men', 'slug' => Str::slug('Men\'s Clothing'), 'parent_id' => $categoryId],
                        ['name' => 'Women\'s Clothing', 'description' => 'Clothing for women', 'slug' => Str::slug('Women\'s Clothing'), 'parent_id' => $categoryId],
                        ['name' => 'Kids\' Clothing', 'description' => 'Clothing for kids', 'slug' => Str::slug('Kids\' Clothing'), 'parent_id' => $categoryId],
                        ['name' => 'Shoes', 'description' => 'Footwear for all', 'slug' => Str::slug('Shoes'), 'parent_id' => $categoryId],
                        ['name' => 'Accessories', 'description' => 'Fashion accessories', 'slug' => Str::slug('Accessories'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Home & Garden':
                    $subcategories = [
                        ['name' => 'Furniture', 'description' => 'Home and office furniture', 'slug' => Str::slug('Furniture'), 'parent_id' => $categoryId],
                        ['name' => 'Home Decor', 'description' => 'Decorative items for home', 'slug' => Str::slug('Home Decor'), 'parent_id' => $categoryId],
                        ['name' => 'Kitchen Appliances', 'description' => 'Appliances for the kitchen', 'slug' => Str::slug('Kitchen Appliances'), 'parent_id' => $categoryId],
                        ['name' => 'Gardening', 'description' => 'Gardening tools and plants', 'slug' => Str::slug('Gardening'), 'parent_id' => $categoryId],
                        ['name' => 'Lighting', 'description' => 'Indoor and outdoor lighting', 'slug' => Str::slug('Lighting'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Sports & Outdoors':
                    $subcategories = [
                        ['name' => 'Exercise & Fitness', 'description' => 'Fitness equipment and accessories', 'slug' => Str::slug('Exercise & Fitness'), 'parent_id' => $categoryId],
                        ['name' => 'Outdoor Recreation', 'description' => 'Gear for outdoor activities', 'slug' => Str::slug('Outdoor Recreation'), 'parent_id' => $categoryId],
                        ['name' => 'Team Sports', 'description' => 'Equipment for team sports', 'slug' => Str::slug('Team Sports'), 'parent_id' => $categoryId],
                        ['name' => 'Individual Sports', 'description' => 'Gear for individual sports', 'slug' => Str::slug('Individual Sports'), 'parent_id' => $categoryId],
                        ['name' => 'Cycling', 'description' => 'Bikes and cycling accessories', 'slug' => Str::slug('Cycling'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Beauty & Health':
                    $subcategories = [
                        ['name' => 'Skincare', 'description' => 'Skincare products', 'slug' => Str::slug('Skincare'), 'parent_id' => $categoryId],
                        ['name' => 'Makeup', 'description' => 'Makeup products and tools', 'slug' => Str::slug('Makeup'), 'parent_id' => $categoryId],
                        ['name' => 'Hair Care', 'description' => 'Products for hair care', 'slug' => Str::slug('Hair Care'), 'parent_id' => $categoryId],
                        ['name' => 'Health & Wellness', 'description' => 'Health and wellness products', 'slug' => Str::slug('Health & Wellness'), 'parent_id' => $categoryId],
                        ['name' => 'Personal Care', 'description' => 'Personal care items', 'slug' => Str::slug('Personal Care'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Toys & Hobbies':
                    $subcategories = [
                        ['name' => 'Action Figures', 'description' => 'Action figures and collectibles', 'slug' => Str::slug('Action Figures'), 'parent_id' => $categoryId],
                        ['name' => 'Puzzles', 'description' => 'Puzzles and brain teasers', 'slug' => Str::slug('Puzzles'), 'parent_id' => $categoryId],
                        ['name' => 'Board Games', 'description' => 'Board games for all ages', 'slug' => Str::slug('Board Games'), 'parent_id' => $categoryId],
                        ['name' => 'Outdoor Toys', 'description' => 'Toys for outdoor play', 'slug' => Str::slug('Outdoor Toys'), 'parent_id' => $categoryId],
                        ['name' => 'Educational Toys', 'description' => 'Toys for learning and development', 'slug' => Str::slug('Educational Toys'), 'parent_id' => $categoryId],
                    ];
                    break;
                case 'Automotive':
                    $subcategories = [
                        ['name' => 'Car Accessories', 'description' => 'Accessories for cars', 'slug' => Str::slug('Car Accessories'), 'parent_id' => $categoryId],
                        ['name' => 'Motorcycle Parts', 'description' => 'Parts for motorcycles', 'slug' => Str::slug('Motorcycle Parts'), 'parent_id' => $categoryId],
                        ['name' => 'Car Electronics', 'description' => 'Electronic devices for cars', 'slug' => Str::slug('Car Electronics'), 'parent_id' => $categoryId],
                        ['name' => 'Tires & Wheels', 'description' => 'Tires and wheels for vehicles', 'slug' => Str::slug('Tires & Wheels'), 'parent_id' => $categoryId],
                        ['name' => 'Tools & Equipment', 'description' => 'Tools and equipment for vehicle maintenance', 'slug' => Str::slug('Tools & Equipment'), 'parent_id' => $categoryId],
                    ];
                    break;
            }

            if (!empty($subcategories)) {
                DB::table('categories')->insert($subcategories);
            }
        }
    }
}
