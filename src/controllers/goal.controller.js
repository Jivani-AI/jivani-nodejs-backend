import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Goal from "../models/goal.model.js";

const createGoal = asyncHandler(async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const goal = await Goal.create({
            title,
            description,
            status,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, goal, "Goal created successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Goal");
    }
});

const getGoals = asyncHandler(async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, goals, "Goals fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Goals");
    }
});

const getGoalById = asyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            throw new ApiError(404, "Goal not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, goal, "Goal fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Goal");
    }
});

const updateGoal = asyncHandler(async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true },
        );

        if (!goal) {
            throw new ApiError(404, "Goal not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, goal, "Goal updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating Goal");
    }
});

const deleteGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal) {
            throw new ApiError(404, "Goal not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Goal deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting Goal");
    }
});

export { createGoal, getGoals, getGoalById, updateGoal, deleteGoal };
