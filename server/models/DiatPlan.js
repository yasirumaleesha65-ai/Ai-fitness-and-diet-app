const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    dietaryPreference: {
      type: String,
      enum: ["Vegetarian", "Vegan", "Non-Vegetarian"],
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    aiPlan: {
      type: String, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);
