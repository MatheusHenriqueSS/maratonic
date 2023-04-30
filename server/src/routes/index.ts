import categoryRoutes from "./categories";
import imageRoutes from "./images";
import postRoutes from "./posts";
import problemRoutes from "./problems";
import userRoutes from "./users";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/categories", categoryRoutes);
app.use("/images", imageRoutes);
app.use("/posts", postRoutes);
app.use("/problems", problemRoutes);
app.use("/users", userRoutes);

export default app;
