import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Todo from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTodo = asyncHandler(async (req, res) => {
    try {
        const { title, description, priority, dueDate, classification } =
            req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const todo = await Todo.create({
            title,
            description,
            priority,
            dueDate,
            classification,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, todo, "Todo created successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Todo");
    }
});

const getTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id });
        return res
            .status(200)
            .json(new ApiResponse(200, todos, "Todos fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Todos");
    }
});

const getTodoById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            throw new ApiError(404, "Todo not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, todo, "Todo fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Todo");
    }
});

const updateTodo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, classification } =
            req.body;
        const todo = await Todo.findByIdAndUpdate(
            id,
            {
                title,
                description,
                priority,
                dueDate,
                classification,
            },
            { new: true },
        );
        if (!todo) {
            throw new ApiError(404, "Todo not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, todo, "Todo updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating Todo");
    }
});

const deleteTodo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            throw new ApiError(404, "Todo not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Todo deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting Todo");
    }
});

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
