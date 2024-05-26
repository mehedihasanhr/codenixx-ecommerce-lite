import { BrandSelection } from "@/Components/BrandSelection";
import { CategorySelection } from "@/Components/CategorySelection";
import TextEditor from "@/Components/editor";
import { FormGroup } from "@/Components/FormGroup";
import { ImageGallery } from "@/Components/ImageGallery";
import { InputError } from "@/Components/InputError";
import PriceInputField from "@/Components/PriceInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/Components/ui/hover-card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { units } from "@/data/product.data";
import AdminLayout from "@/Layouts/AdminLayout";
import { Currency } from "@/utils/currency";
import { Link, useForm } from "@inertiajs/react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { IconArrowLeft, IconPhotoPlus } from "@tabler/icons-react";

export default function ProductCreate({ categories, brands }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        price: "",
        compare_price: "",
        cost_per_item: "",
        quantity: 0,
        quantity_unit: "",
        category: "",
        brand: "",
        out_of_stock_selling: false,
        sku: "",
        barcode: "",
        physical_product: false,
        product_weight: 0,
        product_height: 0,
        product_width: 0,
        product_length: 0,
        publish_status: false,
        variants: {
            colors: [],
            sizes: [],
        }
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData((previousData) => ({
            ...previousData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ data });
    };

    // calculate profit
    const profit = () => {
        const _profit = Number(data.price) - Number(data.cost_per_item);
        return _profit;
    };

    return (
        <AdminLayout>
            <div className="p-8 m-8 rounded-lg w-full max-w-5xl flex flex-col mx-auto gap-5">
                <div className="flex items-center space-x-2.5">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route("dashboard.products")}>
                            <IconArrowLeft size={15} />
                        </Link>
                    </Button>
                    <h2>Product</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-12 gap-5">
                        {/* Left section */}
                        <div className="col-span-8 flex flex-col gap-5">
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
                                            value={data.name}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.name} />
                                    </FormGroup>

                                    {/* description */}
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <TextEditor
                                            defaultValue={data?.description ? JSON.parse(data?.description) : undefined}
                                            onChange={(value) => setData((prev) => ({...prev, description: value}))}
                                        />
                                        <InputError message={errors.description} />
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

                                <CardContent className="grid grid-cols-3">
                                    {/* Upload Media */}
                                    <ImageGallery>
                                        <div className="col-span-1 aspect-square w-full border-2 border-dashed hover:border-primary/50 rounded-md flex flex-col items-center justify-center">
                                            <IconPhotoPlus
                                                size={43}
                                                stroke={1.2}
                                                opacity={0.3}
                                            />
                                        </div>
                                    </ImageGallery>
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
                                    <FormGroup className="col-span-6">
                                        <Label>Price</Label>
                                        <PriceInputField
                                            name="price"
                                            value={data.price}
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, price: value}))}
                                        />
                                        <InputError message={errors.price} />
                                    </FormGroup>

                                    <FormGroup className="col-span-6">
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
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, compare_price: value}))}
                                        />
                                        <InputError message={errors.compare_price}/>
                                    </FormGroup>

                                    <FormGroup className="col-span-4">
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
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, cost_per_item: value}))}
                                        />
                                        <InputError message={errors.cost_per_item}/>
                                    </FormGroup>

                                    <FormGroup className="col-span-4">
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
                                        {/* Quantity */}
                                        <FormGroup className="col-span-8">
                                            <Label>Quantity</Label>
                                            <Input
                                                name="quantity"
                                                type="number"
                                                min="0"
                                                value={data.quantity}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.quantity}/>
                                        </FormGroup>

                                        {/* Unit */}
                                        <FormGroup className="col-span-4">
                                            <Label>Unit</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {units.map(
                                                        (unit, index) => (
                                                            <SelectItem value={unit.symbol} key={index} >
                                                               {`${unit.longName} (${unit.symbol})`}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={errors.quantity}
                                            />
                                        </FormGroup>
                                    </div>

                                    {/* Continue selling when out of stock */}
                                    <FormGroup className="col-span-12 mb-2.5">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                name="out_of_stock_selling"
                                                id="continueSelling"
                                                checked={ data.out_of_stock_selling }
                                                onCheckedChange={( checkStatus ) =>
                                                    setData((prev) => ({...prev, out_of_stock_selling: checkStatus }))
                                                }
                                            />
                                            <Label htmlFor="continueSelling">
                                                Continue selling when out of stock
                                            </Label>
                                        </div>
                                        <InputError message={errors.quantity} />
                                    </FormGroup>

                                    {/* SKU (Stock Keeping Unit) */}
                                    <FormGroup className="col-span-6">
                                        <Label>SKU (Stock Keeping Unit)</Label>
                                        <Input
                                            name="sku"
                                            type="text"
                                            value={data.sku}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.sku} />
                                    </FormGroup>

                                    {/* Barcode (ISBN, UPC, GTIN, etc) */}
                                    <FormGroup className="col-span-6">
                                        <Label>
                                            Barcode (ISBN, UPC, GTIN, etc)
                                        </Label>
                                        <Input
                                            name="barcode"
                                            type="text"
                                            value={data.barcode}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.barcode} />
                                    </FormGroup>
                                </CardContent>
                            </Card>


                            {/* Variant */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Variant
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                        <FormGroup className="col-span-8">
                                            <Label> Size </Label>
                                            <div>
                                                {data.variants.sizes.map((size, index) => (
                                                    <span key={index}>{size}</span>
                                                ))}
                                                <Input type="Text" placeholder="Press tab to insert" />
                                            </div>
                                            <InputError message={errors.quantity}/>
                                        </FormGroup>

                                         <FormGroup className="col-span-8">
                                            <Label> Color </Label>
                                            <Input
                                                name="quantity"
                                                type="number"
                                                min="0"
                                                value={data.quantity}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.quantity}/>
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
                                            <Checkbox
                                                checked={data.physical_product}
                                                onCheckedChange={(checked) => {
                                                    setData((prev) => ({
                                                        ...prev,
                                                        physical_product: checked,
                                                    }));
                                                }}
                                            />
                                            <Label> This is a physical product </Label>
                                        </div>
                                        <InputError message={data.physical_product}/>
                                    </FormGroup>

                                   <div className="col-span-12 grid grid-cols-12 gap-5" style={{opacity: !data.physical_product ? '0.8' : '1'}}>
                                     {/* Product weight */}
                                    <FormGroup className="col-span-12">
                                        <Label>Weight</Label>
                                        <div className="flex items-start space-x-2.5 w-1/2">
                                            <Input type="number" disabled={!data.physical_product} />
                                            <Select defaultValue="kg">
                                                <SelectTrigger className="w-24" disabled={!data.physical_product} >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["kg","lb","oz","g"].map((item) => (
                                                        <SelectItem key={item} value={item}> {item} </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <InputError message={data.product_weight} />
                                    </FormGroup>

                                    <div className="col-span-12 text-sm text-muted-foreground font-medium">
                                        Dimension (mm)
                                    </div>

                                    {/* Product width */}
                                    <FormGroup className="col-span-4">
                                        <Label>Width</Label>
                                        <Input type="number" disabled={!data.physical_product} />
                                        <InputError message={data.product_width} />
                                    </FormGroup>

                                    {/* Product Length */}
                                    <FormGroup className="col-span-4">
                                        <Label>Length</Label>
                                        <Input type="number" disabled={!data.physical_product} />
                                        <InputError message={data.product_length} />
                                    </FormGroup>

                                    {/* Product Height */}
                                    <FormGroup className="col-span-4">
                                        <Label>Height</Label>
                                        <Input type="number" disabled={!data.physical_product} />
                                        <InputError message={data.product_height} />
                                    </FormGroup>
                                   </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right section */}
                        <div className="col-span-4">
                            {/* Product organization */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm text-muted-foreground">
                                        Product organization
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-5">
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <CategorySelection
                                            name="category"
                                            value={data.category}
                                            onChange={(value) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    category: value,
                                                }))
                                            }
                                            categories={categories}
                                        />
                                        <InputError message={errors.name} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Brand</Label>
                                        <BrandSelection
                                            brands={brands}
                                            value={data.brand}
                                            onChange={(value) => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    brand: value,
                                                }));
                                            }}
                                        />
                                        <InputError message={errors.name} />
                                    </FormGroup>
                                </CardContent>
                            </Card>

                            <FormGroup className="mt-5">
                                <Label>Status</Label>
                                <div className="flex items-center gap-3">
                                    <Select defaultValue="publish">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value="draft"
                                                onSelected={currentValue => setData(prev => ({...prev, publish_status: currentValue}))}
                                            >
                                                Draft
                                            </SelectItem>
                                            <SelectItem
                                                value="publish"
                                                onSelected={currentValue => setData(prev => ({...prev, publish_status: currentValue}))}
                                            >
                                                Publish
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        size="sm"
                                        type="submit"
                                        className="h-10"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
