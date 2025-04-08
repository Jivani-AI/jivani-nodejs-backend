import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Habit from "../models/habit.model.js";

const createHabit = asyncHandler(async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const habit = await Habit.create({
            title,
            description,
            category,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit created successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while creating Habit",
        );
    }
});

const getHabits = asyncHandler(async (req, res) => {
    try {
        const habits = await Habit.find({
            userId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habits,
                    "Habits fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Habits",
        );
    }
});

const getHabit = asyncHandler(async (req, res) => { 
    try {
        const { id } = req.params;
        const habit = await Habit.findOne({
            _id: id,
            userId: req.user._id,
        });

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Habit",
        );
    }
});

const updateHabit = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category } = req.body;

        const habit = await Habit.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            {
                title,
                description,
                category,
            },
            {
                new: true,
            },
        );

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Habit",
        );
    }
});

const deleteHabit = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    "Habit deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Habit",
        );
    }
});

const addHabitLog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { date, completed } = req.body;

        const habit = await Habit.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            {
                $push: {
                    logs: {
                        date,
                        completed,
                    },
                },
            },
            {
                new: true,
            },
        );

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit log added successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while adding Habit log",
        );
    }
});

const deleteHabitLog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { logId } = req.body;

        const habit = await Habit.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            {
                $pull: {
                    logs: {
                        _id: logId,
                    },
                },
            },
            {
                new: true,
            },
        );

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit log deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Habit log",
        );
    }
});

const updateHabitLog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { logId, completed } = req.body;

        const habit = await Habit.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            {
                $set: {
                    "logs.$[log].completed": completed,
                },
            },
            {
                arrayFilters: [{ "log._id": logId }],
                new: true,
            },
        );

        if (!habit) {
            throw new ApiError(404, "Habit not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    habit,
                    "Habit log updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Habit log",
        );
    }
});

export {
    createHabit,
    getHabits,
    getHabit,
    updateHabit,
    deleteHabit,
    addHabitLog,
    deleteHabitLog,
    updateHabitLog,
}



