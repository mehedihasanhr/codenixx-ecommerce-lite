import { Loader } from "@/Components/Loader";
import {
    Pagination,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Order } from "@/utils/order";
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import * as React from "react";

const columnHelper = createColumnHelper();

const Columns = [
    columnHelper.accessor("id", {
        id: "id",
        header: "#",
        enableSorting: true,
        cell: (info) => {
            return info.row.original.id;
        },
    }),
];

export function OrdersTable({ customerId }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [sorting, setSorting] = React.useState([]);
    const [paginate, setPaginate] = React.useState({
        pageIndex: 0,
        pageCount: 10,
    });

    // fetch order by customer id
    const fetchOrders = async (options) => {
        setLoading(true);
        const page = (options?.pageIndex || paginate.pageIndex) + 1;
        const count = options?.pageCount || paginate.pageCount;
        const order = options?.order || (sorting?.[0]?.order ? "desc" : "asc");
        const sort = options?.sort || sorting?.[0]?.id;
        const search = options?.search || sorting.search;

        const query = { page, count, order, sort, search };

        const searchParams = new URLSearchParams(window?.location.search);
        const queryObject = Object.fromEntries(searchParams.entries());

        const url = route("customer.orders.json", {
            customer_id: customerId,
            ...queryObject,
            ...query,
        });

        fetch(url)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) {
                    setData(data);
                    setPaginate({
                        pageIndex: Number(data?.filter?.page) - 1,
                        pageCount: Number(data?.filter?.count),
                    });
                    setSorting([
                        {
                            id: data?.filter?.sort,
                            desc: data.filter?.order === "desc",
                        },
                    ]);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    React.useEffect(() => {
        (async () => fetchOrders({}))();
    }, []);

    const orders = data?.orders?.data?.map((d) => new Order(d));

    console.log({ data, orders });
    return (
        <>
            <div className="border rounded-lg relative mt-5">
                {loading && (
                    <Loader
                        title="Loading..."
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border shadow-lg py-2 px-3 rounded-lg bg-background z-10"
                    />
                )}
                <Table>
                    <TableHeader>
                        <TableRow className="[&>th]:text-sm [&>th]:bg-accent [&>th]:text-muted-foreground [&>th]:h-10">
                            <TableHead> Invoice </TableHead>
                            <TableHead> Date </TableHead>
                            <TableHead> Items </TableHead>
                            <TableHead> Total </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orders?.length > 0 ? (
                            orders?.map((order) => (
                                <TableRow
                                    key={order.invoice}
                                    className="[&>td]:py-2"
                                >
                                    <TableCell>
                                        <Link
                                            href={route(
                                                "adminpanel.orderView",
                                                {
                                                    invoice: order.getInvoice(),
                                                }
                                            )}
                                        >
                                            {order.invoice}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(order.createdAt).format(
                                            "MMM DD, YYYY [at] hh:mm A"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {order.getTotalProducts()}
                                    </TableCell>

                                    <TableCell>
                                        {order.getTotalCost().formatted}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="[&>td]:py-4">
                                <TableCell colSpan={4}>
                                    {data?.filter?.search
                                        ? "No information found for your search."
                                        : "Empty data"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination className="items-center justify-end mt-3">
                <div className="text-sm text-muted-foreground font-normal pr-8 mr-2 border-r">
                    Page {data?.orders?.current_page} of {data?.orders?.total}
                </div>
                <PaginationPrevious
                    onClick={async () => {
                        if (data?.orders?.prev_page_url) {
                            await fetchOrders({
                                pageIndex: data?.orders?.current_page - 2,
                            });
                        }
                    }}
                />
                <PaginationNext
                    onClick={async () =>
                        await fetchOrders({
                            pageIndex: data?.orders?.current_page,
                        })
                    }
                    disabled={data?.orders?.next_page_url}
                />
            </Pagination>
        </>
    );
}
