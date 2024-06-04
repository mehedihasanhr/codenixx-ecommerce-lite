<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'status_id',
        'total',
        'shipping_address',
        'billing_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function paymentDetails()
    {
        return $this->hasOne(PaymentDetails::class);
    }
}
