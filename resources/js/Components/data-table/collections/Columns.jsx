import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Link, router } from "@inertiajs/react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { toast } from "sonner";

// Create a column helper
const columnHelper = createColumnHelper();

export const CollectionTableColumns = [
    columnHelper.accessor("id", {
        id: "id",
        header: "#",
        maxSize: 30,
        enableSorting: true,
        cell: (info) => {
            return info.row.original.id;
        },
    }),

    columnHelper.accessor("title", {
        id: "title",
        header: "Title",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return (
                <Link
                    href={route("collection.view", {
                        collection_id: data.id,
                        slug: data.slug,
                    })}
                    className="line-clamp-1"
                >
                    {data.name}
                </Link>
            );
        },
    }),

    columnHelper.accessor("slug", {
        id: "slug",
        header: "Slug",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span className="line-clamp-1"> {data.slug} </span>;
        },
    }),

    columnHelper.accessor("items", {
        id: "items",
        header: "Items",
        maxSize: 30,
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span> {data.items?.length} </span>;
        },
    }),

    columnHelper.accessor("description", {
        id: "Description",
        header: "Description",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return (
                <span className="line-clamp-1">{data.description ?? "--"}</span>
            );
        },
    }),

    columnHelper.accessor("", {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            const deleteCollection = () => {
                router.delete(
                    route("collection.destroy", {
                        collection_id: data.id,
                        slug: data.slug,
                    }),
                    {
                        onSuccess: () => {
                            toast.success("Collection deleted successfully.");
                        },
                    },
                );
            };
            return (
                <div className="flex items-center gap-0.5 text-muted-foreground">
                    <Button variant="ghost" size="icon-sm" asChild>
                        <Link
                            href={route("collection.view", {
                                collection_id: data.id,
                                slug: data.slug,
                            })}
                            className="text-muted-foreground hover:no-underline"
                        >
                            <IconEdit size={15} />
                        </Link>
                    </Button>

                    {/* Delete a collection */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                                <IconTrash size={15} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. It will
                                    permanently delete the collection:
                                    <span className="text-primary pl-0.5">
                                        {data.name}
                                    </span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={deleteCollection}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    }),
];
