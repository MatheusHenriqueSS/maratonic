import { NextApiRequest, NextApiResponse } from "next";
import imagesController from "./controllers/images";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return imagesController.create(req, res);
    } else if (req.method === "GET") {
        return imagesController.getAll(req, res);
    } else if (req.method === "PUT") {
        return imagesController.updateById(req, res);
    } else if (req.method === "DELETE") {
        return imagesController.deletebyId(req, res);
    }

    res.status(405).end(); // Method Not Allowed
}
