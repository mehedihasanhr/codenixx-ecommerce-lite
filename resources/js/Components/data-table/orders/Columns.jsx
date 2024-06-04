import { Badge } from "@/Components/ui/badge";
import { Currency } from "@/utils/currency";
import { Order } from "@/utils/order";
import { Link } from "@inertiajs/react";
import { IconBrandPaypal, IconBuildingBank, IconCreditCard, IconPointFilled } from "@tabler/icons-react";
import { createColumnHelper } from '@tanstack/react-table';
import { format } from "date-fns";
import _ from 'lodash';

// Create a column helper
const columnHelper = createColumnHelper();

export const OrderColumns = [
    columnHelper.accessor('orderNumber', {
        id: "order_number",
        header: "Order",
        enableSorting: true,
        cell: info => {
            const order = new Order(info.row.original);
            return <Link href="#" className="font-medium">{order.orderNumber}</Link>;
        },
    }),
    columnHelper.accessor('createdAt', {
        id: "createdAt",
        header: "Date",
        cell: info => {
            const order = new Order(info.row.original);

            return (
                <div className="whitespace-nowrap">
                    {format(order.createdAt, 'MMM dd yyyy')}
                </div>
            );
        },
    }),
    columnHelper.accessor('user_id', {
        id: "user_id",
        header: "Customer",
        enableSorting: true,
        cell: info => {
            const order = new Order(info.row.original);
            return <div className="line-clamp-1">{order?.customer?.name}</div>;
        },
    }),
    columnHelper.accessor('paymentStatus', {
        id: "paymentStatus",
        header: "Payment Status",
        enableSorting: false,
        cell: info => {
            const order = new Order(info.row.original);
            const payment = order?.paymentDetails;
            if (payment) {
                return (
                    <Badge
                        variant="outline"
                        className="border-green-300 bg-green-50 text-green-500 rounded-lg pl-1"
                    >
                        <IconPointFilled size={14} />
                        Paid
                    </Badge>
                );
            }
            return (
                <Badge
                    variant="outline"
                    className="border-orange-300 bg-orange-50 text-orange-400 rounded-lg pl-1"
                >
                    <IconPointFilled size={14} /> Pending
                </Badge>
            );
        },
    }),
    columnHelper.accessor('paymentMethod', {
        id: "paymentMethod",
        header: "Payment method",
        enableSorting: false,
        cell: info => {
            const order = new Order(info.row.original);
            const payment = order?.paymentDetails;
            if (payment) {
                return (
                    <div className="flex items-center gap-2">
                        {payment.payment_method === "credit_card" ? (
                            <IconCreditCard size={15} />
                        ) : payment.payment_method === "bank_transfer" ? (
                            <IconBuildingBank size={15} />
                        ) : payment.payment_method === "paypal" ? (
                            <IconBrandPaypal size={15} />
                        ) : null}
                        <span className="line-clamp-1">{_.startCase(payment.payment_method)}</span>
                    </div>
                );
            }
            return <span>--</span>;
        },
    }),
    columnHelper.accessor('total', {
        id: "total",
        header: "Total",
        cell: info => {
            const order = new Order(info.row.original);
            const currency = new Currency('BDT');
            return (
                <div className="line-clamp-1">
                    {currency.format(order.total)}
                </div>
            );
        },
    }),
    columnHelper.accessor('items', {
        id: "items",
        header: "Items",
        cell: info => {
            const order = new Order(info.row.original);
            return (
                <div>
                    {order.products?.length}
                </div>
            );
        },
    }),
    columnHelper.accessor('status', {
        id: "status",
        header: "Status",
        enableSorting: false,
        cell: info => {
            const order = new Order(info.row.original);
            console.log(order.status)
            const status = order.status;
            return (
                <div>
                    <span
                        className="py-1 px-2.5 text-xs font-medium rounded"
                        style={{
                            background: status.background,
                            color: status.foreground
                        }}
                    >
                        {_.startCase(order.status.name)}
                    </span>
                </div>
            );
        },
    }),
];
