<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubcategoryCollection;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    
    public function index()
    {
        $subcategories = Subcategory::all();

        return response()->json(new SubcategoryCollection($subcategories), 200);
    }

    public function store(Request $request)
    {
        Subcategory::create([
            'en_title' => $request->en_title,
            'fa_title' => $request->fa_title,
            'slug' => $request->slug,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            'message' => 'created'
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

    public function getSubcategoriesWithSameCategory(int $id)
    {

        $subcategories = Subcategory::where('category_id', $id)->get();

        return response()->json(new SubcategoryCollection($subcategories), 200);
    }
}
