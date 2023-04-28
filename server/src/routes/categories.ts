import express, { Router } from "express";
import categoriesController from "../controllers/categories";

const router: Router = express.Router();

// POST /categories
router.post("/", categoriesController.create);

// GET /categories
router.get("/", categoriesController.getAll);

// PUT /categories/:id
router.put("/:id", categoriesController.updateById);

// DELETE /categories/:id
router.delete("/:id", categoriesController.deletebyId);

export default router;
