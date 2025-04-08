import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
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
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        priority: {
            type: String,
            enum: {
                values: ["Low", "Medium", "High"],
                message: "{VALUE} is not a valid priority level",
            },
            default: "Low",
        },
        dueDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return value >= new Date();
                },
                message: "Due date cannot be in the past",
            },
        },
        classification: {
            type: String,
            enum: ["Work", "Personal", "Family", "Other"],
            default: "Other",
        },
        completed: {
            type: Boolean,
            default: false,
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

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
