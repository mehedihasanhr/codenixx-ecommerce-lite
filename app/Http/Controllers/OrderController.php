<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    private $timeZone = 'Asia/Dhaka';

    /**
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {

        $page = $request->query('page', 1);
        $count = $request->query('count', 10);
        $status = $request->query('status', 'pending');
        $createdAt = $request->query('order_date', '');
        $customer = $request->query('customer', '');
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');


        $orderStatus = OrderStatus::where('name', $status)->first();


        $orders = Order::with(['items', 'user', 'status', 'paymentDetails'])
            ->where(function ($query) use ($orderStatus, $customer, $createdAt, $search) {
                // user filter
                if ($customer) {
                    $query->where('user_id', $customer);
                }

                // order date filter
                if ($createdAt) {
                    $date = convertToUTC($createdAt, 'm-d-Y', $this->timeZone);
                    $query->whereDate('created_at', $date);
                }

                // status filter
                if ($orderStatus) {
                    $query->where('status_id', $orderStatus->id);
                }

                // Search filter
                if ($search) {
                    $query->where('invoice', 'LIKE', '%' . $search . '%');
                }
            })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);

        // all status
        $orderStatus = OrderStatus::all();
        $customers = User::where('role', 'CUSTOMER')->get();

        return Inertia::render(
            "SuperAdmin/Orders",
            [
                "orders" => $orders,
                "orderStatus" => $orderStatus,
                'page' => $page,
                'count' => $count,
                'status' => $status,
                'customer' => $customer,
                'customers' => $customers,
                'order_date' => $createdAt,
                'search' => $search
            ]
        );
    }

    /**
     * @param Request $request
     * @param $invoice
     * @return \Inertia\Response
     */
    public function orderView(Request $request, $invoice)
    {
        $order = Order::with(['items.product', 'user.address', 'status', 'paymentDetails'])->where('invoice', $invoice)->first();
        return Inertia::render('SuperAdmin/Order', [
            'order' => $order
        ]);
    }


    /**
     * @param Request $request
     * @param $invoice
     * @return \Inertia\Response
     */

    public function updateOrderStatus(Request $request, $invoice)
    {
        $order = Order::where('invoice', $invoice)->first();
        $order->status_id = $request->input('status_id');
        $order->save();

        return redirect()->intended(route('adminpanel.orderView', ["invoice" => $order->invoice]));
    }
}
