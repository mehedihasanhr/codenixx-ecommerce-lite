"use client";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import {
    IconArrowNarrowDown,
    IconArrowNarrowUp,
    IconArrowsUpDown,
    IconDotsVertical,
} from "@tabler/icons-react";
import * as React from "react";
import TablePagination from "../pagination";
import { ProductTableColumns } from "./columns";
import TableFilterBar from "./table-filter-bar";

export default function ProductsTable({ data }) {
    const [columns] = React.useState([...ProductTableColumns]);
    const [sorting, setSorting] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // table instance
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="max-w-full">
            {/* Table filter bar */}
            <TableFilterBar />

            {/* Data table */}
            <ScrollArea className="border rounded-lg">
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
                                            style={{
                                                width: header.getSize(),
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gpa-3">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}
                                                    {{
                                                        asc: (
                                                            <IconArrowNarrowUp
                                                                size={14}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                        ),
                                                        desc: (
                                                            <IconArrowNarrowDown
                                                                size={14}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted()
                                                    ] ?? null}
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground h-8 w-8 focus-within:outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center justify-center gap-2.5 rounded-md invisible group-hover:visible data-[state=open]:visible">
                                                        <IconDotsVertical
                                                            size={16}
                                                        />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                header.column.toggleSorting(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <IconArrowNarrowUp
                                                                size={16}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                            Asc
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                header.column.toggleSorting(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <IconArrowNarrowDown
                                                                size={16}
                                                                className="mr-1.5 text-accent-foreground/50"
                                                            />
                                                            Desc
                                                        </DropdownMenuItem>
                                                        {header.column.getSortIndex() !==
                                                        -1 ? (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    header.column.clearSorting()
                                                                }
                                                            >
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
                totalDataLength={data.length}
                totalPages={Math.ceil(data.length / pagination.pageSize)}
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                baseURL="/products"
                onPageChange={(value) => setPagination(value)}
                onPageSizeChange={(value) => setPagination(value)}
            />
        </div>
    );
}
