<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $brands = [
            'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'Converse', 'Vans', 'New Balance',
            'ASICS', 'Fila', 'Skechers', 'Lacoste', 'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren',
            'Levi\'s', 'Gap', 'H&M', 'Zara', 'Forever 21', 'Uniqlo', 'American Eagle', 'Abercrombie & Fitch',
            'Hollister', 'Victoria\'s Secret', 'Guess', 'Michael Kors', 'Coach', 'Burberry', 'Louis Vuitton'
            // Add more brands as needed
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                'name' => $brand,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
