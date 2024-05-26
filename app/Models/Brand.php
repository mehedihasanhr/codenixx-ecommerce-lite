<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    /**
     * Get all of the brand's images.
     */
    public function images()
    {
        return $this->morphMany(ImageGallery::class, 'imageable');
    }
}
