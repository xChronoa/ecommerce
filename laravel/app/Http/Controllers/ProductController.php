<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class ProductController extends Controller
{
    // Get all the available products from the database.
    public function view()
    {
        $product = new Products();
        $products = $product->all();

        return response()->json(['status' => 200, 'data' => $products]);
    }

    // Adds product to the cart.
    public function add(Request $request)
    {
        // Define validation rules
        $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ];

        // Validate the incoming request data
        $validator = Validator::make($request->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            // Attempt to find the product in the cart
            $existingProduct = Products::where('name', $request->name)
                                        ->where('description', $request->description)
                                        ->where('price', $request->price)
                                        ->first();

            // If the product exists, update its quantity
            if ($existingProduct) {
                return response()->json(['status' => 409, 'message' => 'Product already exists'], 409);
            } else {
                // If the product doesn't exist, create a new entry
                $product = new Products();
                $product->name = $request->name;
                $product->description = $request->description;
                $product->price = $request->price;
                $product->save();
                return response()->json(['status' => 201, 'message' => 'Successfully created product'], 201);
            }
        } catch (QueryException $e) {
            // Check if the error is a duplicate entry error
            // 23000 is the SQLSTATE code for integrity constraint violation
            if ($e->getCode() == 23000) {
                return response()->json(['status' => 409, 'message' => 'Product already exists'], 409);
            }

            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ]);

        try {
            // Find the product by ID
            $product = Products::findOrFail($id);

            // Check if there's another product with the same name, description, and price
            $existingProduct = Products::where('name', $validatedData['name'])
                                        ->where('description', $validatedData['description'])
                                        ->where('price', $validatedData['price'])
                                        ->where('id', '!=', $id) // Exclude the current product from the check
                                        ->first();

            if ($existingProduct) {
                return response()->json(['status' => 409, 
                'message' => 'Product with this name, description, and price already exists'], 409);
            }

            // Update the product with validated data
            $product->update($validatedData);
            
            return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        } catch (QueryException $e) {
            // Check if the error is a duplicate entry error
            if ($e->getCode() == 23000) { // 23000 is the SQLSTATE code for integrity constraint violation
                return response()->json(['status' => 409, 'message' => 'Product already exists'], 409);
            }

            // Return a generic error message
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    // Removes product from the cart.
    public function delete($id)
    {
        // Fetch the product from the database
        $product = Products::find($id);

        if (!$product) {
            // Product not found, return appropriate response (e.g., 404 Not Found)
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the product
        $product->delete();

        // Return a success response
        return response()->json(['message' => 'Product removed successfully']);
    }
}
