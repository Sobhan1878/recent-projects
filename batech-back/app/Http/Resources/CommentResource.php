<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->unique_id,
            'body' => $this->comment,
            'author' => $this->user->name,
            'comment_id' => $this->comment_id,
            'type' => $this->type,
            'answers' => self::collection($this->comments),
            'create_time' => $this->created_at,
        ];
    }
}
