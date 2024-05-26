<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login')
    ]);
})->name('welcome');

// super admin
Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');

    // products
    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('dashboard.products');
    Route::get('/dashboard/products/create', [ProductController::class, 'create'])->name('dashboard.product.create');

    Route::get('/dashboard/settings', function(){
        return Inertia::render("SuperAdmin/Settings");
    })->name('dashboard.settings');

    Route::get('/dashboard/settings', function(){
        return Inertia::render("SuperAdmin/Settings");
    })->name('dashboard.settings');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
