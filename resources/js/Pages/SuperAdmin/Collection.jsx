import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { FormGroup } from "@/Components/FormGroup";
import { FormLabel } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ProductListForCollection } from "@/Components/ProductListForCollection";
import { Separator } from "@/Components/ui/separator";
import { ImageUpload } from "@/Components/ImageUpload";
import Switch from "@/Components/Switch";

export default function Collection({ collection, ...props }) {
    if (!collection) return null;

    const { data, setData, post, processing } = useForm({
        name: collection.name,
        description: collection.description,
        is_active: collection.is_active,
        image: null,
    });

    const [preview, setPreview] = useState(
        () => collection?.image?.image_url ?? null,
    );

    const [collections, setCollections] = useState(
        () => collection?.items ?? [],
    );

    const isChange = (data) => {
        if (
            data.name !== collection.name ||
            data.description !== collection.description ||
            data.image !== null ||
            data.is_active !== collection.is_active
        )
            return true;

        return false;
    };

    // handle change event
    const handleChange = (e) => {
        e.preventDefault();
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // handle file change
    const hanldeFileChange = (e) => {
        const file = e.target.files[0];
        // set form data
        setData((prev) => ({
            ...prev,
            image: file,
        }));

        // create preview
        const preview = URL.createObjectURL(file);
        setPreview(preview);
    };

    // update collection
    const updateCollection = (e) => {
        e.preventDefault();
        post(route("collection.update", { collection_id: collection.id }));
    };

    // remove collection
    const removeCollection = (e) => {
        e.preventDefault();
        router.delete(
            route("collection.destroy", { collection_id: collection.id }),
            {
                ...data,
            },
        );
    };

    // handle selection
    const removeItemFromCollection = async (itemId) => {
        await fetch(
            route("collection.item.update", {
                collection_id: collection.id,
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
                    item_id: itemId,
                    action: "remove",
                }),
            },
        )
            .then((res) => res.json())
            .then((data) => {
                setCollections(data.items);
            });
    };

    return (
        <>
            <Head title={`#${collection.id}:Collection`} />
            <AdminLayout>
                <div className="container max-w-4xl p-8">
                    <section className="flex items-center mb-8">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <Link
                                href={route("collections")}
                                aria-label="backButton"
                                className="text-muted-foreground hover:no-underline"
                            >
                                <IconArrowLeft />
                            </Link>
                        </Button>
                        <h2 className="ml-1">Create Collection</h2>
                    </section>

                    <section className="grid grid-cols-12 gap-4">
                        <section className="col-span-8">
                            <Card className="mb-4">
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        General
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-5">
                                    {/* Collection name */}
                                    <FormGroup>
                                        <Label> Name: </Label>
                                        <Input
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>

                                    {/* Collection description */}
                                    <FormGroup>
                                        <Label> Description: </Label>
                                        <Textarea
                                            name="description"
                                            rows={10}
                                            value={data.description}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </CardContent>
                            </Card>

                            <Card className="mb-4">
                                <CardHeader className="pb-3.5">
                                    <CardTitle className="text-sm">
                                        Products
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-5">
                                    <div>
                                        <Separator />
                                        {collections?.map(
                                            (collection, index) => (
                                                <div
                                                    className="flex items-center gap-4 py-2 border-b border-border/50 border-dashed text-sm"
                                                    key={collection?.id}
                                                >
                                                    <div>{index + 1}.</div>
                                                    <div className="w-9 aspect-square border rounded-lg bg-muted-foreground/5">
                                                        {/* Product image here....  */}
                                                    </div>
                                                    <div className="flex-1">
                                                        {
                                                            collection?.itemable
                                                                ?.product_name
                                                        }
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className=""
                                                        onClick={() =>
                                                            removeItemFromCollection(
                                                                collection.itemable_id,
                                                            )
                                                        }
                                                    >
                                                        <IconX
                                                            size={15}
                                                            stroke={1.5}
                                                        />
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <ProductListForCollection
                                        collection={collections}
                                        setCollection={setCollections}
                                        collectionId={collection.id}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={removeCollection}
                                >
                                    Delete collection
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={!isChange(data) || processing}
                                    onClick={updateCollection}
                                >
                                    {processing ? "Processing..." : "Save"}
                                </Button>
                            </div>
                        </section>

                        <section className="col-span-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative border border-muted-foreground/50 border-dashed rounded-md h-28 hover:bg-muted-foreground/5">
                                        <input
                                            type="file"
                                            onChange={hanldeFileChange}
                                            className="absolute top-0 left-0 inset-0 opacity-0"
                                        />

                                        <Switch>
                                            <Switch.Case
                                                condition={preview === null}
                                            >
                                                <div className="flex items-center justify-center h-full text-sm">
                                                    <span className="px-3 py-1.5 border rounded-lg">
                                                        Add Image
                                                    </span>
                                                </div>
                                            </Switch.Case>

                                            <Switch.Case condition={!!preview}>
                                                <img
                                                    src={preview}
                                                    alt=""
                                                    width={250}
                                                    className="w-full h-full object-contain"
                                                />
                                            </Switch.Case>
                                        </Switch>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </section>
                </div>
            </AdminLayout>
        </>
    );
}
