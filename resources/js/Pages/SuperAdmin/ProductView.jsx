import { FormGroup } from "@/Components/FormGroup";

import PriceInputField from "@/Components/PriceInput";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/Components/ui/hover-card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AdminLayout from "@/Layouts/AdminLayout";
import { Currency } from "@/utils/currency";
import { Link, useForm } from "@inertiajs/react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { IconArrowLeft, IconPencil, IconSquareCheck, IconSquareCheckFilled } from "@tabler/icons-react";
import _ from 'lodash';

export default function ProductView({ product, categories, brands }) {

    console.log({product})


    const { data, setData } = useForm({
        name: product.name,
        description: product?.description,
        price: product.price,
        compare_price: product.compare_price,
        cost_per_item: product.cost_per_item,
        stock: product.stock,
        stock_unit: product.stock_unit,
        category: product.category_id,
        brand: product.brand_id,
        out_of_stock_selling: product.out_of_stock_selling,
        sku: product.sku,
        barcode: product.barcode,
        is_physical_product: product.is_physical_product,
        product_weight: product.weight,
        product_weight_unit: product.weight_unit,
        product_height: product.height,
        product_width: product.width,
        product_length: product['length'],
        status: product.status,
        colors: product.colors,
        sizes: product.sizes,
        galleries: product?.galleries
    });


    console.log({product})
    // calculate profit
    const profit = () => {
        const _profit = Number(data.price) - Number(data.cost_per_item);
        return _profit;
    };

    return (
        <AdminLayout>
            <div className="p-8 m-8 rounded-lg w-full max-w-5xl flex flex-col mx-auto gap-5">
                <div className="w-full flex items-center gap-x-2.5">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route("adminpanel.products")}>
                            <IconArrowLeft size={15} />
                        </Link>
                    </Button>
                    <h2>Product</h2>

                    <Button size="sm" className="ml-auto" asChild>
                        <Link href={route("product.edit", {product_id: product.id})} className="flex hover:no-underline">
                            <IconPencil size={15} />
                            <span className="px-2">Edit</span>
                        </Link>
                    </Button>
                </div>

                <form >
                    <div className="grid grid-cols-12 gap-5">
                        {/* Left section */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
                            {/* general information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        General
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-5">
                                    {/* name */}
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            name="name"
                                            type="text"
                                            defaultValue={data.name}
                                            readOnly
                                        />
                                    </FormGroup>

                                    {/* description */}
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <div
                                            className="editor_text border p-4 rounded-lg text-sm"
                                            dangerouslySetInnerHTML={{__html: data.description}}
                                        />
                                    </FormGroup>
                                </CardContent>
                            </Card>

                            {/* Media */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Media
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                    {data?.galleries?.length === 0 ? <div className="col-span-12 text-sm text-muted-foreground/80"> Empty media </div> : null}

                                     {data?.galleries?.map((file, index) => (
                                        <div
                                            key={index}
                                            className="col-span-4 relative w-full rounded-lg group aspect-square border"
                                        >
                                            <img
                                                src={file.image_url}
                                                alt=""
                                                width={150}
                                                height={150}
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Pricing */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Pricing
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                    <FormGroup className="col-span-12 sm:col-span-6">
                                        <Label>Price</Label>
                                        <PriceInputField
                                            name="price"
                                            value={data.price}
                                            readOnly
                                            currencyCode="BDT"
                                        />

                                    </FormGroup>

                                    <FormGroup className="col-span-12 sm:col-span-6">
                                        <Label className="flex items-center gap-2">
                                            <span>Compare-at price</span>
                                            <HoverCard openDelay={100}>
                                                <HoverCardTrigger className="hover:cursor-pointer">
                                                    <QuestionMarkCircledIcon className="w-3.5 h-3.5" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="p-2.5 leading-4 text-muted-foreground font-normal">
                                                    To display a markdown, enter a value higher than your. Often shown with a strikethrough.
                                                </HoverCardContent>
                                            </HoverCard>
                                        </Label>
                                        <PriceInputField
                                            name="compare_price"
                                            value={data.compare_price}
                                            currencyCode="BDT"
                                            readOnly
                                        />

                                    </FormGroup>

                                    <FormGroup className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <Label className="flex items-center gap-2 ">
                                            <span>Cost per items</span>
                                            <HoverCard openDelay={100}>
                                                <HoverCardTrigger className="hover:cursor-pointer">
                                                    <QuestionMarkCircledIcon className="w-3.5 h-3.5" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="p-2.5 leading-4 text-muted-foreground font-normal">
                                                    Customers won't see this
                                                </HoverCardContent>
                                            </HoverCard>
                                        </Label>
                                        <PriceInputField
                                            name="cost_per_item"
                                            value={data.cost_per_item}
                                            currencyCode="BDT"
                                            readOnly
                                        />

                                    </FormGroup>

                                    <FormGroup className="col-span-12 sm:col-span-4">
                                        <Label className="flex items-center gap-2">
                                            <span>Profit</span>
                                        </Label>
                                        <div className="w-full h-10 border rounded-md flex items-center px-3 py-2 text-sm">
                                            {`${ profit() < 0 ? "- " : "" }${new Currency("BDT").format(  Math.abs(profit()))}`}
                                        </div>
                                    </FormGroup>
                                </CardContent>
                            </Card>

                            {/* Inventory */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Inventory
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 grid grid-cols-12 gap-5">
                                        {/* Stock */}
                                        <FormGroup className="col-span-8">
                                            <Label>Stock</Label>
                                            <Input
                                                name="stock"
                                                type="number"
                                                min="0"
                                                defaultValue={data.stock}
                                                readOnly
                                            />
                                        </FormGroup>

                                        {/* Unit */}
                                        <FormGroup className="col-span-4">
                                            <Label>Unit</Label>
                                            <Input
                                                name="stock"
                                                defaultValue={data.stock_unit}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </div>

                                    {/* Continue selling when out of stock */}
                                    <FormGroup className="col-span-12 mb-2.5">
                                        <div className="flex items-center space-x-2">
                                            {data.out_of_stock_selling ?
                                                <IconSquareCheckFilled size={19} className="text-primary" />
                                            : <IconSquareCheck size={19} className="text-muted-foreground" />}
                                            <Label htmlFor="continueSelling">
                                                Continue selling when out of stock
                                            </Label>
                                        </div>

                                    </FormGroup>

                                    {/* SKU (Stock Keeping Unit) */}
                                    <FormGroup className="col-span-12 xl:col-span-6">
                                        <Label>SKU (Stock Keeping Unit)</Label>
                                        <Input
                                            name="sku"
                                            type="text"
                                            defaultValue={data.sku}
                                            readOnly
                                        />
                                    </FormGroup>

                                    {/* Barcode (ISBN, UPC, GTIN, etc) */}
                                    <FormGroup className="col-span-12 xl:col-span-6">
                                        <Label>
                                            Barcode (ISBN, UPC, GTIN, etc)
                                        </Label>
                                        <Input
                                            name="barcode"
                                            type="text"
                                            defaultValue={data.barcode}
                                            readOnly
                                        />

                                    </FormGroup>
                                </CardContent>
                            </Card>


                            {/* Variant */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Variants
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                        <FormGroup className="col-span-12">
                                            <Label> Sizes </Label>
                                            <div className="flex flex-col gap-3">
                                               <div className="flex items-center flex-wrap gap-2 ">
                                                    {data.sizes.map((size, index) => (
                                                        <Badge variant="secondary" className="pr-1" key={index}>
                                                            <span className="pr-2">{size}</span>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </FormGroup>

                                         <FormGroup className="col-span-12">
                                            <Label> Colors </Label>
                                             <div className="flex flex-col gap-3">
                                               <div className="flex items-center flex-wrap gap-2 ">
                                                    {data.colors.map((color, index) => (
                                                        <Badge variant="secondary" className="pr-1" key={index}>
                                                            <span className="pr-2">{color}</span>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                        </FormGroup>

                                </CardContent>
                            </Card>


                            {/* Shipping */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Shipping
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                    {/* is physical product */}
                                    <FormGroup className="col-span-12">
                                        <div className="flex items-center space-x-2">
                                            {data.is_physical_product ?
                                                <IconSquareCheckFilled size={19} className="text-primary" />
                                                : <IconSquareCheck size={19} className="text-muted-foreground" />
                                            }
                                            <Label> This is a physical product </Label>
                                        </div>

                                    </FormGroup>

                                   <div className="col-span-12 grid grid-cols-12 gap-5" style={{display: !data.is_physical_product ? 'none' : 'grid'}}>
                                     {/* Product weight */}
                                    <FormGroup className="col-span-12">
                                        <Label>Weight</Label>
                                        <div className="flex items-start space-x-2.5 sm:w-1/2">
                                            <Input
                                                type="number"
                                                name="product_weight"
                                                defaultValue={data.product_weight}
                                                readOnly
                                            />
                                            <div className="w-full h-10 border rounded-md flex items-center px-3 py-2 text-sm">
                                                {data.product_weight_unit}
                                            </div>
                                        </div>
                                    </FormGroup>

                                    <div className="col-span-12 text-sm text-muted-foreground font-medium">
                                        Dimension (mm)
                                    </div>

                                    {/* Product width */}
                                    <FormGroup className="col-span-6 sm:col-span-4">
                                        <Label>Width</Label>
                                        <Input
                                            type="number"
                                            name="product_width"
                                            defaultValue={data.product_width}
                                            readOnly
                                        />
                                    </FormGroup>

                                    {/* Product Length */}
                                    <FormGroup className="col-span-6 sm:col-span-4">
                                        <Label>Length</Label>
                                        <Input
                                            type="number"
                                            name="product_length"
                                            defaultValue={data.product_length}
                                            readOnly
                                        />
                                    </FormGroup>

                                    {/* Product Height */}
                                    <FormGroup className="col-span-6 sm:col-span-4">
                                        <Label>Height</Label>
                                        <Input
                                            name="product_height"
                                            defaultValue={data.product_height}
                                            type="number"
                                            readOnly
                                        />
                                    </FormGroup>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right section */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="md:sticky md:top-20 md:left-0 inset-0">
                                {/* Product organization */}
                                <Card>
                                    <CardHeader className="p-4 xl:p-6">
                                        <CardTitle className="text-sm text-muted-foreground">
                                            Product organization
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="flex flex-col gap-5 pt-0 px-4 pb-4 xl:px-6 xl:pb-6">
                                        <FormGroup>
                                            <Label>Category</Label>
                                             <div className="w-full h-10 border rounded-md flex items-center px-3 py-2 text-sm">
                                                {categories.find(c => c.id === data.category)?.name}
                                            </div>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Brand</Label>
                                            <div className="w-full h-10 border rounded-md flex items-center px-3 py-2 text-sm">
                                                {brands.find(b => b.id === data.brand)?.name}
                                            </div>
                                        </FormGroup>
                                    </CardContent>
                                </Card>

                                <Card className="mt-5">
                                    <CardHeader className="p-4 xl:p-6">
                                        <CardTitle className="text-sm text-muted-foreground">
                                            Status
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="flex flex-col gap-5 pt-0 px-4 pb-4 xl:px-6 xl:pb-6">
                                         <FormGroup>
                                            <div className="w-full h-10 border rounded-md flex items-center px-3 py-2 text-sm">
                                                {_.startCase(data.status)}
                                            </div>
                                        </FormGroup>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
