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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = require("../model/orderModel");
const productModel_1 = require("../model/productModel");
const utils_1 = require("../utils");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get('/mine/:userId', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.OrderModel.find({ user: req.params.userId });
    res.json(orders);
})));
exports.orderRouter.get('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.OrderModel.find({});
    res.json(orders);
})));
exports.orderRouter.get(
// /api/orders/:id
'/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: 'Cart is empty' });
    }
    else {
        const createdOrder = yield orderModel_1.OrderModel.create({
            orderItems: req.body.orderItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id }))),
            shippingAddress: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.body.user._id,
        });
        res.status(201).json({ message: 'Order Created', order: createdOrder });
    }
})));
exports.orderRouter.put('/:id/pay', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        order.status = 'in progress';
        const orderItems = order.orderItems;
        const updatedOrder = yield order.save();
        yield Promise.all(orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield productModel_1.ProductModel.findById(item.product);
            if (product) {
                product.countInStock -= item.quantity;
                yield product.save();
            }
        })));
        res.send({ order: updatedOrder, message: 'Order Paid Successfully' });
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.delete('/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield orderModel_1.OrderModel.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: 'deleted' });
})));
exports.orderRouter.put('/update-status', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkedIds = req.body.orderCheckedBoxes;
    yield orderModel_1.OrderModel.updateMany({ '_id': { $in: checkedIds.map((id) => id) } }, { 'status': req.body.status });
    res.send('updated Status');
})));
