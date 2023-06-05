import { NextApiRequest, NextApiResponse } from "next";
import categoriesController from "./controllers/categories";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return categoriesController.create(req, res);
    } else if (req.method === "GET") {
        return categoriesController.getAll(req, res);
    } else if (req.method === "PUT") {
        return categoriesController.updateById(req, res);
    } else if (req.method === "DELETE") {
        return categoriesController.deletebyId(req, res);
    }

    res.status(405).end(); // Method Not Allowed
}
