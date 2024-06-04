"use client";

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Loader } from "@/Components/Loader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { usePageLoading } from "@/hooks/usePageLoading";
import { cn } from "@/lib/utils";
import { Inertia } from "@inertiajs/inertia";
import {
    IconArrowNarrowDown,
    IconArrowNarrowUp,
    IconArrowsUpDown,
    IconDotsVertical,
} from "@tabler/icons-react";
import * as React from "react";
import { ProductTableColumns } from "./columns";
import TablePagination from "./pagination";
import TableFilterBar from "./table-filter-bar";

export default function ProductsTable({
    data,
    sortField,
    sortOrder,
    categories,
    brands,
    defaultBrand,
    defaultCategory
}) {
    const isPageLoading = usePageLoading();

    const [columns] = React.useState([...ProductTableColumns]);
    const [columnVisibility, setColumnVisibility] = React.useState({id: false, compare_price:false, cost_per_item: false});
    const [sorting, setSorting] = React.useState([{id: sortField, desc: sortOrder === "desc"}]);
    const [pagination, setPagination] = React.useState({
        pageIndex: Number(data.current_page)-1,
        pageSize: Number(data.per_page),
    });

    // table instance
    const table = useReactTable({
        data: data.data,
        columns,
        state: { sorting, columnVisibility },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });


    // handle sorting
    const toggleSorting = (header, desc) => {
        header.column.toggleSorting(desc);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('sort', header.id);
        searchParams.set('order', desc ? "desc" : 'asc');

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('dashboard.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    }

    // clear sorting
    const clearSorting = (header) => {
        header.column.clearSorting();

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('sort');
        searchParams.delete('order');

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('dashboard.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    }

    return (
        <div className="relative max-w-full">
            {/* Table filter bar */}
            <TableFilterBar
                table={table}
                categories={categories}
                brands={brands}
                defaultBrand={defaultBrand}
                defaultCategory={defaultCategory}
            />

            {isPageLoading ?
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background border border-border rounded-lg shadow-lg px-3 py-2">
                    <Loader title="Loading..." />
                </div>
            : null}



            {/* Data table */}
            <ScrollArea className={cn('border rounded-lg', isPageLoading && 'opacity-70')}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="first:[&>th]:rounded-tl-lg"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-sm h-10 text-muted-foreground/90 group select-none"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gpa-3">
                                                    <div className="line-clamp-1">
                                                        {header.isPlaceholder ? null : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                    </div>
                                                    {{
                                                        asc: (
                                                            <IconArrowNarrowUp size={14} className="mr-1.5 text-accent-foreground/50"/>
                                                        ),
                                                        desc: (
                                                            <IconArrowNarrowDown size={14} className="mr-1.5 text-accent-foreground/50"/>
                                                        ),
                                                    }[header.column.getIsSorted()] ?? null}
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground h-8 w-8 focus-within:outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center justify-center gap-2.5 rounded-md invisible group-hover:visible data-[state=open]:visible">
                                                        <IconDotsVertical
                                                            size={16}
                                                        />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => toggleSorting(header, false)}>
                                                            <IconArrowNarrowUp
                                                                size={16}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                            Asc
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => toggleSorting(header, true)}>
                                                            <IconArrowNarrowDown
                                                                size={16}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                            Desc
                                                        </DropdownMenuItem>
                                                        {header.column.getSortIndex() !== -1 ? (
                                                            <DropdownMenuItem onClick={() => clearSorting(header)} >
                                                                <IconArrowsUpDown
                                                                    size={14}
                                                                    className="mr-1.5 text-accent-foreground/50"
                                                                />
                                                                Clear Sort
                                                            </DropdownMenuItem>
                                                        ) : null}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-1.5 px-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* pagination */}
            <TablePagination
                totalDataLength={data.total}
                totalPages={data.last_page}
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                onPageChange={(value) => setPagination(value)}
                onPageSizeChange={(value) => setPagination(value)}
            />
        </div>
    );
}
