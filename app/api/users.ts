import { NextApiRequest, NextApiResponse } from "next";
import usersController from "./controllers/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return usersController.getAll(req, res);
  } else if (req.method === "PUT") {
    return usersController.updateById(req, res);
  } else if (req.method === "DELETE") {
    return usersController.deletebyId(req, res);
  }

  res.status(405).end(); // Method Not Allowed
}
