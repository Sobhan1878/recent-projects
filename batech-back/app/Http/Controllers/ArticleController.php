<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleCollection;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::paginate(10)->sortBydesc('created_at');

        return response()->json(new ArticleCollection($articles), 200);
    }

    public function getHeadingArticles()
    {
        $articles = Article::where('head_news', 1)->get();

        return response()->json(new ArticleCollection($articles), 200);
    }

    public function getMostViewArticles()
    {
        $articles = Article::orderBy('view', 'desc')->paginate(5);

        return response()->json(new ArticleCollection($articles), 200);
    }

    public function getSimilarArticles($slug)
    {
        $article = Article::where('slug', $slug)->first();

        $articles = Article::where('category_id', $article->category_id)->where('subcategory_id', $article->subcategory_id)->paginate(5);

        return response()->json(new ArticleCollection($articles), 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $cover = $this->handleBase64String($request->thumbnail);

        Article::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'content' => $request->content,
            'cover' => $cover,
            'slug' => $request->slug,
            'head_news' => $request->head_news,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id
        ]);

        return response()->json([
            'message' => 'created'
        ], 201);

    }
    
    private function handleBase64String(array $thubnail)
    {
        $file = explode(',', $thubnail['base64']);
        $base64file = $file[1];
        $mimetype = $this->getType($thubnail['type']);

        $url = md5(time() . $thubnail['name']) . $mimetype;

        Storage::disk('public')->put('covers/' . $url , base64_decode($base64file));

        return $url;
    }

    private function getType(string $mimetype)
    {
        return [
            'image/jpeg' => '.jpg',
            'image/png' => '.png',
            'image/webp' => '.webp',
        ][$mimetype];
    }

    public function handleUploadContentImages(Request $request)
    {
        return Storage::disk('public')->put('contents/', $request->file('file'));
    }

    public function show(string $slug)
    {
        $article = Article::where('slug', $slug)->first();

        return response()->json([
            'data' => new ArticleResource($article)
        ], 200);
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
