"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = require("../model/productModel");
exports.productRouter = express_1.default.Router();
// /api/prodcuts
exports.productRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, priceMin, priceMax, rating } = req.query;
    const filters = {};
    if (category && typeof category === 'string') {
        const arrayCate = category.split('-');
        filters.category = { $in: arrayCate };
    }
    if (priceMax && priceMin) {
        filters.price = { $gte: Number(priceMin), $lte: Number(priceMax) };
    }
    if (rating) {
        filters.rating = { $gte: Number(rating) };
    }
    const products = yield productModel_1.ProductModel.find(filters).lean();
    res.json(products.reverse());
})));
exports.productRouter.get('/categories', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield productModel_1.ProductModel.find().distinct('category').lean();
    res.json(categories);
})));
// /api/slug/tshirt
exports.productRouter.get('/slug/:slug', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.ProductModel.findOne({ slug: req.params.slug }).lean();
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Product Not Found' });
    }
})));
exports.productRouter.get('/search', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand, category } = req.query;
    const filter = {
        $or: [
            { name: { $regex: `.*${name}.*`, $options: 'i' } },
            { brand: { $regex: `.*${brand}.*`, $options: 'i' } },
            { category: { $regex: `.*${category}.*`, $options: 'i' } },
        ],
    };
    const products = yield productModel_1.ProductModel.find(filter).lean();
    res.json(products);
})));
exports.productRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.ProductModel.create({
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        slug: req.body.slug,
        price: req.body.price,
        previousPrice: req.body.previousPrice,
        shippingPrice: req.body.shippingPrice,
        description: req.body.description,
        image: req.body.image,
        countInStock: req.body.countInStock,
    });
    res.json(product);
})));
exports.productRouter.put('/:slug', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.ProductModel.findOne({ slug: req.params.slug });
    if (product) {
        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.slug = req.body.slug || product.slug;
        product.price = req.body.price || product.price;
        product.previousPrice = req.body.previousPrice || product.previousPrice;
        product.shippingPrice = req.body.shippingPrice || product.shippingPrice;
        product.description = req.body.description || product.description;
        product.image = req.body.image || product.image;
        product.countInStock = req.body.countInStock || product.countInStock;
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
})));
exports.productRouter.delete('/delete/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.ProductModel.findByIdAndDelete(req.params.id);
    res.send('deleted product');
})));
