import categoryRoutes from "./categories";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/category", categoryRoutes);

export default app;
