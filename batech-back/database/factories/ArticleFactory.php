<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Ybazli\Faker\Facades\Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => Faker::sentence(),
            'subtitle' => Faker::sentence(),
            'content' => Faker::paragraph(),
            'cover' => fake()->imageUrl(1920, 1280),
            'slug' => fake()->slug(),
            'category_id' => 1,
            'subcategory_id' => 1
        ];
    }
}
