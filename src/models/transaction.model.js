import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        amount: {
            type: Number,
            required: true,
            min: [0, "Amount cannot be negative"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        category: {
            type: String,
            enum: ["Income", "Expense"],
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
