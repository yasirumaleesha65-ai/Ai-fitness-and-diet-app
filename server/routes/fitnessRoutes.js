const express = require("express");
const {
  createFitnessPlan,
  getUserPlans,
  getSingleFitnessPlan,
  deleteFitnessPlan,
} = require("../controllers/fitnessController.js");
const { userAuthVerification } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create", createFitnessPlan);
router.get("/plans", getUserPlans);
router.delete("/:id", userAuthVerification, deleteFitnessPlan);
router.get("/plans/:id", userAuthVerification, getSingleFitnessPlan);

module.exports = router;
