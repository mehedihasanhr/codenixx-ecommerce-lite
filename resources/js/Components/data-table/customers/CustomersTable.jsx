import { useEffect, useState } from "react";
import { DataTable } from "../Datatable";
import { CustomerTableColumns } from "./Columns";
import { Customer } from "@/utils/customers";
import { CustomerFilterBar } from "./Filters";

export function CustomersTable(props) {
    const [data, setData] = useState(null);
    const [columns] = useState([...CustomerTableColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState([
        { id: props?.sort, desc: props?.order === "desc" },
    ]);

    useEffect(() => {
        setData({
            ...props?.customers,
            data: props?.customers?.data?.map(
                (customer) => new Customer(customer),
            ),
        });
    }, []);

    const [pagination, setPagination] = useState({
        pageIndex: Number(props?.page) - 1,
        pageSize: Number(props?.count),
    });

    return (
        <div className="bg-background p-8 rounded-lg mt-3">
            <div>
                <CustomerFilterBar {...props} />
            </div>

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
                    route="customers"
                />
            </div>
        </div>
    );
}
