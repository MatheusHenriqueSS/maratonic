import { NextApiRequest, NextApiResponse } from "next";
import problemsController from "./controllers/problems";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  problemsController.requestHandler(req, res);
}
