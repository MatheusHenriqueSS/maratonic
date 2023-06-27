import { NextApiRequest, NextApiResponse } from "next";
import categoriesController from "./controllers/categories";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  categoriesController.requestHandler(req, res);
}
