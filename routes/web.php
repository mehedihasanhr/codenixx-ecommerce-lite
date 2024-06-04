<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home', ['canLogin' => Route::has('login')]);
})->name('welcome');

// super admin
Route::middleware(['auth', 'verified'])->group(function(){

    Route::prefix('adminpanel')->group(function(){
        Route::get('/dashboard', [DashboardController::class, 'adminpanel'])->name('adminpanel.dashboard');

        // products
        Route::prefix('products')->group(function(){
            Route::get('/', [ProductController::class, 'index'])->name('adminpanel.products');
            Route::get('/{product_id}/view', [ProductController::class, 'show'])->name('product.view');
            // create
            Route::get('/create', [ProductController::class, 'create'])->name('product.create');
            Route::post('/create', [ProductController::class, 'store'])->name('product.store');
            // edit
            Route::get('/{product_id}/edit', [ProductController::class, 'edit'])->name('product.edit');
            Route::post('/{product_id}/edit', [ProductController::class, 'update'])->name('product.update');
            Route::patch('/{product_id}', [ProductController::class, 'trash'])->name('product.trash');
            Route::delete('/{product_id}', [ProductController::class, 'destroy'])->name('product.delete');
        });


        // categories
        Route::prefix('categories')->group(function(){
            Route::get('/', [CategoryController::class, 'index'])->name('adminpanel.categories');
            Route::post('/', [CategoryController::class, 'create']);
            Route::patch('/{category_id}', [CategoryController::class, 'update'])->name('adminpanel.category.update');
            Route::delete('/{category_id}', [CategoryController::class, 'destroy'])->name('adminpanel.category.delete');
        });

        // orders
        Route::prefix('orders')->group(function(){
            Route::get('/', [OrderController::class, 'index'])->name('adminpanel.orders');
        });


        // settings
        Route::get('/settings', [SettingController::class, 'index'])->name('adminpanel.settings');

        // gallery/upload
        // upload file
        Route::post('/gallery/upload', [GalleryController::class, 'store'])->name('upload.files');
        Route::delete('/gallery/{gallery_id}/remove', [GalleryController::class, 'destroy'])->name('gallery.remove');
    });






});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
