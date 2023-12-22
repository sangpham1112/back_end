import cors from "cors";
import express from "express";
import connectDB from "./connDB/connectDB";
import { userRouter } from "./routes/userRoute";
import { orderRouter } from "./routes/orderRoute";
import { productRouter } from "./routes/productRoute";
import { commentRouter } from "./routes/commentRoute";

connectDB();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["sangstore.netlify.app"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/comments", commentRouter);

// app.use(express.static(path.join(__dirname, '../../frontend/dist')))
// app.get('*', (req: Request, res: Response) =>
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
// )

const PORT: number = parseInt((process.env.PORT || "4000") as string, 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
