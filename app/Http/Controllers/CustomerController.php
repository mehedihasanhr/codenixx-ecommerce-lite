<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');
        $count = $request->query('count', 10);
        $page = $request->query('page', 1);
        $search = $request->query('search', "");

        $customers = User::with(["profile", "address"])
            ->where("role", "CUSTOMER")
            ->where(function ($builder) use ($search) {
                $builder->where("name", "LIKE", "%" . $search . "%")
                    ->orWhere("email", "LIKE", "%" . $search . "%");
            })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);

        return Inertia::render('SuperAdmin/Customers/Index', [
            "customers" => $customers,
            "count" => $count,
            "order" => $order,
            "page" => $page,
            "search" => $search
        ]);
    }


    // show customer details pages
    public function show($customer_id)
    {
        $customer = User::with(["profile", "address", "orders.status"])->findOrFail($customer_id);


        return Inertia::render('SuperAdmin/Customers/CustomerDetails', [
            "customer" => $customer,
        ]);
    }

    // json data
    public function ordersJson(Request $request, $customer_id)
    {

        // filter data
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');
        $count = $request->query('count', 10);
        $page = $request->query('page', 1);
        $search = $request->query('search', "");

        $orders = Order::with(["items"])->where('user_id', $customer_id)
            ->where(function ($builder) use ($search) {
                $builder->where("invoice", "LIKE", "%" . $search . "%")
                    ->orWhere("id", "LIKE", "%" . $search . "%");
            })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);



        if (!$order) {
            return response()->json([
                "error" => true,
                "messager" => "Data not found",
                "filter" => [
                    "sort" => $sort,
                    "order" => $order,
                    "count" => $count,
                    "page" => $page,
                    "search" => $search,
                ]
            ], 404);
        }


        return response()->json([
            "error" => false,
            "messager" => "Data successfully fetch",
            "orders" => $orders,
            "filter" => [
                "sort" => $sort,
                "order" => $order,
                "count" => $count,
                "page" => $page,
                "search" => $search,
            ]
        ], 200);
    }
}
