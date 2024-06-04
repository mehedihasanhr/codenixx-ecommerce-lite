import { BrandSelection } from "@/Components/BrandSelection";
import { CategorySelection } from "@/Components/CategorySelection";
import TextEditor from "@/Components/editor";
import { FormGroup } from "@/Components/FormGroup";
import { ImageUpload } from "@/Components/ImageUpload";
import { InputError } from "@/Components/InputError";
import PriceInputField from "@/Components/PriceInput";
import { SizeInput } from "@/Components/SizeInput";
import { Badge } from "@/Components/ui/badge";
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
import { Cross1Icon, Cross2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { IconArrowLeft } from "@tabler/icons-react";
import { toast } from "sonner";

export default function ProductEdit({ product, categories, brands }) {

    const { data, setData, post, errors, processing } = useForm({
        name: product.name,
        description: product.description,
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
        galleries: product.galleries,
        files: []
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
        console.log({data})
        post(route('product.update', {product_id: product.id}), {
            _method: 'patch',
            onSuccess: () => {
                toast.success("Product Updated Successfully")
            }
        })
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
                        <Link href={route("adminpanel.products")}>
                            <IconArrowLeft size={15} />
                        </Link>
                    </Button>
                    <h2>Product</h2>
                </div>

                <form onSubmit={onSubmit}>
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
                                            value={data.name}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.name} />
                                    </FormGroup>

                                    {/* description */}
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <TextEditor
                                            defaultValue={data.description}
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

                                <CardContent className="grid grid-cols-12 gap-5">
                                     {data.galleries.map((file, index) => (
                                        <div
                                            key={index}
                                            className="col-span-4 relative w-full rounded-lg group aspect-square border"
                                        >
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon-sm"
                                                className="rounded-full absolute right-1 top-1 shadow-md items-center justify-center hidden group-hover:flex"
                                                asChild
                                            >
                                                <Link href={route('gallery.remove', {gallery_id: file.id})} method="delete">
                                                    <Cross2Icon />
                                                </Link>
                                            </Button>
                                            <img
                                                src={file.image_url}
                                                alt=""
                                                width={150}
                                                height={150}
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                        </div>
                                    ))}
                                     <ImageUpload
                                        files={data.files}
                                        setFiles={(files) => setData(prev => ({...prev, files}))}
                                    />
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
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, price: value}))}
                                        />
                                        <InputError message={errors.price} />
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
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, compare_price: value}))}
                                        />
                                        <InputError message={errors.compare_price}/>
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
                                            onChange={handleChange}
                                            currencyCode="BDT"
                                            onBlur={(value) => setData((prev) => ({...prev, cost_per_item: value}))}
                                        />
                                        <InputError message={errors.cost_per_item}/>
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
                                                value={data.stock}
                                                onChange={handleChange}
                                            />
                                            <InputError message={errors.stock}/>
                                        </FormGroup>

                                        {/* Unit */}
                                        <FormGroup className="col-span-4">
                                            <Label>Unit</Label>
                                            <Select
                                                defaultValue={data.stock_unit}
                                                onValueChange={value => {
                                                    setData(prev => ({...prev, stock_unit: value}))
                                                }}
                                            >
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
                                                message={errors.stock}
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
                                        <InputError message={errors.stock} />
                                    </FormGroup>

                                    {/* SKU (Stock Keeping Unit) */}
                                    <FormGroup className="col-span-12 xl:col-span-6">
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
                                    <FormGroup className="col-span-12 xl:col-span-6">
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
                                        Variants
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grid grid-cols-12 gap-5">
                                        <FormGroup className="col-span-12">
                                            <Label> Sizes </Label>
                                            <div className="flex flex-col gap-3">
                                               <SizeInput onTab={value => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        sizes: [...prev.sizes, value]
                                                    }))
                                               }} />

                                               <div className="flex items-center flex-wrap gap-2 ">
                                                    {data.sizes.map((size, index) => (
                                                        <Badge variant="secondary" className="pr-1" key={index}>
                                                            <span className="pr-2">{size}</span>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className='w-4 h-4 hover:bg-destructive hover:text-destructive-foreground'
                                                                onClick={() => {
                                                                    setData(prev => ({
                                                                        ...prev,
                                                                        sizes: prev.sizes.filter(s => s !== size)
                                                                    }))
                                                                }}
                                                            >
                                                                <Cross1Icon className="w-2.5 h-2.5"/>
                                                            </Button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <InputError message={errors.sizes}/>
                                        </FormGroup>

                                         <FormGroup className="col-span-12">
                                            <Label> Colors </Label>
                                             <div className="flex flex-col gap-3">

                                               <SizeInput onTab={value => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        colors: [...prev.colors, value]
                                                    }))
                                               }} />

                                               <div className="flex items-center flex-wrap gap-2 ">
                                                    {data.colors.map((color, index) => (
                                                        <Badge variant="secondary" className="pr-1" key={index}>
                                                            <span className="pr-2">{color}</span>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className='w-4 h-4 hover:bg-destructive hover:text-destructive-foreground'
                                                                onClick={() => {
                                                                    setData(prev => ({
                                                                        ...prev,
                                                                        colors: prev.colors.filter(c => c !== color)
                                                                    }))
                                                                }}
                                                            >
                                                                <Cross1Icon className="w-2.5 h-2.5"/>
                                                            </Button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <InputError message={errors.colors}/>
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
                                                checked={data.is_physical_product}
                                                onCheckedChange={(checked) => {
                                                    setData((prev) => ({
                                                        ...prev,
                                                        is_physical_product: checked,
                                                    }));
                                                }}
                                            />
                                            <Label> This is a physical product </Label>
                                        </div>
                                        <InputError message={errors.is_physical_product}/>
                                    </FormGroup>

                                   <div className="col-span-12 grid grid-cols-12 gap-5" style={{opacity: !data.is_physical_product ? '0.8' : '1'}}>
                                     {/* Product weight */}
                                    <FormGroup className="col-span-12">
                                        <Label>Weight</Label>
                                        <div className="flex items-start space-x-2.5 sm:w-1/2">
                                            <Input
                                                type="number"
                                                name="product_weight"
                                                value={data.product_weight}
                                                onChange={handleChange}
                                                disabled={!data.is_physical_product}
                                            />
                                            <Select
                                                defaultValue={data.product_weight_unit}
                                                onValueChange={currentValue => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        product_weight_unit: currentValue
                                                    }))
                                                }}
                                            >
                                                <SelectTrigger className="w-24" disabled={!data.is_physical_product} >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["kg","lb","oz","g"].map((item) => (
                                                        <SelectItem key={item} value={item}> {item} </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <InputError message={errors.product_weight} />
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
                                            value={data.product_width}
                                            onChange={handleChange}
                                            disabled={!data.is_physical_product}
                                        />
                                        <InputError message={errors.product_width} />
                                    </FormGroup>

                                    {/* Product Length */}
                                    <FormGroup className="col-span-6 sm:col-span-4">
                                        <Label>Length</Label>
                                        <Input
                                            type="number"
                                            name="product_length"
                                            value={data.product_length}
                                            onChange={handleChange}
                                            disabled={!data.is_physical_product}
                                        />
                                        <InputError message={errors.product_length} />
                                    </FormGroup>

                                    {/* Product Height */}
                                    <FormGroup className="col-span-6 sm:col-span-4">
                                        <Label>Height</Label>
                                        <Input
                                            name="product_height"
                                            value={data.product_height}
                                            onChange={handleChange}
                                            type="number"
                                            disabled={!data.is_physical_product}
                                        />
                                        <InputError message={errors.product_height} />
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
                                    <div className="grid grid-cols-12 items-center gap-3">
                                        <Select defaultValue={data.status} onValueChange={value => {
                                            setData(prev => ({...prev, status: value}))
                                        }}>
                                            <SelectTrigger className="col-span-12 xl:col-span-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="drafted" > Draft </SelectItem>
                                                <SelectItem value="published" > Publish </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            size="sm"
                                            type="submit"
                                            disabled={processing}
                                            className="h-10 col-span-12 xl:col-span-4"
                                        >
                                            {processing ? 'Processing...' : 'Update'}
                                        </Button>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
