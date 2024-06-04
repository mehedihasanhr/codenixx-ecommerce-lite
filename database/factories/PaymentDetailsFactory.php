<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\PaymentDetails;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentDetail>
 */
class PaymentDetailsFactory extends Factory
{
    protected $model = PaymentDetails::class;

    public function definition()
    {
        return [
            'order_id' => Order::factory(),
            'payment_method' => $this->faker->randomElement(['credit_card', 'paypal', 'bank_transfer']),
            'transaction_id' => $this->faker->uuid,
            'amount' => $this->faker->randomFloat(2, 20, 500),
        ];
    }
}
