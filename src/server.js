import express from "express";
import cors from "cors";
import todoController from "./controllers/todos";

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.port || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));

// Get all todos
app.get("/api/v1/todos", todoController.getAll);

// Get todo
app.get("/api/v1/todos/:todoId", todoController.getOne);

// Update todo
app.put("/api/v1/todos/:todoId", express.json(), todoController.update);

// Add todo
app.post("/api/v1/todos", express.json(), todoController.add);

// Delete todo
app.delete("/api/v1/todos/:todoId", todoController.remove);

// Update\delete several todos
app.patch("/api/v1/todos", express.json(), (req, res) => {
	const { action } = req.query;

	if (action === "delete") {
		todoController.removeSeveral(req, res);
		return;
	}

	if (action === "update") {
		todoController.updateSeveral(res, req);
		return;
	}

	res.sendStatus(400);
});

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
