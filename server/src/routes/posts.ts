import express, { Router } from "express";
import postsController from "../controllers/posts";

const router: Router = express.Router();

// POST /posts
router.post("/", postsController.create);

// GET /posts
router.get("/", postsController.getAll);

// PUT /posts/:id
router.put("/:id", postsController.updateById);

// DELETE /posts/:id
router.delete("/:id", postsController.deletebyId);

export default router;
