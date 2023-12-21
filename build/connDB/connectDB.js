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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const MONGODB_URI = 'mongodb+srv://sangthanh97:GQCgL4MUtoEmsiKH@cluster0.ffqyzgb.mongodb.net/shopping?retryWrites=true&w=majority';
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default
            .connect(MONGODB_URI)
            .then(() => {
            console.log('connected to mongodb');
        })
            .catch(() => {
            console.log(MONGODB_URI);
        });
    });
}
exports.default = connectDB;
