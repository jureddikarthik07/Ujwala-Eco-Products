const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    image1: {
        type: String,
        required: true,
    },

    image2: {
        type: String,
        required: true,
    },

    hexCode: {
        type: String,
        required: true,
    }
});

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number,
        default: 0,
    },

    rating: {
        type: Number,
        default: 5,
    },

    reviews: {
        type: Number,
        default: 0,
    },

    featured: {
        type: Boolean,
        default: false,
    },

    colors: [colorSchema]

},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);