"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String, require: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
});
const ShippingAddressSchema = new mongoose_1.Schema({
    fullName: { type: String },
    address: { type: String },
    phone: { type: String },
    lat: { type: Number },
    lng: { type: Number },
});
const OrderSchema = new mongoose_1.Schema({
    orderItems: [ItemSchema],
    shippingAddress: ShippingAddressSchema,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true, default: 'pending' },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
