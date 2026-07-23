const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Ujwala Eco Products Backend 🚀");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});