<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = ["name", "slug", "description", "is_active"];

    // collection items
    public function items()
    {
        return $this->hasMany(CollectionItem::class, 'collection_id');
    }

    // collection image
    public function image()
    {
        return $this->morphOne(Gallery::class, "imageable");
    }

    // overrite the to array mathod
    public function toArray()
    {
        $array = parent::toArray();
        if ($this->items) {
            $array['items'] = $this->items->map(function ($item) {
                return $item->formatted();
            });
        }
        if ($this->image) {
            $array["image"] = $this->image->image_url;
        }
        return $array;
    }
}
