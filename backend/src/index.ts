import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/error-handler";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (e) {
    console.log("Error Connecting to Database");
    process.exit(1);
  }
})();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.use(errorHandlerMiddleware);
app.listen(3000, () => {
  console.log("Server is running");
});
