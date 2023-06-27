import { NextApiRequest, NextApiResponse } from "next";
import postsController from "./controllers/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  postsController.requestHandler(req, res);
}
