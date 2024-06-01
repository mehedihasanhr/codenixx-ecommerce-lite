<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'image_url' => 'nullable|string',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Check if files are uploaded
        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');
            $imageUrls = [];

            foreach ($uploadedFiles as $file) {
                // Store the file in the storage
                $path = $file->store('public/gallery');
                // Get the URL of the stored file
                $url = Storage::url($path);
                $imageUrls[] = $url;

                // Save each file URL in the database
                $gallery = new Gallery();
                $gallery->image_url = $url;
                $gallery->save();
            }

            return response()->json($imageUrls, 201);
        }

        // If no files are uploaded, check for image URL
        if ($request->image_url) {
            $gallery = new Gallery();
            $gallery->image_url = $request->image_url;
            $gallery->imageable_id =
            $gallery->imageable_type = get_class($gallery);
            $gallery->save();

            return response()->json($gallery, 201);
        }

        return response()->json(['error' => 'No image provided'], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery, $gallery_id)
    {
        // Find the product by id
        $data = $gallery->findOrFail($gallery_id);

        // Delete the product
        $data->delete();

        // Redirect to the product listing page
         return redirect()->intended(route('product.edit', absolute: false));
    }
}
