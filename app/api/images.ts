import { NextApiRequest, NextApiResponse } from "next";
import imagesController from "./controllers/images";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  imagesController.requestHandler(req, res);
}
