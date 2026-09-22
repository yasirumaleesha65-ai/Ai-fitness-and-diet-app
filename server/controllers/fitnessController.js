import { FitnessPlan } from "../models/FitnessPlan.js";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createFitnessPlan = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      age,
      gender,
      height,
      weight,
      goal,
      targetWeight,
      duration,
      experienceLevel,
      workoutDays,
      sessionDuration,
      workoutLocation,
      equipment,
      workoutType,
      activityLevel,
      dietPreference,
      injuries,
      additionalPreferences,
    } = req.body;

    // Generate plan using Gemini AI
    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview",
    });

    const prompt = `
You are a professional fitness planning assistant.

Create a personalized fitness plan based on the following user information:

PERSONAL INFORMATION
- Age: ${age}
- Gender: ${gender || "Not specified"}
- Height: ${height} cm
- Current Weight: ${weight} kg
- Target Weight: ${targetWeight || "Not specified"}

FITNESS GOAL
- Goal: ${goal}
- Plan Duration: ${duration}
- Experience Level: ${experienceLevel}

ACTIVITY & TRAINING
- Current Activity Level: ${activityLevel}
- Workout Days Per Week: ${workoutDays}
- Session Duration: ${sessionDuration} minutes
- Workout Location: ${workoutLocation}
- Preferred Workout Type: ${workoutType}
- Available Equipment: ${equipment || "Not specified"}

NUTRITION
- Diet Preference: ${dietPreference}

LIMITATIONS
- Injuries or Physical Limitations: ${injuries || "None specified"}

ADDITIONAL PREFERENCES
- ${additionalPreferences || "None"}

Create a realistic and personalized ${duration} fitness plan.

The plan should include:

1. A clear overview of the plan
2. Weekly workout schedule
3. Warm-up routine
4. Detailed exercises for each workout day
5. Sets, repetitions, rest periods, and approximate duration
6. Rest and recovery days
7. Cardio recommendations where appropriate
8. General nutrition guidance based on the user's goal
9. Hydration guidance
10. Progress tracking recommendations
11. How the plan should progress throughout the duration

Adapt the exercises to the user's experience level, available equipment,
workout location, workout frequency, and session duration.

If the user has listed an injury or physical limitation, avoid recommending
exercises that could aggravate it and clearly recommend consulting an
appropriate healthcare professional before exercising.

Do not assume the user has access to equipment that they did not list.

Format the response using clear headings, sections, bullet points, and tables
where useful so that the plan is easy to follow.
`;

    const result = await model.generateContent(prompt);

    const aiResponse = result.response.text();

    const newPlan = await FitnessPlan.create({
      userId: decoded.userId,

      age,
      gender,
      height,
      weight,
      goal,
      targetWeight,

      duration,
      experienceLevel,

      workoutDays,
      sessionDuration,
      workoutLocation,
      equipment,
      workoutType,
      activityLevel,

      dietPreference,

      injuries,
      additionalPreferences,

      aiPlan: aiResponse,
    });

    return res.status(201).json({
      success: true,
      message: "AI Fitness plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Create fitness plan error:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating plan",
    });
  }
};

export const getUserPlans = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const plans = await FitnessPlan.find({ userId: decoded.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching plans" });
  }
};

export const getSingleFitnessPlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const userId = req.user?._id; // make sure auth middleware attaches user

    console.log("Authenticated user:", req.user);

    const plan = await FitnessPlan.findOne({ _id: planId, userId: userId });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Fitness plan not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("Error fetching single plan:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching fitness plan",
    });
  }
};

export const deleteFitnessPlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const userId = req.user?._id;

    const plan = await FitnessPlan.findOneAndDelete({
      _id: planId,
      userId: userId,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found or not authorized to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fitness plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting fitness plan:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting plan",
    });
  }
};
