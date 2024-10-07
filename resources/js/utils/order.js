import { Currency } from "./currency";

export class Customer {
    constructor(customer) {
        this.name = customer?.name;
        this.email = customer?.email;
        this.phone = customer?.phone;
    }
}

export class Order {
    constructor(order) {
        this.id = order?.id;
        this.invoice = order?.invoice;
        this.status = order?.status;
        this.total = order?.total;
        this.products = order?.items;
        this.paymentDetails = order?.payment_details;
        this.shippingAddress = order?.shipping_address;
        this.billingAddress = order?.billing_address;
        this.customer = order?.user;
        this.createdAt = order?.created_at;
        this.updatedAt = order?.updated_at;
    }

    getTotalProducts() {
        return this.products?.length ?? 0;
    }

    getInvoice() {
        return this.invoice;
    }

    getPaymentStatus() {
        const status = !!this.paymentDetails;
        return {
            status: status ? "Paid" : "Pending",
            background: status ? "#cdf1d8" : "#fff9e6",
            foreground: status ? "#069632" : "#b38900",
        };
    }

    getSubTotalPrice(currencyCode = "BDT") {
        const total = this.products?.reduce((sum, curr) => {
            const price = Number(curr?.product?.price) || 0;
            const quantity = Number(curr?.quantity) || 0;
            return sum + price * quantity;
        }, 0);

        const currency = new Currency(currencyCode);

        return {
            total,
            formatted: currency.format(total),
        };
    }

    // delivery cost
    getDeliveryCost(currencyCode = "BDT") {
        const currency = new Currency(currencyCode);

        const cost = 50;

        return {
            total: cost,
            formatted: currency.format(cost),
        };
    }

    getTotalCost(currencyCode = "BDT") {
        const currency = new Currency(currencyCode);

        const subTotal = this.getSubTotalPrice(currencyCode).total;
        const deliveryCost = this.getDeliveryCost(currencyCode).total;

        const total = subTotal + deliveryCost;

        return {
            total,
            formatted: currency.format(total),
        };
    }
}
