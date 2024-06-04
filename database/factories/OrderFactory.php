<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'status_id' => 1,
            'total' => $this->faker->randomFloat(2, 20, 500),
            'shipping_address' => $this->faker->address,
            'billing_address' => $this->faker->address,
        ];
    }
}
