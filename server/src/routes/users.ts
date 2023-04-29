import express, { Router } from "express";
import usersController from "../controllers/users";

const router: Router = express.Router();

// POST /users
router.post("/", usersController.create);

// GET /users
router.get("/", usersController.getAll);

// PUT /users/:id
router.put("/:id", usersController.updateById);

// DELETE /users/:id
router.delete("/:id", usersController.deletebyId);

export default router;
