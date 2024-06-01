<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "slug",
        "description",
        "price",
        "compare_price",
        "cost_per_item",
        "stock",
        "stock_unit",
        "out_of_stock_selling",
        "sku",
        "barcode",
        "category_id",
        "brand_id",
        "is_physical_product",
        "weight",
        "weight_unit",
        "length",
        "width",
        "height",
        "sizes",
        "colors",
        "status",
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->uuid = self::generateUID();
        });
    }

    private static function generateUID()
    {
        return (string) Str::uuid();
    }


    // public function setDescriptionAttribute($value)
    // {
    //     // Decode the JSON string into an associative array
    //     $requestData = json_decode($value, true);

    //     // Extract 'blocks' and 'entityMap' from the request data
    //     $blocks = $requestData['blocks'];
    //     $entityMap = isset($requestData['entityMap']) ? $requestData['entityMap'] : [];

    //     // Encode 'blocks' and 'entityMap' separately and store in database
    //     $this->attributes['description'] = json_encode(['blocks' => $blocks]);
    //     $this->attributes['entity_map'] = json_encode($entityMap);
    // }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            "sizes" => "array",
            "colors" => "array",
        ];
    }


    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the brand that owns the product.
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }


    /**
     * Get the reviews for the product.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the galleries for the product.
     */
    public function galleries()
    {
        return $this->morphMany(Gallery::class, 'imageable');
    }
}
