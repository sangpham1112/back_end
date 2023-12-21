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
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils");
const commentModel_1 = require("../model/commentModel");
const productModel_1 = require("../model/productModel");
exports.commentRouter = express_1.default.Router();
exports.commentRouter.get('/:slug', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield commentModel_1.CommentModel.find({ slug: req.params.slug });
    if (comments) {
        res.json(comments.reverse());
    }
    else {
        res.status(404).json({ message: 'Comments Not Found' });
    }
})));
exports.commentRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = new commentModel_1.CommentModel({
        username: req.body.username,
        slug: req.body.slug,
        text: req.body.text,
        rating: req.body.rating,
    });
    yield comment.save();
    const product = yield productModel_1.ProductModel.findOne({ slug: req.body.slug });
    const reviews = yield commentModel_1.CommentModel.find({ slug: req.body.slug });
    if (product && reviews) {
        const count = reviews.length;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = count > 0 ? sum / count : 0;
        product.numReviews = count;
        product.rating = avgRating;
        yield product.save();
    }
    res.status(201).json({ message: 'Comment Created', product });
})));
