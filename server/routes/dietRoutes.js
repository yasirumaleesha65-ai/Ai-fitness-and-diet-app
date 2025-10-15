const express = require("express");
const {
  createDietPlan,
  getUserDietPlans,
  getSingleDietPlan,
  deleteDietPlan,
} = require("../controllers/dietController");
const { userAuthVerification } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", userAuthVerification, createDietPlan);
router.get("/plans", userAuthVerification, getUserDietPlans);
router.get("/plans/:id", userAuthVerification, getSingleDietPlan);
router.delete("/:id", userAuthVerification, deleteDietPlan);

module.exports = router;
