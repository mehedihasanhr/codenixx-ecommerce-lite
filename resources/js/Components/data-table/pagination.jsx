import clsx from "clsx";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export default function TablePagination({
    totalDataLength,
    totalPages,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
    baseURL,
}) {
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

    const handlePageChange = (index) => {
        onPageChange({
            pageIndex: index,
            pageSize,
        });
    };

    return (
        <Pagination className="justify-between py-3">
            <PaginationContent className="text-sm">
                <span className="whitespace-nowrap">{"Rows per page "}</span>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) =>
                        onPageSizeChange({ pageIndex, pageSize: Number(value) })
                    }
                >
                    <SelectTrigger className="px-2.5 h-8 rounded-sm">
                        <SelectValue className="rounded-sm" />
                    </SelectTrigger>
                    <SelectContent>
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
                        href={
                            pageIndex > 0
                                ? `${baseURL}?page=${pageIndex}&count=${pageSize}`
                                : "#"
                        }
                        onClick={() =>
                            pageIndex > 0 && handlePageChange(pageIndex - 1)
                        }
                        className={clsx(
                            "",
                            pageIndex === 0 &&
                                "hover:cursor-not-allowed opacity-50"
                        )}
                    />
                </PaginationItem>

                {PRE_ELLIPSE && (
                    <PaginationItem>
                        <PaginationEllipsis className="opacity-50" />
                    </PaginationItem>
                )}
                {pageButtons.map((item) => (
                    <PaginationItem key={item}>
                        <PaginationLink
                            href={`${baseURL}?page=${item}&count=${pageSize}`}
                            isActive={pageIndex + 1 === item}
                            onClick={() => handlePageChange(item - 1)}
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
                <PaginationItem>
                    <PaginationNext
                        href={
                            pageIndex < totalPages - 1
                                ? `${baseURL}?page=${
                                      pageIndex + 2
                                  }&count=${pageSize}`
                                : "#"
                        }
                        onClick={() =>
                            pageIndex < totalPages - 1 &&
                            handlePageChange(pageIndex + 1)
                        }
                        className={clsx(
                            "",
                            pageIndex === totalPages - 1 &&
                                "hover:cursor-not-allowed opacity-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
