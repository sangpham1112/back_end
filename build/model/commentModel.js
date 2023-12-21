"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    slug: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)('Comment', CommentSchema);
