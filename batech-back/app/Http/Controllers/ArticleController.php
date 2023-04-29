<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleCollection;
use App\Models\Article;
use app\services\StorageManager;
use app\services\Uploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::paginate(10)->sortBydesc('created_at');

        return response()->json(new ArticleCollection($articles), 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $cover = $this->handleBase64String($request->thumbnail);

        if($request->head_news == null || !count($request->head_news) > 0)
        {
            $head_news = '0';
        } else {
            $head_news = '1';
        }

        Article::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'content' => $request->content,
            'cover' => $cover,
            'head_news' => $head_news,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id
        ]);

        return response()->json([
            'message' => 'created'
        ], 201);

    }
    
    private function handleBase64String(string $base64file)
    {
        $file = explode(',', $base64file)[1];

        $name = md5(time() . 'batech_blog') . '.png';

        Storage::disk('public')->put('covers/' . $name , base64_decode($file));

        return $name;
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
