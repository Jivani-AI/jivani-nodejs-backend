import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Note from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const note = await Note.create({
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
                    note,
                    "Note created successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while creating Note",
        );
    }
});

const getNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Note.find({
            userId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    notes,
                    "Notes fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Notes",
        );
    }
});

const getNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Note fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Note",
        );
    }
});

const updateNote = asyncHandler(async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
            },
            { new: true },
        );

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Note updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Note",
        );
    }
});

const deleteNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Note deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Note",
        );
    }
});

const toggleNotePin = asyncHandler(async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        note.isPinned = !note.isPinned;
        await note.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Note pin status toggled successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while toggling Note pin status",
        );
    }
});

const addBlock = asyncHandler(async (req, res) => {
    try {
        const { block } = req.body;

        const note = await Note.findById(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        note.blocks.push(block);
        await note.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Block added successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while adding Block to Note",
        );
    }
});

const updateBlock = asyncHandler(async (req, res) => {
    try {
        const { blockId, block } = req.body;

        const note = await Note.findById(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        const blockIndex = note.blocks.findIndex(
            (b) => b._id.toString() === blockId,
        );

        if (blockIndex === -1) {
            throw new ApiError(404, "Block not found");
        }

        note.blocks[blockIndex] = block;
        await note.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Block updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Block in Note",
        );
    }
});

const deleteBlock = asyncHandler(async (req, res) => {
    try {
        const { blockId } = req.body;

        const note = await Note.findById(req.params.id);

        if (!note) {
            throw new ApiError(404, "Note not found");
        }

        const blockIndex = note.blocks.findIndex(
            (b) => b._id.toString() === blockId,
        );

        if (blockIndex === -1) {
            throw new ApiError(404, "Block not found");
        }

        note.blocks.splice(blockIndex, 1);
        await note.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    note,
                    "Block deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Block from Note",
        );
    }
});


export {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    toggleNotePin,
    addBlock,
    updateBlock,
    deleteBlock,
};