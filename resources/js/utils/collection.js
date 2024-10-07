class Image {
    constructor(image) {
        this.id = image?.id;
        this.url = image?.image_url;
        this.imageable = {
            id: image?.imageable_id,
            type: image?.imageable_type,
        };
        this.updatedAt = image?.updated_at;
        this.createdAt = image?.created_at;
    }
}

export class Item {
    constructor(item) {
        this.id = item?.itemable_id;
        this.name = item?.itemable?.product_name;
        this.description = item?.itemable?.product_description;
        this.galleries = item?.itemable?.product_images?.map(
            (img) => new Image(img),
        );
        this.itemable = {
            id: item?.itemable_id,
            type: item?.itemable_type,
            collection_id: item?.collection_id,
        };
    }
}

export class Collection {
    constructor(collection) {
        this.id = collection?.id;
        this.name = collection?.name;
        this.slug = collection?.slug;
        this.image = new Image(collection?.image);
        this.isActive = collection?.is_active;
        this.description = collection?.description;
        this.updatedAt = collection?.updated_at;
        this.createdAt = collection?.createdAt;
        this.items = collection?.items?.map((item) => new Item(item));
    }
}
