"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./connDB/connectDB"));
const userRoute_1 = require("./routes/userRoute");
const orderRoute_1 = require("./routes/orderRoute");
const productRoute_1 = require("./routes/productRoute");
const commentRoute_1 = require("./routes/commentRoute");
(0, connectDB_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://sangstore.netlify.app"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", userRoute_1.userRouter);
app.use("/api/orders", orderRoute_1.orderRouter);
app.use("/api/products", productRoute_1.productRouter);
app.use("/api/comments", commentRoute_1.commentRouter);
// app.use(express.static(path.join(__dirname, '../../frontend/dist')))
// app.get('*', (req: Request, res: Response) =>
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
// )
const PORT = parseInt((process.env.PORT || "4000"), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
