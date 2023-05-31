import { NextApiRequest, NextApiResponse } from "next";
import postsController from "./controllers/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return postsController.create(req, res);
    } else if (req.method === "GET") {
        return postsController.getAll(req, res);
    } else if (req.method === "PUT") {
        return postsController.updateById(req, res);
    } else if (req.method === "DELETE") {
        return postsController.deletebyId(req, res);
    }

    res.status(405).end(); // Method Not Allowed
}
