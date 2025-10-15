import { FitnessPlan } from "../models/FitnessPlan.js";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Create Plan
export const createFitnessPlan = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { goal, duration, experienceLevel } = req.body;

    // Generate plan using Gemini AI
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    Create a personalized ${duration} fitness plan for a ${experienceLevel} user whose goal is ${goal}.
    Include warm-ups, workouts, rest days, and nutrition tips.
    Format it as a detailed, structured text.
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    const newPlan = await FitnessPlan.create({
      userId: decoded.userId,
      goal,
      duration,
      experienceLevel,
      aiPlan: aiResponse,
    });

    res.status(201).json({
      success: true,
      message: "AI Fitness plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating plan" });
  }
};

// ✅ Fetch all plans for a user
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
