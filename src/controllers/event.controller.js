import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Event from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        if (!title || !date) {
            throw new ApiError(400, "Title and Date are required");
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, event, "Event created successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Event");
    }
});

const getEvents = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user._id }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, events, "Events fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Events");
    }
});

const getEventById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            throw new ApiError(404, "Event not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, event, "Event fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching Event");
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;

        const event = await Event.findByIdAndUpdate(
            id,
            { title, description, date, location },
            { new: true },
        );

        if (!event) {
            throw new ApiError(404, "Event not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, event, "Event updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating Event");
    }
});

const deleteEvent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            throw new ApiError(404, "Event not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Event deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting Event");
    }
});

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
