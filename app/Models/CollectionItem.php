<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionItem extends Model
{
    use HasFactory;

    protected $fillable = ["collection_id", "itemable_type", "itemable_id"];

    public function itemable()
    {
        return $this->morphTo();
    }

    // formate
    public function formatted()
    {
        $itemableDetails = [];

        // Format itemable details based on the type
        if ($this->itemable_type == 'App\Models\Product') {
            $itemableDetails = [
                'product_id' => $this->itemable->id,
                'product_name' => $this->itemable->name,
                'product_description' => $this->itemable->description,
                'product_images' => $this->itemable->galleries,
                // Add other Product specific fields here
            ];
        }

        return [
            'id' => $this->id,
            'collection_id' => $this->collection_id,
            'itemable_type' => $this->itemable_type,
            'itemable_id' => $this->itemable_id,
            'itemable' => $itemableDetails,
        ];
    }
}
