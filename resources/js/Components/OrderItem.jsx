import { Currency } from "@/utils/currency";
import { Product } from "@/utils/product.js";
import { Link } from "@inertiajs/react";

export function OrderItem({ item, ...props }) {
    const currency = new Currency("BDT");

    const product = new Product(item.product);

    if (!product) return null;

    const total = currency.format(
        Number(Number(product?.price?.amount) * Number(item.quantity)).toFixed(
            2
        )
    );

    return (
        <div className="grid grid-cols-12 items-center gap-4 py-2.5 border-b border-dashed even:bg-neutral-50 px-3.5 text-sm">
            <div className="col-span-6 flex items-center gap-4 pl-5">
                {/*   Order Image */}
                <div className="w-10 aspect-square rounded-lg bg-foreground/10">
                    {/*image here...*/}
                </div>

                <div>
                    <Link
                        href={route("product.view", {
                            product_id: product.id,
                        })}
                        className="text-sm"
                    >
                        {product.name}
                    </Link>
                </div>
            </div>

            <div className="col-span-2 text-right">
                <span className="block">Size: XL</span>
                <span className="block">Color: Red</span>
            </div>

            <div className="col-span-2 text-right">
                {item.quantity}
                <span className=""> x </span>
                {product.getPrice().formatted}
            </div>

            <div className="col-span-2 text-right">
                <span>{total}</span>
            </div>
        </div>
    );
}
