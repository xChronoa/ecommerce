<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/products", [ProductController::class, 'productlist']);

Route::prefix("cart")->group(function () {
    Route::get("/", [CartController::class, 'cartlist']);
    Route::get("/total", [CartController::class, 'calculateCartTotal']);
    Route::post("/add", [CartController::class, 'addProduct']);
    Route::delete("/remove/{id}", [CartController::class, 'removeProduct']);
    Route::delete("/checkout", [CartController::class, 'checkout']);
});
