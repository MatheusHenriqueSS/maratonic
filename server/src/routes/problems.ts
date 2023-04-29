import express, { Router } from "express";
import problemsController from "../controllers/problems";

const router: Router = express.Router();

// POST /problems
router.post("/", problemsController.create);

// GET /problems
router.get("/", problemsController.getAll);

// PUT /problems/:id
router.put("/:id", problemsController.updateById);

// DELETE /problems/:id
router.delete("/:id", problemsController.deletebyId);

export default router;
