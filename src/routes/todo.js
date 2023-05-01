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

// Middleware to handle router action
function hasAction(action) {
	return (req, _res, next) => {
		if (req.query.action === action) {
			next();
		} else {
			next("route");
		}
	};
}

// Delete several todos
router.patch("/", hasAction("delete"), todoController.removeSeveral);

// Update several todos
router.patch("/", hasAction("update"), todoController.updateSeveral);
