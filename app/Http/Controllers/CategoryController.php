<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with(['parent'])->orderBy('id', 'desc')->get();
        return Inertia::render('SuperAdmin/Categories', [
            "categories" => $categories,
        ]);
    }


    public function create(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'parent_id.exists' => 'The selected parent category is invalid.',
            'description.string' => 'The description must be a string.',
            'description.max' => 'The description may not be greater than 1000 characters.',
        ]);

        // Generate a unique slug
        $slug = Str::slug($request->input('name'));
        $originalSlug = $slug;
        $counter = 1;

        while (Category::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter++;
        }

        try {
            // Create the category
            Category::create([
                "name" => $request->input('name'),
                "slug" => $slug,
                "parent_id" => $request->input('parent_id'),
                "description" => $request->input('description'),
            ]);

            // Redirect to the categories index page with a success message
            return redirect()->intended(route('adminpanel.categories', absolute: false));
        } catch (ValidationException $e) {
            // Redirect back with validation errors and input data
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            // Handle general errors
            return redirect()->back()->with('error', 'An error occurred while creating the category.')->withInput();
        }
    }



     public function update(Request $request, $category_id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'parent_id.exists' => 'The selected parent category is invalid.',
            'description.string' => 'The description must be a string.',
            'description.max' => 'The description may not be greater than 1000 characters.',
        ]);



        try {
            // Create the category
            $category = Category::findOrFail($category_id);

            $category->name = $request->input('name');
            $category->description = $request->input('description');
            $category->parent_id = $request->input('parent_id');

            $category->save();

            // Redirect to the categories index page with a success message
            return redirect()->intended(route('adminpanel.categories', absolute: false));
        } catch (ValidationException $e) {
            // Redirect back with validation errors and input data
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            // Handle general errors
            return redirect()->back()->with('error', 'An error occurred while creating the category.')->withInput();
        }
    }


    public function destroy($category_id){
        $category = Category::findOrFail($category_id);
        $category->delete();
        return redirect()->intended(route('adminpanel.categories', absolute: false));
    }
}
