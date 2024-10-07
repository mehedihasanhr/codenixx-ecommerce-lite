import { useEffect, useState } from "react";
import { DataTable } from "../Datatable";
import { CollectionTableColumns } from "./Columns";
import { Collection } from "@/utils/collection";
import { SearchBox } from "@/Components/Searchbox";
import { router } from "@inertiajs/react";

export function CollectionsTable(props) {
    const [data, setData] = useState([]);
    const [columns] = useState([...CollectionTableColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState([
        { id: props?.sort, desc: props?.order === "desc" },
    ]);

    const [pagination, setPagination] = useState({
        pageIndex: Number(props?.page) - 1,
        pageSize: Number(props?.count),
    });

    useEffect(() => {
        setData(() => ({
            ...props?.collections,
            data: props?.collections?.data?.map(
                (collection) => new Collection(collection),
            ),
        }));
    }, [props]);

    // handle search functionality
    const handleSearch = (search) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("search", search);
        searchParams.set("page", 1);

        if (search === "") {
            searchParams.delete("search");
        }
        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("collections", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    return (
        <div className="bg-background p-8 rounded-lg mt-3">
            <div className="mb-3.5">
                <SearchBox
                    defaultValue={props?.search ?? ""}
                    handleSearch={handleSearch}
                    placeholder="Search by collection name..."
                />
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
                    route="collections"
                />
            </div>
        </div>
    );
}
