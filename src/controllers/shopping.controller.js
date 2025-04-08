import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Shopping from "../models/shopping.model.js";

const createShoppingList = asyncHandler(async (req, res) => {
    try {
        const { title, description, category, items } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const shoppingList = await Shopping.create({
            title,
            description,
            category,
            items,
            userId: req.user._id,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Shopping List created successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while creating Shopping List",
        );
    }
});

const getShoppingLists = asyncHandler(async (req, res) => {
    try {
        const shoppingLists = await Shopping.find({
            userId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingLists,
                    "Shopping Lists fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Shopping Lists",
        );
    }
});

const getShoppingListById = asyncHandler(async (req, res) => {
    try {
        const shoppingList = await Shopping.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!shoppingList) {
            throw new ApiError(404, "Shopping List not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Shopping List fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Shopping List",
        );
    }
});

const updateShoppingList = asyncHandler(async (req, res) => {
    try {
        const allowedFields = ["title", "description", "category", "items"];
        const updateFields = Object.fromEntries(
            Object.entries(req.body).filter(
                ([key, value]) =>
                    allowedFields.includes(key) && value !== undefined,
            ),
        );

        const shoppingList = await Shopping.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id,
            },
            updateFields,
            { new: true },
        );

        if (!shoppingList) {
            throw new ApiError(404, "Shopping List not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Shopping List updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Shopping List",
        );
    }
});

const deleteShoppingList = asyncHandler(async (req, res) => {
    try {
        const shoppingList = await Shopping.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!shoppingList) {
            throw new ApiError(404, "Shopping List not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Shopping List deleted successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Shopping List",
        );
    }
});

const addItemToShoppingList = asyncHandler(async (req, res) => {
    try {
        const { name, price, bought } = req.body;

        // Validate required fields
        if (!name || name.trim() === "") {
            throw new ApiError(400, "Item name is required");
        }

        const newItem = { name: name.trim() };
        if (price !== undefined) newItem.price = price;
        if (bought !== undefined) newItem.bought = bought;

        const updatedList = await Shopping.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id,
            },
            {
                $push: { items: newItem },
            },
            { new: true },
        );

        if (!updatedList) {
            throw new ApiError(404, "Shopping List not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedList,
                    "Item added to shopping list successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while adding item to shopping list",
        );
    }
});

const updateShoppingItem = asyncHandler(async (req, res) => {
    try {
        const { itemIndex } = req.params;
        const { name, price, bought } = req.body;

        const shoppingList = await Shopping.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!shoppingList) {
            throw new ApiError(404, "Shopping List not found");
        }

        const index = parseInt(itemIndex);
        if (isNaN(index) || index < 0 || index >= shoppingList.items.length) {
            throw new ApiError(400, "Invalid item index");
        }

        // Update only provided fields
        const item = shoppingList.items[index];
        if (name !== undefined) item.name = name;
        if (price !== undefined) item.price = price;
        if (bought !== undefined) item.bought = bought;

        await shoppingList.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Shopping list item updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating item");
    }
});

const deleteShoppingItem = asyncHandler(async (req, res) => {
    try {
        const { itemIndex } = req.params;

        const shoppingList = await Shopping.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!shoppingList) {
            throw new ApiError(404, "Shopping List not found");
        }

        const index = parseInt(itemIndex);
        if (isNaN(index) || index < 0 || index >= shoppingList.items.length) {
            throw new ApiError(400, "Invalid item index");
        }

        // Remove the item
        shoppingList.items.splice(index, 1);
        await shoppingList.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    shoppingList,
                    "Item removed from shopping list successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting item");
    }
});

export {
    createShoppingList,
    getShoppingLists,
    getShoppingListById,
    updateShoppingList,
    deleteShoppingList,
    addItemToShoppingList,
    updateShoppingItem,
    deleteShoppingItem,
};
