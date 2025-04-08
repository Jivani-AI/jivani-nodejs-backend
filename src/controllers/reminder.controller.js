import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Reminder from "../models/reminder.model.js";

const createReminder = asyncHandler(async (req, res) => {
    try {
        const { title, description, time, frequency } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const reminder = await Reminder.create({
            title,
            description,
            time,
            frequency,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, reminder, "Reminder created successfully"),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Reminder");
    }
});

const getReminders = asyncHandler(async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user._id }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    reminders,
                    "Reminders fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Reminders",
        );
    }
});

const getReminderById = asyncHandler(async (req, res) => {
    try {
        const reminder = await Reminder.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!reminder) {
            throw new ApiError(404, "Reminder not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, reminder, "Reminder fetched successfully"),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Reminder");
    }
});

const updateReminder = asyncHandler(async (req, res) => {
    try {
        const { title, description, time, frequency } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const reminder = await Reminder.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, description, time, frequency },
            { new: true },
        );

        if (!reminder) {
            throw new ApiError(404, "Reminder not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, reminder, "Reminder updated successfully"),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating Reminder");
    }
});

const deleteReminder = asyncHandler(async (req, res) => {
    try {
        const reminder = await Reminder.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!reminder) {
            throw new ApiError(404, "Reminder not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, reminder, "Reminder deleted successfully"),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting Reminder");
    }
});

const deleteAllReminders = asyncHandler(async (req, res) => {
    try {
        await Reminder.deleteMany({ userId: req.user._id });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    null,
                    "All reminders deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting all reminders",
        );
    }
});

export {
    createReminder,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
    deleteAllReminders,
};
