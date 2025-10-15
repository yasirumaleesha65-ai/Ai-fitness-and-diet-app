const express = require("express");
const { createGroceryList } = require("../controllers/groceryController");
const { userAuthVerification } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", userAuthVerification, createGroceryList);

module.exports = router;
