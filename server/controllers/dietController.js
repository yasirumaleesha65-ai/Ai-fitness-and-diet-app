const DietPlan = require("../models/DiatPlan");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createDietPlan = async (req, res) => {
  try {
    const { goal, dietaryPreference, dailyCalories } = req.body;
    const userId = req.user?._id;

    if (!goal || !dietaryPreference || !dailyCalories) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const prompt = `
You are a certified nutritionist. Create a detailed ${goal.toLowerCase()} diet plan 
for a ${dietaryPreference.toLowerCase()} person with a daily intake of ${dailyCalories} calories.

Return your response in this Markdown-like format:

# Goal: ${goal}
## Daily Calorie Target: ${dailyCalories} kcal
## Dietary Preference: ${dietaryPreference}

###  Breakfast
- List each item with portion size and calories

###  Lunch
- List each item with portion size and calories

###  Dinner
- List each item with portion size and calories

###  Snacks
- Two snacks between meals with calories

###  Notes
- Add a short hydration and supplement recommendation

Use clear headers, bullet points, and line breaks for easy reading.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    let aiPlan =
      result?.response?.text?.() ||
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      null;

    console.log(" Extracted plan:", aiPlan);

    if (!aiPlan) {
      return res.status(500).json({
        success: false,
        message: "Gemini did not return a valid response",
      });
    }

    const newPlan = await DietPlan.create({
      userId,
      goal,
      dietaryPreference,
      dailyCalories,
      aiPlan,
    });

    return res.status(201).json({
      success: true,
      message: "Diet plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating diet plan",
      error: error.message,
    });
  }
};

// Get all diet plans for a user
const getUserDietPlans = async (req, res) => {
  try {
    const userId = req.user._id;
    const plans = await DietPlan.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, plans });
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching diet plans" });
  }
};

// Get a single diet plan by ID
const getSingleDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Diet plan not found" });
    }
    res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching diet plan" });
  }
};

// Delete a diet plan
const deleteDietPlan = async (req, res) => {
  try {
    const deleted = await DietPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Diet plan not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Diet plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting diet plan" });
  }
};

module.exports = {
  createDietPlan,
  getUserDietPlans,
  getSingleDietPlan,
  deleteDietPlan,
};
