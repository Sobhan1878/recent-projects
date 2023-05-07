<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'content' => $this->content,
            'thumbnail' => $this->cover,
            'fa_category' => $this->category->fa_title,
            'en_category' => $this->category->en_title,
            'subcategory' => $this->subcategory->fa_title,
            'category_id' => $this->category_id,
            'subcategory_id' => $this->subcategory_id,
            'head_news' => $this->head_news,
            'slug' => $this->slug,
            'create_time' => $this->created_at,
            'views' => $this->view
        ];
    }
}
