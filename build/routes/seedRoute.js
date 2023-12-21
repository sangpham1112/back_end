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
exports.seedRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const data_1 = require("../data");
const productModel_1 = require("../model/productModel");
const userModel_1 = require("../model/userModel");
exports.seedRouter = express_1.default.Router();
exports.seedRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.ProductModel.deleteMany({});
    const createdProducts = yield productModel_1.ProductModel.insertMany(data_1.sampleProducts);
    yield userModel_1.UserModel.deleteMany({});
    const createdUsers = yield userModel_1.UserModel.insertMany(data_1.sampleUsers);
    res.json({ createdProducts, createdUsers });
})));
