import { NextApiRequest, NextApiResponse } from "next";
import problemsController from "./controllers/problems";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return problemsController.create(req, res);
    } else if (req.method === "GET") {
        return problemsController.getAll(req, res);
    } else if (req.method === "PUT") {
        return problemsController.updateById(req, res);
    } else if (req.method === "DELETE") {
        return problemsController.deletebyId(req, res);
    }

    res.status(405).end(); // Method Not Allowed
}
