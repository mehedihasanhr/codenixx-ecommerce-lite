import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMedia } from "react-use";
import { SearchBox } from "./Searchbox";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

export function ProductListForCollection({
    collection,
    setCollection,
    collectionId,
}) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMedia("(min-width:480px)");

    // is desktop render dialog
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="text-sm flex items-center justify-center gap-1 w-full border py-1.5 h-9 rounded-lg">
                    <IconPlus size={15} />
                    <span> Collection</span>
                </DialogTrigger>
                <DialogContent className="h-3/4 max-w-7xl flex flex-col">
                    <DialogTitle> Products </DialogTitle>
                    <Separator />
                    <ProductList
                        collection={collection}
                        onSelect={setCollection}
                        collectionId={collectionId}
                    />
                    <Separator />
                    <DialogFooter className="w-full items-center sm:justify-between">
                        <span className="text-sm text-muted-foreground">
                            Total {collection.length} selected
                        </span>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return null;
}

function ProductList({ collection, onSelect, collectionId }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count] = useState(20);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // fetch more data
    const fetchData = async (page, search = "") => {
        const data = fetch(route("product.list", { page, count, search })).then(
            (res) => res.json(),
        );
        return await data;
    };

    useEffect(() => {
        (async () => {
            const data = await fetchData(page, search);
            if (!data) return;
            const newData = data?.data ?? [];
            setProducts(newData);
            setPage(data?.current_page);
            setHasMore(!!data?.next_page_url);
        })();
    }, [search]);

    // fetch more data
    const fetchMoreData = async () => {
        const data = await fetchData(page + 1, search);
        if (!data) return;
        const newData = data?.data ?? [];

        setProducts((prev) => [...prev, ...newData]);
        setPage(data?.current_page);
        setHasMore(!!data?.next_page_url);
    };

    return (
        <>
            <SearchBox
                defaultValue={search}
                handleSearch={(search) => {
                    setSearch(search);
                    fetchData(1, search);
                }}
                placeholder="Search product..."
            />
            <div
                id="scrollableDiv"
                className="flex-1"
                style={{ overflow: "auto" }}
            >
                <InfiniteScroll
                    dataLength={products?.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <span className="text-center font-sm text-muted-foreground/50">
                            Loading...
                        </span>
                    }
                    scrollableTarget={"scrollableDiv"}
                >
                    {products?.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            collection={collection}
                            onSelect={onSelect}
                            collectionId={collectionId}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </>
    );
}

const Product = ({ product, collection, onSelect, collectionId }) => {
    const ids = collection.map((p) => p.itemable_id);

    // handle selection
    const handleSelection = async (checked) => {
        await fetch(
            route("collection.item.update", {
                collection_id: collectionId,
            }),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.head.querySelector(
                        'meta[name="csrf-token"]',
                    ).content,
                },
                body: JSON.stringify({
                    item_id: product.id,
                    action: checked ? "add" : "remove",
                }),
            },
        )
            .then((res) => res.json())
            .then((data) => {
                onSelect(data.items);
            });
    };

    return (
        <label
            htmlFor={product.id}
            data-checked={ids.includes(product.id)}
            className="flex items-center gap-4 rounded-lg px-3.5 py-2 mb-px hover:bg-neutral-100"
        >
            {/* image */}
            <Checkbox
                id={product.id}
                checked={ids.includes(product.id)}
                onCheckedChange={handleSelection}
                className="border-muted-foreground/50 checked:border-primary"
            />
            <div className="w-12 aspect-square bg-neutral-200 rounded-md" />
            <div>{product.name}</div>
        </label>
    );
};
