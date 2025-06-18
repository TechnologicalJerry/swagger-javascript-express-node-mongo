const User = require("../models/user.model");

// Create new user
exports.create = async (req, res) => {
    console.log("Creating a new user", req.body);
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Get all users
exports.findAll = async (req, res) => {
    console.log("Fetching all users");
    console.log("Fetching all users from the database");
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).send({ message: err.message });
    }
};

// Get single user by ID
exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Update user by ID
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete user
exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
