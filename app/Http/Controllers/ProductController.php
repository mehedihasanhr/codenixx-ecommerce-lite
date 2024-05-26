<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        return Inertia::render(
            "SuperAdmin/Products",
            ["products"=> $products ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       $categories = Category::all();
       $brands = Brand::all();
       return Inertia::render("SuperAdmin/ProductCreate", ["categories" => $categories,  "brands" => $brands]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'sku' => $request->input('sku'),
            'category_id' => $request->input('category_id'),
            'brand' => $request->input('brand'),
            'is_active' => $request->input('is_active', true),
            'weight' => $request->input('weight'),
            'length' => $request->input('length'),
            'width' => $request->input('width'),
            'height' => $request->input('height'),
        ]);

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('images', 'public');
            $product->images()->create(['image_url' => $imagePath]);
        }

        return response()->json(['product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
