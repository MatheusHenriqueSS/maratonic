import express, { Router } from "express";
import imagesController from "../controllers/images";

const router: Router = express.Router();

// POST /images
router.post("/", imagesController.create);

// GET /images
router.get("/", imagesController.getAll);

// PUT /images/:id
router.put("/:id", imagesController.updateById);

// DELETE /images/:id
router.delete("/:id", imagesController.deletebyId);

export default router;
