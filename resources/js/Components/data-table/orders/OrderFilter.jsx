import { SearchBox } from "@/Components/Searchbox";
import { SingleDateSelection } from "@/Components/SingleDateSelection";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function OrderFilter(props) {
    const [date, setDate] = useState(() =>
        props?.order_date ? new Date(props?.order_date) : null,
    );
    const [isCustomerPopoverOpen, setIsCustomerPopoverOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(props?.customer);
    const [status, setStatus] = useState(props?.status);

    // handle date filter
    const handleDateFilter = (date) => {
        setDate(date);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("order_date", dayjs(date).format("MM-DD-YYYY"));
        const paramsObject = Object.fromEntries(searchParams.entries());
        // Update the query string using Inertia
        const newUrl = route("adminpanel.orders", paramsObject);
        // Perform Inertia visit
        router.get(newUrl);
    };

    // handle customer filter
    const handleCustomerFilter = (customer) => {
        setSelectedCustomer(customer.id);
        setIsCustomerPopoverOpen(false);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("customer", customer.id);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("adminpanel.orders", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // handle status filter
    const handleStatusFilter = (status) => {
        setStatus(status);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("status", status);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("adminpanel.orders", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // clear all filter
    const clearFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("status");
        searchParams.delete("customer");
        searchParams.delete("order_date");
        searchParams.delete("search");

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("adminpanel.orders", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // Handle search
    const handleSearch = (value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("search", value);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("adminpanel.orders", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    return (
        <div className="flex items-center flex-wrap gap-4 mb-3">
            <form onSubmit={handleSearch}>
                <SearchBox
                    defaultValue={props?.search}
                    handleSearch={handleSearch}
                    placeholder="Search orders by #Order ID"
                />
            </form>

            {/* filter by Order date */}
            <SingleDateSelection date={date} setDate={handleDateFilter} />

            {/* status */}
            <Select defaultValue={status} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-44 h-9 text-left text-sm border-dashed hover:border-primary/50">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    {props?.orderStatus?.map((status) => (
                        <SelectItem key={status.id} value={status.name}>
                            {_.startCase(status.name)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Customers */}
            <Popover
                open={isCustomerPopoverOpen}
                onOpenChange={setIsCustomerPopoverOpen}
            >
                <PopoverTrigger className="flex items-center justify-between text-sm w-44 h-9 border text-left px-3 border-dashed hover:border-primary/50 rounded-lg">
                    {props?.customers?.find(
                        (c) => c.id === Number(selectedCustomer),
                    )?.name ?? (
                        <span className="text-muted-foreground">
                            Filter by customer
                        </span>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-30" />
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput />
                        <CommandList>
                            <CommandGroup>
                                {props?.customers?.map((customer) => (
                                    <CommandItem
                                        key={customer.id}
                                        className="flex items-center justify-between"
                                        value={customer.name}
                                        onSelect={() =>
                                            handleCustomerFilter(customer)
                                        }
                                    >
                                        <span className="text-sm line-clamp-1">
                                            {customer.name}
                                        </span>
                                        <CheckIcon
                                            className={cn(
                                                "w-4 h-4 text-sm text-muted-foreground invisible",
                                                Number(selectedCustomer) ===
                                                    customer.id && "visible",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {props?.search ||
            props?.order_date ||
            props?.status ||
            props?.customer ? (
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                    onClick={clearFilter}
                >
                    <Cross1Icon className="w-3 h-3 mr-1" />
                    <span>Clear</span>
                </Button>
            ) : null}
        </div>
    );
}
