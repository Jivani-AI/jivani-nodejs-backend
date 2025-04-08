import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Item name is required"],
            trim: true,
            minlength: [1, "Item name cannot be empty"],
        },
        bought: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            min: [0, "Price must be a positive number"],
            required: false,
        },
    },
    { _id: false },
);

const shoppingListSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            default: "Untitled List",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        category: {
            type: String,
            enum: {
                values: ["Shopping", "Wishlist", "Gift-Ideas"],
                message: 'Category must be either "shopping" or "wishlist"',
            },
            default: "Shopping",
            required: [true, "Category is required"],
        },
        items: {
            type: [itemSchema],
            validate: {
                validator: function (val) {
                    return Array.isArray(val) && val.length > 0;
                },
                message: "At least one item is required in the list",
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

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

export default ShoppingList;
