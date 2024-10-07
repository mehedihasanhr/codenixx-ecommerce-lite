import CategoryCreate from "@/Components/CategoryCreate";
import CategoryEdit from "@/Components/CategoryEdit";
import { Loader } from "@/Components/Loader";
import { SearchBox } from "@/Components/Searchbox";
import { Button } from "@/Components/ui/button";
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
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Cross1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IconPlus } from "@tabler/icons-react";
import _ from "lodash";
import { useEffect, useState } from "react";

const paginate = (data, page, count) => {
    const start = (page - 1) * count;
    const paginatedItems = _.slice(data, start, start + count);
    return paginatedItems;
};

export default function Categories({ categories }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [pagination, setPagination] = useState("");
    let count = 10;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let page = parseInt(urlParams.get("page")) || 1;
        // create paginate
        const _categories = categories?.filter(
            (category) =>
                category?.name
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase()) ||
                category?.parent?.name
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase()),
        );

        if (searchText) {
            count = _categories.length;
        }

        if (page * count > _categories.length) {
            page = 1;
        }

        const paginatedData = paginate(_categories, page, count);
        setIsLoading(false);
        setData(paginatedData);
        setPagination(page);
    }, [categories, searchText]);

    // handle Search

    const handleSearch = (value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("search", value);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("adminpanel.categories", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    return (
        <AdminLayout>
            <div className="p-8 overflow-hidden max-w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2>Products Management</h2>
                    </div>
                    <CategoryCreate categories={categories}>
                        <Button
                            size="sm"
                            className="flex items-center space-x-1 hover:no-underline"
                        >
                            <IconPlus size={15} />
                            <span>Add Category</span>
                        </Button>
                    </CategoryCreate>
                </div>

                {/* Categories list */}
                <div className="bg-background p-8 rounded-lg">
                    <div className="flex items-center gap-2.5 mb-3">
                        <SearchBox
                            defaultValue={searchText}
                            placeholder="Search by category name..."
                            handleSearch={handleSearch}
                        />
                        {searchText ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSearchText("")}
                            >
                                <Cross1Icon className="w-3 h-3 mr-1" />
                                Clear
                            </Button>
                        ) : null}
                    </div>

                    <div className="border rounded-lg relative">
                        {isLoading && (
                            <Loader
                                title="Loading..."
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border shadow-lg py-2 px-3 rounded-lg bg-background z-10"
                            />
                        )}
                        <Table>
                            <TableHeader>
                                <TableRow className="[&>th]:text-sm [&>th]:text-muted-foreground [&>th]:h-10">
                                    <TableHead> # </TableHead>
                                    <TableHead> Name </TableHead>
                                    <TableHead> Parent </TableHead>
                                    <TableHead> Description </TableHead>
                                    <TableHead> Action </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.length > 0 ? (
                                    data?.map((category) => (
                                        <TableRow
                                            key={category.id}
                                            className="[&>td]:py-2"
                                        >
                                            <TableCell>{category.id}</TableCell>
                                            <TableCell>
                                                {category.name}
                                            </TableCell>
                                            <TableCell>
                                                {category.parent?.name ?? "--"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="line-clamp-1">
                                                    {category?.description ??
                                                        "--"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 5">
                                                    <CategoryEdit
                                                        category={category}
                                                        categories={categories}
                                                    >
                                                        <Button
                                                            aria-label="editCategory"
                                                            size="icon-sm"
                                                            className="gap-2 p-1"
                                                        >
                                                            <Pencil1Icon />
                                                        </Button>
                                                    </CategoryEdit>

                                                    <Button
                                                        variant="destructive"
                                                        size="icon-sm"
                                                        className="gap-2 p-1"
                                                        asChild
                                                    >
                                                        <Link
                                                            aria-label="deleteCategory"
                                                            href={route(
                                                                "adminpanel.category.delete",
                                                                {
                                                                    category_id:
                                                                        category.id,
                                                                },
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                        >
                                                            <TrashIcon />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow className="[&>td]:py-4">
                                        <TableCell colSpan={5}>
                                            {searchText
                                                ? "No information found for your search."
                                                : "Data empty"}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {searchText ? null : (
                        <Pagination className="items-center justify-end mt-3">
                            <div className="text-sm text-muted-foreground font-normal pr-8 mr-2 border-r">
                                Page {pagination} of{" "}
                                {Math.ceil(categories?.length / count)}
                            </div>
                            <PaginationPrevious
                                onClick={() => setIsLoading(true)}
                                href={route("adminpanel.categories", {
                                    page: pagination > 0 ? pagination - 1 : 1,
                                })}
                            />
                            <PaginationNext
                                onClick={() => setIsLoading(true)}
                                href={route("adminpanel.categories", {
                                    page:
                                        pagination < categories.length / count
                                            ? pagination + 1
                                            : categories.length / count,
                                })}
                            />
                        </Pagination>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
