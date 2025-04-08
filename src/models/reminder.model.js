import mongoose, { Schema } from "mongoose";

const reminderSchema = new Schema(
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
        time: {
            type: String,
            required: [true, "Time is required"],
            validate: {
                validator: function (v) {
                    return /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*[AaPp][Mm]$/.test(v);
                },
                message: (props) =>
                    `${props.value} is not a valid time format! Use format like "6:00 AM"`,
            },
        },
        frequency: {
            type: String,
            enum: [
                "Daily",
                "Weekends",
                "Weekdays",
                "Weekly",
                "Monthly",
                "Yearly",
                "Once",
            ],
            default: "Once",
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

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
