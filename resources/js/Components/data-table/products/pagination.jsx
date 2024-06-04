import { Inertia } from '@inertiajs/inertia';
import clsx from "clsx";
import React, { useTransition } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";

export default function TablePagination({
    totalDataLength,
    totalPages,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
}) {
    const [_, startTransition] = useTransition();
    const [pageButtons, setPageButtons] = React.useState([1, 2, 3]);
    const maxButtons = 3; // Maximum number of page buttons to display
    const POST_ELLIPSE = totalPages > maxButtons && pageIndex < totalPages - 1;
    const PRE_ELLIPSE = pageIndex + 1 > 3;

    React.useLayoutEffect(() => {
        const buttons = [];
        if (totalPages <= maxButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            if (pageIndex <= Math.floor(maxButtons / 2) + 1) {
                for (let i = 1; i <= maxButtons; i++) {
                    buttons.push(i);
                }
            } else if (pageIndex >= totalPages - Math.floor(maxButtons / 2)) {
                for (
                    let i = totalPages - maxButtons + 1;
                    i <= totalPages;
                    i++
                ) {
                    buttons.push(i);
                }
            } else {
                for (
                    let i = pageIndex - Math.floor(maxButtons / 2);
                    i <= pageIndex + Math.floor(maxButtons / 2);
                    i++
                ) {
                    buttons.push(i);
                }
            }
        }

        setPageButtons(buttons);
    }, [pageIndex, pageSize, totalPages, totalDataLength]);

    const handlePageChange = (page) => {
        onPageChange({
            pageIndex: page-1,
            pageSize,
        });


        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('adminpanel.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    };

    const handlePageSizeChange = (value) => {
        onPageSizeChange({ pageIndex, pageSize: Number(value) });

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('ppi', value);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('adminpanel.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    }



    return (
        <Pagination className="justify-between py-3">
            <PaginationContent className="text-sm">
                <span className="whitespace-nowrap">{"Rows per page "}</span>
                <Select
                    value={pageSize.toString()}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="px-2.5 h-8 rounded-sm">
                        <SelectValue className="rounded-sm" />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 40, 100, 500].includes(pageSize) ? null :
                            <SelectItem value={`${pageSize}`}> {pageSize} </SelectItem>
                         }
                        <SelectItem value="10"> 10 </SelectItem>
                        <SelectItem value="20"> 20 </SelectItem>
                        <SelectItem value="40"> 40 </SelectItem>
                        <SelectItem value="100"> 100 </SelectItem>
                        <SelectItem value="500"> 500 </SelectItem>
                    </SelectContent>
                </Select>
            </PaginationContent>

            <PaginationContent className="text-mute-foreground">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        disabled={pageIndex === 0}
                        className={clsx( "",
                            pageIndex === 0 && "hover:cursor-not-allowed opacity-50"
                        )}
                        onClick={() => (pageIndex < totalPages - 1 && pageIndex !== 0) ? handlePageChange(pageIndex) : null}
                    />
                </PaginationItem>

                 {pageIndex > 2  ?
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(1)}
                            className="w-8"
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                : null}

                {PRE_ELLIPSE && (
                    <PaginationItem>
                        <PaginationEllipsis className="opacity-50" />
                    </PaginationItem>
                )}
                {pageButtons.map((item) => (
                    <PaginationItem key={item}>
                        <PaginationLink
                            href="#"
                            isActive={pageIndex + 1 === item}
                            className="w-8"
                            onClick={() => handlePageChange(item)}
                        >
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {POST_ELLIPSE && (
                    <PaginationItem>
                        <PaginationEllipsis className="opacity-50" />
                    </PaginationItem>
                )}

                {pageIndex + 2 < totalPages  ?
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(totalPages)}
                            className="w-8"
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                : null}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        className={clsx( "",
                            pageIndex === totalPages - 1 &&  "hover:cursor-not-allowed opacity-50"
                        )}
                        onClick={() => pageIndex < totalPages - 1 ? handlePageChange(pageIndex + 2) : null}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
