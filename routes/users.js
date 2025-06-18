const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

router.get("/", users.findAll);
router.get("/:id", users.findOne);
router.post("/", users.create);
router.put("/:id", users.update);
router.delete("/:id", users.delete);

module.exports = router;
