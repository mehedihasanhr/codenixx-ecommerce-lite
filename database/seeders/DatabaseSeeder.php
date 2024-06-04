<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'MD Mehedi Hasan Hridoy',
            'email' => 'mehedihasan.hr.324@gmail.com',
            'role' => 'ADMIN',
            'password' => 'password',
        ]);

        $this->call([
            CategoriesTableSeeder::class,
            BrandsTableSeeder::class,
            ProductsTableSeeder::class
        ]);

         // Create other users and their related data
        User::factory(10)->create()->each(function ($user) {
            \App\Models\Order::factory(3)->create(['user_id' => $user->id])->each(function ($order) {
                \App\Models\OrderItem::factory(5)->create(['order_id' => $order->id]);
                \App\Models\PaymentDetails::factory()->create(['order_id' => $order->id]);
            });
        });
    }
}
