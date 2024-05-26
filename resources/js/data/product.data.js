import { faker } from "@faker-js/faker";

export const productData = (n = 10) => {
    const data = [];

    for (let i = 0; i < n; i++) {
        data.push({
            id: faker.commerce.isbn({ variant: 10 }),
            name: faker.commerce.productName(),
            handler: faker.commerce
                .productName()
                .toLowerCase()
                .split(" ")
                .join("_"),
            price: {
                amount: Number(faker.commerce.price({ symbol: "" })),
                currency_code: "USD",
            },
            images: [],
            description: faker.commerce.productDescription(),
            stock_quantity: faker.number.int({ min: 0, max: 100 }),
            stock_quantity_unit: "",
            categories: [
                {
                    id: faker.string.uuid(),
                    name: faker.commerce.department(),
                    handler: faker.commerce
                        .department()
                        .toLowerCase()
                        .split(" ")
                        .join("_"),
                    description: faker.commerce.productDescription(),
                },
                {
                    id: faker.string.uuid(),
                    name: faker.commerce.department(),
                    handler: faker.commerce
                        .department()
                        .toLowerCase()
                        .split(" ")
                        .join("_"),
                    description: faker.commerce.productDescription(),
                },
            ],
            reviews: {
                ratings: [],
                totalReviews: 250,
                totalRatings:
                    250 * Number(faker.number.float({ min: 0, max: 5 })),
                averageRating: Number(
                    (250 * Number(faker.number.float({ min: 0, max: 5 }))) / 250
                ).toFixed(2),
            },
        });
    }

    return data;
};

export const categoriesData = (n = 15) => {
    const data = [];
    for (let i = 0; i < n; i++) {
        data.push({
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            handler: faker.commerce
                .department()
                .toLowerCase()
                .split(" ")
                .join("_"),
            description: faker.commerce.productDescription(),
        });
    }

    return data;
};

export const units = [
    {
        shortName: "Piece",
        longName: "Piece",
        symbol: "pcs",
    },
    {
        shortName: "Box",
        longName: "Box",
        symbol: "box",
    },
    {
        shortName: "Set",
        longName: "Set",
        symbol: "set",
    },
    {
        shortName: "Packet",
        longName: "Packet",
        symbol: "pkt",
    },
    {
        shortName: "Dozen",
        longName: "Dozen",
        symbol: "doz",
    },
    {
        shortName: "Carton",
        longName: "Carton",
        symbol: "ctn",
    },
    {
        shortName: "Bundle",
        longName: "Bundle",
        symbol: "bdl",
    },
    {
        shortName: "Case",
        longName: "Case",
        symbol: "case",
    },
    {
        shortName: "Meter",
        longName: "Meter",
        symbol: "m",
    },
    {
        shortName: "Liter",
        longName: "Liter",
        symbol: "L",
    },
    {
        shortName: "Kilogram",
        longName: "Kilogram",
        symbol: "kg",
    },
    {
        shortName: "Gallon",
        longName: "Gallon",
        symbol: "gal",
    },
];

export const categories = [
    {
        name: "Electronics",
        subcategories: [
            {
                name: "Computers & Laptops",
                subcategories: [
                    "Laptops",
                    "Desktops",
                    "Monitors",
                    "Accessories",
                ],
            },
            {
                name: "Smartphones & Tablets",
                subcategories: ["Smartphones", "Tablets", "Accessories"],
            },
            {
                name: "TVs & Home Entertainment",
                subcategories: [
                    "Televisions",
                    "Home Theater Systems",
                    "DVD & Blu-ray Players",
                    "Accessories",
                ],
            },
            "Cameras & Photography",
            "Audio & Headphones",
            "Accessories",
        ],
    },
    {
        name: "Fashion",
        subcategories: [
            {
                name: "Men's Clothing",
                subcategories: [
                    "Shirts",
                    "Pants",
                    "Suits & Blazers",
                    "Accessories",
                ],
            },
            {
                name: "Women's Clothing",
                subcategories: [
                    "Tops & Tees",
                    "Dresses",
                    "Skirts",
                    "Accessories",
                ],
            },
            {
                name: "Kids & Babies",
                subcategories: [
                    "Boys Clothing",
                    "Girls Clothing",
                    "Baby Clothing",
                    "Accessories",
                ],
            },
            "Shoes & Footwear",
            "Accessories",
            "Bags & Luggage",
        ],
    },
    {
        name: "Home & Furniture",
        subcategories: [
            {
                name: "Furniture",
                subcategories: [
                    "Living Room Furniture",
                    "Bedroom Furniture",
                    "Kitchen & Dining Furniture",
                    "Office Furniture",
                ],
            },
            {
                name: "Home Decor",
                subcategories: [
                    "Wall Decor",
                    "Candles & Holders",
                    "Mirrors",
                    "Rugs & Carpets",
                ],
            },
            {
                name: "Kitchen & Dining",
                subcategories: [
                    "Cookware",
                    "Tableware",
                    "Small Appliances",
                    "Storage & Organization",
                ],
            },
            "Bedding & Bath",
            "Lighting",
            "Storage & Organization",
        ],
    },
    {
        name: "Beauty & Personal Care",
        subcategories: [
            {
                name: "Skincare",
                subcategories: [
                    "Cleansers",
                    "Moisturizers",
                    "Serums & Treatments",
                    "Sun Protection",
                ],
            },
            {
                name: "Makeup",
                subcategories: [
                    "Foundation",
                    "Lipstick",
                    "Eyeshadow",
                    "Mascara",
                ],
            },
            {
                name: "Haircare",
                subcategories: [
                    "Shampoo & Conditioner",
                    "Styling Products",
                    "Hair Color",
                    "Hair Tools",
                ],
            },
            "Fragrances",
            "Personal Care Appliances",
            "Men's Grooming",
        ],
    },
    {
        name: "Sports & Outdoors",
        subcategories: [
            {
                name: "Exercise & Fitness",
                subcategories: [
                    "Cardio Equipment",
                    "Strength Training",
                    "Yoga & Pilates",
                    "Accessories",
                ],
            },
            {
                name: "Outdoor Recreation",
                subcategories: [
                    "Camping & Hiking",
                    "Fishing",
                    "Cycling",
                    "Water Sports",
                ],
            },
            {
                name: "Sports Equipment",
                subcategories: ["Basketball", "Soccer", "Tennis", "Golf"],
            },
            "Camping & Hiking",
            "Biking",
            "Team Sports",
        ],
    },
    {
        name: "Toys & Games",
        subcategories: [
            {
                name: "Action Figures & Collectibles",
                subcategories: [
                    "Superheroes",
                    "Anime",
                    "Movie Characters",
                    "Accessories",
                ],
            },
            {
                name: "Dolls & Accessories",
                subcategories: [
                    "Barbie",
                    "Fashion Dolls",
                    "Dollhouses",
                    "Accessories",
                ],
            },
            {
                name: "Building Toys",
                subcategories: [
                    "LEGO",
                    "Blocks",
                    "Model Kits",
                    "Construction Sets",
                ],
            },
            "Board Games & Puzzles",
            "Outdoor Play",
            "Educational Toys",
        ],
    },
    {
        name: "Books & Media",
        subcategories: [
            {
                name: "Books",
                subcategories: [
                    "Fiction",
                    "Non-fiction",
                    "Children's Books",
                    "Best Sellers",
                ],
            },
            {
                name: "Movies",
                subcategories: [
                    "Action & Adventure",
                    "Comedy",
                    "Drama",
                    "Documentary",
                ],
            },
            {
                name: "Music",
                subcategories: ["Rock", "Pop", "Hip Hop", "Classical"],
            },
            "Magazines",
            "E-books",
            "Audiobooks",
        ],
    },
];
