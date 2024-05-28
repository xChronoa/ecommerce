<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Routes for Users
Route::prefix("/user")->group(function () {
    Route::get("/", [UserController::class, 'view']);
    Route::post("/add", [UserController::class, 'add']);
    Route::put("/update/{id}", [UserController::class, 'update']);
    Route::delete("/remove/{id}", [UserController::class, 'delete']);
});

// Routes for Products
Route::prefix("/products")->group(function () {
    Route::get("/", [ProductController::class, 'view']);
    Route::post("/add", [ProductController::class, 'add']);
    Route::put("/update/{id}", [ProductController::class, 'update']);
    Route::delete("/remove/{id}", [ProductController::class, 'delete']);
});

// Routes for Cart
Route::prefix("cart")->group(function () {
    Route::get("/", [CartController::class, 'view']);
    Route::get("/total", [CartController::class, 'calculateCartTotal']);
    Route::post("/add", [CartController::class, 'addToCart']);
    Route::delete("/remove/{id}", [CartController::class, 'remove']);
    Route::delete("/checkout", [CartController::class, 'checkout']);
});
