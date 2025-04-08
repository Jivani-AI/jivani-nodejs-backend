import mongoose, { Schema } from "mongoose";

const checklistItemSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, "Checklist item must have text"],
            trim: true,
            minlength: [1, "Checklist item cannot be empty"],
        },
        checked: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false },
);

const blockSchema = new Schema(
    {
        type: {
            type: String,
            enum: {
                values: ["text", "checklist"],
                message: 'Block type must be either "text" or "checklist"',
            },
            required: true,
        },
        content: {
            type: String,
            required: function () {
                return this.type === "text";
            },
            minlength: [1, "Text block content cannot be empty"],
            trim: true,
        },
        items: {
            type: [checklistItemSchema],
            validate: {
                validator: function (val) {
                    return (
                        this.type !== "checklist" ||
                        (Array.isArray(val) && val.length > 0)
                    );
                },
                message: "Checklist block must have at least one item",
            },
        },
    },
    { _id: false },
);

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Note must have a title"],
            trim: true,
            minlength: [1, "Title cannot be empty"],
        },
        blocks: {
            type: [blockSchema],
            validate: {
                validator: function (val) {
                    return Array.isArray(val) && val.length > 0;
                },
                message: "Note must have at least one block",
            },
        },
        isPinned: {
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

const Note = mongoose.model("Note", noteSchema);
export default Note;
