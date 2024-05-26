<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
   public function show(Request $request){
        $user = $request->user();
        if($user->role == "ADMIN"){
            return Inertia::render('SuperAdmin/Dashboard');
        }
   } 
}
