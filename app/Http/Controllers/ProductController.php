<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $sortField = $request->query('sort', 'id');
        $sortOrder = $request->query('order', 'desc');
        $parPageItem = $request->query('ppi', 10);
        $page = $request->query('page', 1);
        $filter = $request->query('filter', '');
        $brand = $request->query('brand', '');
        $category = $request->query('category', '');


        $products = Product::with('category', 'brand', 'reviews', 'galleries')
            ->orderBy($sortField, $sortOrder)
            ->where(function ($query) use ($filter, $brand, $category) {
                // brand filter
                if ($brand) {
                    $query->where('brand_id', $brand);
                }

                // category filter
                if ($category) {
                    $query->where('category_id', $category);
                }

                // status filter
                if ($filter === 'published') {
                    $query->where('status', "published");
                } elseif ($filter === 'published') {
                    $query->where('status', "published");
                } elseif ($filter === 'drafted') {
                    $query->where('status', "drafted");
                } elseif ($filter === 'trashed') {
                    $query->where('status', "trashed");
                } else {
                    $query->where('status', '!=', "trashed");
                }
            })
            ->paginate($parPageItem, ['*'], 'page', $page);

        // total product
        $total_products = Product::all()->count();
        $published = Product::where('status', 'published')->count();
        $draft = Product::where('status', 'drafted')->count();
        $trash = Product::where('status', 'trashed')->count();


        // all categories
        $categories = Category::all();
        $brands = Brand::all();
        // all brands


        return Inertia::render(
            "SuperAdmin/Products",
            [
                "products" => $products,
                'categories' => $categories,
                'brands' => $brands,
                'sortField' => $sortField,
                'sortOrder' => $sortOrder,
                'currentPage' => $page,
                'totalProducts' => $total_products,
                'published' => $published,
                'drafted' => $draft,
                'trashed' => $trash,
                'filter' => $filter,
                "brand" => $brand,
                'category' => $category
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $brands = Brand::all();
        return Inertia::render("SuperAdmin/ProductCreate", [
            "categories" => $categories,
            "brands" => $brands
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $product = Product::create([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')),
            'description' => $request->input('description'),
            // price section
            'price' => $request->input('price'),
            'compare_price' => $request->input('compare_price'),
            'cost_per_item' => $request->input('cost_per_item'),

            // inventory
            'stock' => $request->input('stock'),
            'stock_unit' => $request->input('stock_unit'),
            'out_of_stock_selling' => $request->input('out_of_stock_selling'),
            'sku' => $request->input('sku'),
            'barcode' => $request->input('barcode'),

            // organization
            'category_id' => $request->input('category'),
            'brand_id' => $request->input('brand'),

            // shipping details
            'is_physical_product' => $request->input('is_physical_product'),
            'weight' => $request->input('product_weight'),
            'length' => $request->input('product_length'),
            'width' => $request->input('product_width'),
            'height' => $request->input('product_height'),

            // is active
            'status' => $request->input('status', true),

            // variants
            'sizes' => $request->input('sizes'),
            'colors' => $request->input('colors')
        ]);


        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');

            foreach ($uploadedFiles as $file) {
                // Store the file in the storage
                $path = $file->store('public/gallery');
                // Get the URL of the stored file
                $url = Storage::url($path);

                // Save each file URL in the database
                $gallery = new Gallery();
                $gallery->image_url = $url;
                $gallery->imageable_id = $product->id;
                $gallery->imageable_type = get_class($product);
                $gallery->save();
            }
        }
        return redirect()->intended(route('product.create', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, $product_id)
    {
        $data = $product->with(["galleries"])->find($product_id);
        $categories = Category::all();
        $brands = Brand::all();

        return Inertia::render("SuperAdmin/ProductView", [
            "product" => $data,
            "categories" => $categories,
            "brands" => $brands
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, $product_id)
    {
        $data = $product->with(['galleries'])->find($product_id);
        $categories = Category::all();
        $brands = Brand::all();



        return Inertia::render("SuperAdmin/ProductEdit", [
            "product" => $data,
            "categories" => $categories,
            "brands" => $brands
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, $product_id)
    {
        // Find the product data
        $data = $product->findOrFail($product_id);



        // Check if files are present in the request
        if ($request->hasFile('files')) {
            // Get the uploaded files
            $uploadedFiles = $request->file('files');

            // Loop through each uploaded file
            foreach ($uploadedFiles as $file) {
                // Store the file in the storage
                $path = $file->store('public/gallery');

                // Get the URL of the stored file
                $url = Storage::url($path);

                // Save each file URL in the database
                $gallery = new Gallery();
                $gallery->image_url = $url;
                $gallery->imageable_id = $product_id;
                $gallery->imageable_type = get_class($product);
                $gallery->save();
            }
        }

        // Update product data with request data
        $data->update($request->except(['files', 'galleries']));


        // Redirect to the product view page
        return redirect()->intended(route('product.view', ["product_id" => $data->id], false));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function trash($product_id)
    {
        // Find the product by id
        $product = Product::findOrFail($product_id);

        // Delete the product
        $product->status = 'trashed';
        $product->save();

        // Redirect to the product listing page
        return redirect()->route('adminpanel.products')->with('success', 'Product trashed successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product_id)
    {
        // Find the product by id
        $product = Product::findOrFail($product_id);

        // Delete the product
        $product->delete();

        // Redirect to the product listing page
        return redirect()->route('adminpanel.products')->with('success', 'Product deleted successfully.');
    }


    // json
    public function productList(Request $request)
    {
        $page = $request->query('page', 1);
        $count = $request->query('count', 2);
        $search = $request->query('search', '');

        $products = Product::with(['galleries'])
            ->where(function ($q) use ($search) {
                if ($search) {
                    $q->where('name', 'LIKE', '%' . $search . '%');
                }
            })
            ->select(['id', 'name', 'slug'])
            ->paginate($count, ['*'], 'page', $page);

        return response()->json($products, 200);
    }
}
