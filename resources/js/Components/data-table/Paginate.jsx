import ReactPaginate from "react-paginate";

export function Paginate({ pageCount, currentPage, handlePageClick }) {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            initialPage={currentPage}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-2.5 [&>li]:list-none text-sm w-fit"
            pageLinkClassName="block h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-muted-foreground hover:bg-muted"
            previousLinkClassName="block h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-muted-foreground hover:bg-muted"
            nextLinkClassName="block h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-muted-foreground hover:bg-muted"
            activeLinkClassName="bg-primary text-primary-foreground hover:bg-primary"
            breakLinkClassName="block h-8 min-w-8 px-3 border flex items-center justify-center rounded-lg hover:no-underline text-muted-foreground hover:bg-muted"
        />
    );
}
