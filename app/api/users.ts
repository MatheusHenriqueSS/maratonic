import { NextApiRequest, NextApiResponse } from "next";
import usersController from "./controllers/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  usersController.requestHandler(req, res);
}
