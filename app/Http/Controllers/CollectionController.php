<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Gallery;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CollectionController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $count = $request->query('count', 10);
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');

        $collections = Collection::with(['items.itemable', 'image'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);

        return Inertia::render('SuperAdmin/Collections', [
            "collections" => $collections,
            "page" => $page,
            "search" => $search,
            "count" => $count,
            "order" => $order,
            "sort" => $sort,
        ]);
    }

    // show the form for creating a new collection
    public function create()
    {
        return Inertia::render('SuperAdmin/CollectionCreate');
    }

    // store collection data
    public function store(Request $request)
    {
        // verify requested data
        $request->validate([
            "name" => "required",
            "description" => "string|nullable",
        ]);

        // Generate a unique slug
        $slug = Str::slug($request->input('name'));
        $originalSlug = $slug;
        $counter = 1;

        while (Collection::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter++;
        }

        $collection = Collection::create([
            "name" => $request->input('name'),
            "slug" => $slug,
            "description" => $request->input('description'),
            "is_active" => false,
        ]);

        return redirect()->intended(route("collection.view", [
            "collection_id" => $collection->id,
            "slug" => $collection->slug,
            "NewlyCreated" => true,
        ], absolute: true));
    }

    // show collection
    public function show($collection_id)
    {
        // find collection
        $collection = Collection::with(["items.itemable", "image"])->find($collection_id);


        return Inertia::render("SuperAdmin/Collection", [
            "collection" => $collection,
        ]);
    }

    // update collection items
    public function updateItem(Request $request, $collection_id)
    {
        $action = $request->input("action");

        $item_id = $request->input("item_id");
        $item_type = Product::class;

        $collection = Collection::with(["items.itemable"])->find($collection_id);

        // remove existing collection
        if ($action == 'remove') {
            $collection->items()->where('itemable_id', $item_id)->delete();
        } else {
            // add new collection
            $collection->items()->create([
                "collection_id" => $collection_id,
                "itemable_id" => $item_id,
                "itemable_type" => $item_type,
            ]);
        }


        // Refresh collection items to get the updated list
        $collection->load('items.itemable');

        $formattedItems = $collection->items->map(function ($item) {
            return $item->formatted();
        });


        return response()->json([
            "items" => $formattedItems,
            "message" => $action == 'remove' ? "Item removed successfully." : "Item added successfully."
        ], 201);
    }


    // update collection
    public function update(Request $request, $collection_id)
    {

        $name = $request->input('name');
        $description = $request->input('description');


        $collection = Collection::findOrFail($collection_id);
        // update file
        $collection->name = $name;
        $collection->description = $description;

        // upload image
        if ($request->hasFile("image")) {
            // validate the uploaded file
            $request->validate([
                "image" => "image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            ]);

            // Delete the old image if exist
            if ($collection->image) {
                Storage::delete($collection->image->image_url);
                $collection->image->delete();
            }

            // store the new image
            $imagePath = $request->file("image")->store("public/gallery/collections");

            // Create a new gallery record for this image
            $gallery = new Gallery();
            $gallery->image_url = Storage::url($imagePath);
            $collection->image()->save($gallery);
        }

        $collection->save();


        return redirect()->intended(route("collection.view", [
            "collection_id" => $collection->id,
            "slug" => $collection->slug,
        ]));
    }


    // destroy collection
    public function destroy($collection_id)
    {
        $collection = Collection::findOrFail($collection_id);

        // Delete collection items
        foreach ($collection->items as $item) {
            $item->delete();
        };

        // Delete associated image
        if ($collection->image) {
            Storage::delete($collection->image->image_url);
            $collection->image->delete();
        };

        // Delete the collection
        $collection->delete();

        // return redirect()->intended(route("collections"));
        return redirect()->route("collections")->with('success', "Collection deleted successfully.");
    }
}
