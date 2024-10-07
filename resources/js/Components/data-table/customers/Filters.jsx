import { SearchBox } from "@/Components/Searchbox";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import _ from "lodash";

export function CustomerFilterBar(props) {
    const searchParams = new URLSearchParams(window.location.search);

    const handleRoute = (opts) => {
        opts.set("page", 1);
        const params = Object.fromEntries(opts.entries());
        const url = route("customers", params); // Update the query string using Inertia
        router.get(url); // Perform Inertia visit
    };

    // clear all filter
    const clearFilter = () => {
        searchParams.delete("search");
        handleRoute(searchParams);
    };

    // Handle search
    const handleSearch = (value) => {
        searchParams.set("search", value);
        handleRoute(searchParams);
    };

    return (
        <div className="flex items-center flex-wrap gap-4 mb-3">
            <form onSubmit={handleSearch}>
                <SearchBox
                    defaultValue={props?.search}
                    handleSearch={handleSearch}
                    placeholder="Search customer..."
                />
            </form>

            {props?.search ? (
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
