import { Order } from "./order";

class Address {
    constructor(address) {
        this.city = address?.city;
        this.street = address?.street;
        this.state = address?.state;
        this.country = address?.country;
        this.postalCode = address?.postal_code;
        this.id = address?.id;
        this.isDefault = address?.is_default;
    }

    getAddressString() {
        return `${this.street}, ${this.city} ${this.postalCode} ${this.state}, ${this.country}`;
    }
}

export class Customer {
    constructor(customer) {
        this.id = customer?.id;
        this.name = customer?.name;
        this.email = customer?.email;
        this.role = customer?.role;
        this.createdAt = customer?.created_at;
        this.updatedAt = customer?.updated_at;
        this.profile = customer?.profile;
        this.address = customer?.address?.map(
            (address) => new Address(address),
        );

        this.orders = customer?.orders?.map((order) => new Order(order));
    }
}
