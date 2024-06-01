

export class Product{
    constructor(product){
        this.id = product?.id;
        this.uuid = product?.uuid;
        this.name = product?.name;
        this.slug = product?.slug;
        this.description = product?.description;
        this.currencyCode = "BDT";
        this.price = {
            amount: product?.price,
            currencyCode: this.currencyCode,
        },
        this.compare_price = {
            amount: product?.compare_price,
            currencyCode: this.currencyCode,
        };

        this.cost_per_item = {
            amount: product?.cost_per_item,
            currencyCode: this.currencyCode,
        };

        this.inventory = {
            stock: product?.stock,
            stock_unit: product?.stock_unit,
            out_of_stock_selling: product?.out_of_stock_selling,
            sku: product?.sku,
            barcode: product?.barcode,
        };

        this.category = product?.category;
        this.brand = product?.brand;

        this.shipping = {
            is_physical_product: product?.is_physical_product,
            weight: product?.weight,
            length: product?.['length'],
            width: product?.weight,
            height: product?.height,
        };

        this.status = product?.status;
        this.variants = {
            sizes: product?.sizes,
            colors: product?.colors,
        };
        this.reviews = product?.reviews;
    }


    getTotalReviews(){
        return this.reviews.length;
    }


    getTotalRating(){
        if(this.getTotalReviews() === 0 ) return 0;

        return this.reviews.reduce((sum, review)=> {
            sum + Number(review.rating)
        }, 0);
    }


    getAverageRating(){

        if(this.getTotalReviews() > 0){
            return Number(this.getTotalRating() / this.getTotalReviews()).toFixed(2);
        }

        return 0;
    }
}
