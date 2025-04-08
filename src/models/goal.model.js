import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema(
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
        status: {
            type: String,
            enum: ["Active", "Completed", "Cancelled", "Pending"],
            default: "Active",
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

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
