<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductController extends Controller
{
    // Get all the available products from the database.
    public function productlist(Request $resut) {
        $product = new Products();
        $products = $product->all();

        return response()->json(['status' => 200, 'data' => $products]);
    }
}
