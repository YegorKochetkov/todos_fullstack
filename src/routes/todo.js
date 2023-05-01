import todoController from "../controllers/todos.js";
import express from "express";

export const router = express.Router();

// Get all todos
router.get("/", todoController.getAll);

// Get todo
router.get("/:todoId", todoController.getOne);

// Update todo
router.put("/:todoId", todoController.update);

// Add todo
router.post("/", todoController.add);

// Delete todo
router.delete("/:todoId", todoController.remove);

// Update\delete several todos
router.patch("/", (req, res) => {
	const { action } = req.query;

	if (action === "delete") {
		todoController.removeSeveral(req, res);
		return;
	}

	if (action === "update") {
		todoController.updateSeveral(req, res);
		return;
	}

	res.sendStatus(400);
});
