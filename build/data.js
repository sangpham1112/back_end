"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUsers = exports.sampleProducts = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.sampleProducts = [
    {
        name: 'Nike Slim shirt',
        slug: 'nike-slim-shirt',
        category: 'Shirts',
        image: '../images/p1.jpg',
        price: 120,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality shirt',
        shippingPrice: 20,
        previousPrice: 240
    },
    {
        name: 'Adidas Fit Shirt',
        slug: 'adidas-fit-shirt',
        category: 'Shirts',
        image: '../images/p2.jpg',
        price: 100,
        countInStock: 20,
        brand: 'Adidas',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
        shippingPrice: 10,
        previousPrice: 140
    },
    {
        name: 'Lacoste Free Pants',
        slug: 'lacoste-free-pants',
        category: 'Pants',
        image: '../images/p3.jpg',
        price: 220,
        countInStock: 0,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
        shippingPrice: 0,
        previousPrice: 0
    },
    {
        name: 'Nike Slim Pant',
        slug: 'nike-slim-pant',
        category: 'Pants',
        image: '../images/p4.jpg',
        price: 78,
        countInStock: 15,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
        shippingPrice: 10,
        previousPrice: 100
    },
    {
        name: 'adidas shoes',
        slug: 'adidas-shoes',
        category: 'Shoes',
        image: '../images/p1.jpg',
        price: 90,
        countInStock: 15,
        brand: 'adidas',
        rating: 4,
        numReviews: 13,
        description: 'high quality product',
        shippingPrice: 10,
        previousPrice: 100
    },
    {
        name: 'nike shoes',
        slug: 'nike-shoes',
        category: 'Shoes',
        image: '../images/p3.jpg',
        price: 90,
        countInStock: 15,
        brand: 'nike',
        rating: 4,
        numReviews: 13,
        description: 'high quality product',
        shippingPrice: 10,
        previousPrice: 100
    },
    {
        name: 'Louis Vuiton shirt',
        slug: 'lv-shirt',
        category: 'Shirts',
        image: '../images/p2.jpg',
        price: 90,
        countInStock: 10,
        brand: 'nike',
        rating: 4,
        numReviews: 13,
        description: 'high quality product',
        shippingPrice: 10,
        previousPrice: 100
    },
];
exports.sampleUsers = [
    {
        name: 'Joe',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'John',
        email: 'user@example.com',
        password: bcryptjs_1.default.hashSync('123456'),
        isAdmin: false,
    },
];
