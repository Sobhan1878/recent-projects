<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;

Route::group(['prefix' => 'v1'], function () {
    Route::resource('category', CategoryController::class);
    
    Route::resource('subcategory', SubcategoryController::class);
    Route::get('subcategory/category_id/{id}', [SubcategoryController::class, 'getSubcategoriesWithSameCategory']);

    Route::resource('article', ArticleController::class);
    Route::post('article/uploadContentImages', [ArticleController::class, 'handleUploadContentImages']);
});
