<?php

namespace App\Models;

use App\Models\Subcategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    protected $fillable = [
        'en_title', 'fa_title', 'slug'
    ];
    
    use HasFactory;

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
