<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    // Returns data of cart table.
    public function view(Request $request)
    {
        $cart = new Cart();
        $cart_content = $cart->all();

        return response()->json(['status' => 200, 'data' => $cart_content]);
    }

    // Adds product to the cart.
    public function addToCart(Request $request)
    {
        // Define validation rules
        $rules = [
            'name' => 'required|string|max:191',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
        ];

        // Validate the incoming request data
        $validator = Validator::make($request->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        // Attempt to find the product in the cart
        $existingProduct = Cart::where('name', $request->name)
                                ->where('description', $request->description)
                                ->where('price', $request->price)
                                ->first();
                                
        // If the product exists, update its quantity
        if ($existingProduct) {
            $existingProduct->quantity += $request->quantity;
            $existingProduct->save();
            return response()->json(['status' => 200, 'message' => 'Product quantity updated'], 200);
        } else {
            // If the product doesn't exist, create a new entry
            $cart = new Cart();
            $cart->name = $request->name;
            $cart->description = $request->description;
            $cart->price = $request->price;
            $cart->quantity = $request->quantity;
            $cart->save();
            return response()->json(['status' => 201, 'message' => 'Successfully added Product to Cart'], 201);
        }
    }

    // Removes product from the cart.
    public function remove($id)
    {
        // Fetch the product from the database
        $product = Cart::find($id);

        if (!$product) {
            // Product not found, return appropriate response (e.g., 404 Not Found)
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the product
        $product->delete();

        // Return a success response
        return response()->json(['message' => 'Product removed successfully']);
    }

    // Return total price and quantity of the cart.
    public function calculateCartTotal()
    {
        // Retrieve the cart items from the database
        $cartItems = Cart::all(); // Assuming Cart is the model for your cart items

        // Initialize variables to hold total price and total quantity
        $totalPrice = 0;
        $totalQuantity = 0;

        // Calculate total price and total quantity
        foreach ($cartItems as $item) {
            $totalPrice += $item->price * $item->quantity;
            $totalQuantity += $item->quantity;
        }

        // Return the total price and total quantity as JSON response
        return response()->json([
            'totalPrice' => $totalPrice,
            'totalQuantity' => $totalQuantity
        ]);
    }

    // Checkout functionality.
    public function checkout() {
        
        $checkout = Cart::truncate(); 
        
        // Check if checkout was successful
        if ($checkout) {
            return response()->json(['message' => 'Successful checkout'], 200);
        } else {
            return response()->json(['message' => 'Failed to checkout'], 500);
        }
    }
}
