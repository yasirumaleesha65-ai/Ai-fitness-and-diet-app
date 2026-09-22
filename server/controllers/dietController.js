const DietPlan = require("../models/DiatPlan");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createDietPlan = async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      targetWeight,
      goal,
      dailyCalories,
      dietaryPreference,
      mealsPerDay,
      activityLevel,
      allergies,
      dislikedFoods,
      preferredFoods,
      budget,
      cookingTime,
      waterIntake,
      planDuration,
      additionalPreferences,
    } = req.body;

    const userId = req.user?._id;

    if (
      !age ||
      !height ||
      !weight ||
      !goal ||
      !dailyCalories ||
      !dietaryPreference ||
      !mealsPerDay ||
      !activityLevel ||
      !planDuration
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const prompt = `
You are an AI nutrition planning assistant.

Create a personalized ${planDuration} diet plan based on the user's
information below.

========================
PERSONAL INFORMATION
========================

Age: ${age} years
Height: ${height} cm
Current Weight: ${weight} kg
Target Weight: ${targetWeight || "Not specified"} kg

========================
GOAL
========================

Primary Goal: ${goal}
Daily Calorie Target: ${dailyCalories} kcal

========================
DIETARY PREFERENCES
========================

Dietary Preference: ${dietaryPreference}
Meals Per Day: ${mealsPerDay}
Activity Level: ${activityLevel}

========================
FOOD PREFERENCES
========================

Preferred Foods:
${preferredFoods || "No specific preferences"}

Foods to Avoid Because User Dislikes Them:
${dislikedFoods || "None specified"}

Food Allergies:
${allergies || "None specified"}

========================
LIFESTYLE & PRACTICAL CONSTRAINTS
========================

Food Budget: ${budget}
Available Cooking Time: ${cookingTime} minutes
Daily Water Intake Goal: ${waterIntake || "Not specified"} liters

Additional Preferences:
${additionalPreferences || "None specified"}

========================
PLAN REQUIREMENTS
========================

Create a practical and personalized ${planDuration} diet plan.

The plan should include:

1. A short overview of the plan and how it supports the user's goal.

2. Daily calorie target:
   - Target calories
   - Approximate calories per meal
   - Approximate calories for snacks

3. Macronutrient guidance:
   - Protein
   - Carbohydrates
   - Fats

4. A weekly meal schedule.

5. For each meal provide:
   - Meal name
   - Food items
   - Portion sizes
   - Approximate calories
   - Approximate protein when useful

6. Include approximately ${mealsPerDay} meals per day.

7. Include healthy snack options where appropriate.

8. Use foods that match the user's dietary preference.

9. Respect all listed food allergies.
   NEVER recommend foods listed as allergies.

10. Avoid foods the user specifically dislikes when reasonable.

11. Consider the user's budget and cooking time when selecting meals.

12. Provide suitable food substitutions so the user has alternatives.

13. Include hydration guidance.

14. Include a simple weekly grocery shopping list.

15. Include meal-preparation suggestions to make the plan easier to follow.

16. Explain how the user can monitor progress and adjust the plan.

IMPORTANT SAFETY GUIDELINES:

- Do not diagnose medical conditions.
- Do not prescribe medication or supplements.
- Do not make claims that a particular food or supplement will treat a disease.
- If the user has a serious allergy, medical condition, eating disorder,
  pregnancy, or other medical concern mentioned in their information,
  recommend consulting an appropriate healthcare professional.
- Treat calorie and macronutrient values as estimates rather than exact
  medical recommendations.
- Do not recommend extreme calorie restriction.

FORMAT:

Use clear Markdown-style headings.

Use this general structure:

# Personalized Diet Plan

## Overview

## Daily Nutrition Targets

## Weekly Meal Plan

### Day 1
#### Breakfast
- Food - portion - calories

#### Lunch
- Food - portion - calories

#### Dinner
- Food - portion - calories

#### Snacks
- Food - portion - calories

### Day 2
...

## Grocery List

## Meal Preparation Tips

## Hydration

## Food Substitutions

## Progress Tracking

## Important Notes

Make the plan practical, realistic, and easy for the user to follow.
`;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview",
    });

    const result = await model.generateContent(prompt);

    let aiPlan =
      result?.response?.text?.() ||
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      null;

    console.log("Extracted diet plan:", aiPlan);

    if (!aiPlan) {
      return res.status(500).json({
        success: false,
        message: "Gemini did not return a valid response",
      });
    }

    const newPlan = await DietPlan.create({
      userId,

      age,
      height,
      weight,
      targetWeight,

      goal,
      dailyCalories,

      dietaryPreference,
      mealsPerDay,
      activityLevel,

      allergies,
      dislikedFoods,
      preferredFoods,

      budget,
      cookingTime,
      waterIntake,

      planDuration,
      additionalPreferences,

      aiPlan,
    });

    return res.status(201).json({
      success: true,
      message: "Diet plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Diet plan creation error:", error);

    return res.status(500).json({
      success: false,
      message: "Error generating diet plan",
      error: error.message,
    });
  }
};

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
