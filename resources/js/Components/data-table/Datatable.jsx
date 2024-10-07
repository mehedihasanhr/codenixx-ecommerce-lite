"use client";

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Paginate } from "./Paginate";

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
import { usePageLoading } from "@/hooks/usePageLoading";
import { cn } from "@/lib/utils";
import { Inertia } from "@inertiajs/inertia";
import {
    IconArrowNarrowDown,
    IconArrowNarrowUp,
    IconArrowsUpDown,
    IconDotsVertical,
} from "@tabler/icons-react";
import { Loader } from "../Loader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { router } from "@inertiajs/react";

export function DataTable(props) {
    const isPageLoading = usePageLoading();

    // table instance
    const table = useReactTable({
        data: props?.data?.data ?? [],
        columns: props?.columns ?? [],
        state: {
            sorting: props.sorting,
            columnVisibility: props.columnVisibility,
        },
        onSortingChange: props?.setSorting,
        onColumnVisibilityChange: props?.setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // handle page click
    const handlePageClick = ({ selected }) => {
        const page = selected + 1;

        if (selected !== props.pagination.pageIndex) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", page);
            const paramsObject = Object.fromEntries(searchParams.entries());

            // Update the query string using Inertia
            const newUrl = route(props.route, paramsObject);
            props.setPagination((prev) => ({ ...prev, pageIndex: selected }));
            // Perform Inertia visit
            router.get(newUrl);
        }
    };

    // handle page click
    const handlePerPageItem = (selected) => {
        const count = selected;

        if (selected !== props?.pagination?.pageCount) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("count", count);
            const paramsObject = Object.fromEntries(searchParams.entries());

            // Update the query string using Inertia
            const newUrl = route(props.route, paramsObject);

            // Perform Inertia visit
            router.get(newUrl);
        }
    };

    // handle sorting
    const toggleSorting = (header, desc) => {
        header.column.toggleSorting(desc);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("sort", header.id);
        searchParams.set("order", desc ? "desc" : "asc");

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route(props.route, paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    };

    // clear sorting
    const clearSorting = (header) => {
        header.column.clearSorting();

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("sort");
        searchParams.delete("order");

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route(props.route, paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    };

    return (
        <>
            {isPageLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg border px-3 py-2.5 bg-background rounded-lg">
                    <Loader title="Processing..." />
                </div>
            ) : null}
            {/* Data table */}
            <ScrollArea
                className={cn(
                    "border rounded-lg",
                    isPageLoading && "opacity-70",
                )}
            >
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
                                            style={{
                                                maxWidth: header.getSize(),
                                            }}
                                            className="text-sm h-10 text-muted-foreground/90 group select-none"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gpa-3">
                                                    <div className="line-clamp-1">
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                  header.column
                                                                      .columnDef
                                                                      .header,
                                                                  header.getContext(),
                                                              )}
                                                    </div>
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

                                                {header.column.getCanSort() ? (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground h-8 w-8 focus-within:outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center justify-center gap-2.5 rounded-md invisible group-hover:visible data-[state=open]:visible">
                                                            <IconDotsVertical
                                                                size={16}
                                                            />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    toggleSorting(
                                                                        header,
                                                                        false,
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
                                                                    toggleSorting(
                                                                        header,
                                                                        true,
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
                                                                        clearSorting(
                                                                            header,
                                                                        )
                                                                    }
                                                                >
                                                                    <IconArrowsUpDown
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="mr-1.5 text-accent-foreground/50"
                                                                    />
                                                                    Clear Sort
                                                                </DropdownMenuItem>
                                                            ) : null}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                ) : null}
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
                                            className="py-2 px-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={props?.columns?.length}
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

            <div className="flex items-center flex-wrap gap-2.5 justify-between mt-3">
                <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                    <span>Rows per page</span>
                    <Select
                        defaultValue={props?.pagination?.pageSize ?? 10}
                        onValueChange={handlePerPageItem}
                    >
                        <SelectTrigger className="w-16 h-8 text-sm">
                            <SelectValue className="text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={10}> 10 </SelectItem>
                            <SelectItem value={20}> 20 </SelectItem>
                            <SelectItem value={30}> 30 </SelectItem>
                            <SelectItem value={50}> 50 </SelectItem>
                            <SelectItem value={100}> 100 </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Paginate
                    pageCount={props?.data?.last_page ?? 1}
                    currentPage={props?.pagination?.pageIndex}
                    handlePageClick={handlePageClick}
                />
            </div>
        </>
    );
}
