const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const requireApiKey = require("../middleware/requireApiKey");

const router = express.Router();

router.route("/")
.post(requireApiKey, createProduct)
.get(getProducts);

router.route("/:id")
.get(getProductById)
.put(requireApiKey, updateProduct)
.delete(requireApiKey, deleteProduct);

module.exports = router;