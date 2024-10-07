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
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { toast } from "sonner";

// Create a column helper
const columnHelper = createColumnHelper();

export const CustomerTableColumns = [
    columnHelper.accessor("id", {
        id: "id",
        header: "#",
        enableSorting: true,
        cell: (info) => {
            return info.row.original.id;
        },
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Link
                    href={route("customer.details", {
                        customer_id: data.id,
                    })}
                    className="text-foreground"
                >
                    {data.name}
                </Link>
            );
        },
    }),

    columnHelper.accessor("email", {
        id: "email",
        header: "Email",
        enableSorting: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a href={`mailto:${data.email}`} className="text-foreground">
                    {data.email}
                </a>
            );
        },
    }),

    columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created",
        enableSorting: true,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="text-foreground">
                    {dayjs(data.createdAt).format("MMM DD, YYYY")}
                </span>
            );
        },
    }),

    columnHelper.accessor("", {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
            const data = row.original;
            const deleteCustomer = () => {
                console.log(data.id);
            };
            return (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm">
                        <Link href="#" className="text-foreground">
                            <IconEye size={15} />
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
                                    You want to delete this customer? This
                                    action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={deleteCustomer}
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
