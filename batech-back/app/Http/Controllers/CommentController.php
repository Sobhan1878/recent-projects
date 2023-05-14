<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentCollection;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getArticleComments($id)
    {
        $comments = Article::findOrFail($id)->comments()->get();

        return response()->json(new CommentCollection($comments), 200);
    }
    
    public function store(Request $request)
    {
        Comment::create([
            'comment' => $request->comment,
            'article_id' => $request->article_id,
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'message' => 'نظر شما با موفقیت ثبت شد.',
            'status' => 201
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
