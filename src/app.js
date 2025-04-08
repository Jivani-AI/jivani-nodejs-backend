import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import eventRoutes from "./routes/event.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import shoppingRoutes from "./routes/shopping.routes.js";
import noteRoutes from "./routes/note.routes.js";
import habitRoutes from "./routes/habit.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/reminders", reminderRoutes);
app.use("/api/v1/shopping", shoppingRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/habits", habitRoutes);

export { app };
