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
}
