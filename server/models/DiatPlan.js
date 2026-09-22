const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    targetWeight: {
      type: Number,
    },

    goal: {
      type: String,
      required: true,
    },

    dailyCalories: {
      type: Number,
      required: true,
    },

    planDuration: {
      type: String,
      required: true,
    },

    dietaryPreference: {
      type: String,
      required: true,
    },

    mealsPerDay: {
      type: Number,
      required: true,
    },

    activityLevel: {
      type: String,
      required: true,
    },

    allergies: {
      type: String,
      default: "",
    },

    dislikedFoods: {
      type: String,
      default: "",
    },

    preferredFoods: {
      type: String,
      default: "",
    },

    budget: {
      type: String,
      default: "Moderate",
    },

    cookingTime: {
      type: Number,
      default: 30,
    },

    waterIntake: {
      type: Number,
    },

    additionalPreferences: {
      type: String,
      default: "",
    },

    aiPlan: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);
