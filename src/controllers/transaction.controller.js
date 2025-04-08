import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Transaction from "../models/transaction.model.js";

const createTransaction = asyncHandler(async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;
        if (!title || !amount || !category) {
            throw new ApiError(400, "Title, Amount and Category are required");
        }

        console.log(req.user._id, title, amount, date, category);

        const transaction = await Transaction.create({
            title,
            amount,
            date,
            category,
            userId: req.user._id,
        });

        console.log(transaction);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transaction,
                    "Transaction created successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while creating Transaction",
        );
    }
});

const getTransactions = asyncHandler(async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transactions,
                    "Transactions fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Transactions",
        );
    }
});

const getTransactionById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transaction,
                    "Transaction fetched successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while fetching Transaction",
        );
    }
});

const updateTransaction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, date, category } = req.body;
        if (!title || !amount || !category) {
            throw new ApiError(400, "Title, Amount and Category are required");
        }

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                date,
                category,
            },
            { new: true },
        );

        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transaction,
                    "Transaction updated successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while updating Transaction",
        );
    }
});

const deleteTransaction = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Transaction deleted successfully"));
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while deleting Transaction",
        );
    }
});

export {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
};
