<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    
    public function index()
    {
        $categories = Category::all();

        return response()->json(new CategoryCollection($categories), 200);
    }

    public function store(Request $request)
    {
        Category::create([
            'en_title' => $request->en_title,
            'fa_title' => $request->fa_title,
            'slug' => $request->slug
        ]);

        return response()->json([
            'message' => 'created'
        ], 201);
    }

    public function show(string $id)
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
