import { Link } from "@inertiajs/react";
import { useState } from "react";
import { DataTable } from "../Datatable";
import { OrderColumns } from "./Columns";
import { OrderFilter } from "./OrderFilter";

export function OrdersTable(props) {
    const [data, setData] = useState(props?.orders);
    const [columns, setColumns] = useState([...OrderColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState([
        { id: props?.sort, desc: props?.order === "desc" },
    ]);
    const [pagination, setPagination] = useState({
        pageIndex: Number(props?.page) - 1,
        pageSize: Number(props?.count),
    });

    return (
        <div className="bg-background p-8 rounded-lg mt-3">
            <OrderFilter {...props} />

            <div className="relative">
                <DataTable
                    data={data}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    sorting={sorting}
                    setSorting={setSorting}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                    route="adminpanel.orders"
                />
            </div>
        </div>
    );
}
