<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\UserController;

Route::group(['prefix' => 'v1'], function () {
    Route::resource('category', CategoryController::class);
    
    Route::resource('subcategory', SubcategoryController::class);
    Route::get('subcategory/category_id/{id}', [SubcategoryController::class, 'getSubcategoriesWithSameCategory']);

    Route::resource('article', ArticleController::class);
    Route::get('getHeadingArticles', [ArticleController::class, 'getHeadingArticles']);
    Route::get('getMostViewArticles', [ArticleController::class, 'getMostViewArticles']);
    Route::get('getSimilarArticles/{slug}', [ArticleController::class, 'getSimilarArticles']);
    Route::post('article/uploadContentImages', [ArticleController::class, 'handleUploadContentImages']);

    Route::resource('user', UserController::class);
    Route::post('user/login', [UserController::class, 'login']);
    Route::get('user_logout', [UserController::class, 'logout']);
});
