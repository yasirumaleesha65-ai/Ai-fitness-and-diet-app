import mongoose from "mongoose";

const fitnessPlanSchema = new mongoose.Schema(
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
    duration: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    aiPlan: {
      type: String, 
    },
  },
  { timestamps: true }
);

export const FitnessPlan = mongoose.model("FitnessPlan", fitnessPlanSchema);
