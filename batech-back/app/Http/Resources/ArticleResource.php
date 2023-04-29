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
            'category' => $this->category->fa_title,
            'subcategory' => $this->subcategory->fa_title,
            'create_time' => $this->created_at
        ];
    }
}
