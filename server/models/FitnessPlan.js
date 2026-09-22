import mongoose from "mongoose";

const fitnessPlanSchema = new mongoose.Schema(
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

    gender: {
      type: String,
      default: "",
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

    duration: {
      type: String,
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    workoutDays: {
      type: Number,
      required: true,
    },

    sessionDuration: {
      type: Number,
      required: true,
    },

    workoutLocation: {
      type: String,
      enum: ["Gym", "Home", "Outdoors", "Mixed"],
      default: "Gym",
    },

    equipment: {
      type: String,
      default: "",
    },

    workoutType: {
      type: String,
      default: "Strength Training",
    },

    activityLevel: {
      type: String,
      default: "Moderate",
    },

    dietPreference: {
      type: String,
      default: "No specific preference",
    },

    injuries: {
      type: String,
      default: "",
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

export const FitnessPlan = mongoose.model("FitnessPlan", fitnessPlanSchema);
