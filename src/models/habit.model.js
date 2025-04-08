import mongoose, { Schema } from "mongoose";

const habitLogSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false },
);

const habitSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            minlength: [3, "Description must be at least 3 characters"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        frequency: {
            type: String,
            enum: ["Daily", "Weekly", "Monthly"],
            default: "Daily",
        },
        logs: {
            type: [habitLogSchema],
            default: [],
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

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;
