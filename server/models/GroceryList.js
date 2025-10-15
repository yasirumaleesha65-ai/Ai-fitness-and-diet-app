const mongoose = require("mongoose");

const groceryListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dietPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DietPlan",
    },
    goal: {
      type: String,
    },
    dietaryPreference: {
      type: String,
    },
    groceryItems: {
      type: String, // Gemini’s response as text
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroceryList", groceryListSchema);
