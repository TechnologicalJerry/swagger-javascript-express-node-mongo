const express = require("express");
const router = express.Router();

// Import all route modules
const userRoutes = require("./users");
// const authRoutes = require("./auth");     ← Add more as you go
// const productRoutes = require("./products");

router.use("/users", userRoutes);            // Accessible as /users
// router.use("/auth", authRoutes);          // Accessible as /auth
// router.use("/products", productRoutes);   // Accessible as /products

module.exports = router;
