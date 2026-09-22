const GroceryList = require("../models/GroceryList");
const DietPlan = require("../models/DiatPlan");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createGroceryList = async (req, res) => {
  try {
    const { dietPlanId } = req.body;
    const userId = req.user?._id;

    if (!dietPlanId) {
      return res.status(400).json({
        success: false,
        message: "Diet plan ID is required",
      });
    }

    // Fetch diet plan from DB
    const dietPlan = await DietPlan.findOne({ _id: dietPlanId, userId });
    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found or access denied",
      });
    }

    // Build AI prompt
    const prompt = `
      You are a professional nutritionist. Based on this diet plan:
      ---
      ${dietPlan.aiPlan}
      ---
      Generate a weekly grocery shopping list for the user.
      Include:
      - Ingredient names
      - Approximate weekly quantities (e.g., "2kg chicken breast")
      - Categorize by type (Protein, Vegetables, Fruits, Grains, Dairy, Snacks)
      Format neatly with bullet points and categories.
    `;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview",
    });
    const result = await model.generateContent(prompt);
    const groceryItems = result.response.text();

    // Save to DB
    const newList = await GroceryList.create({
      userId,
      dietPlanId,
      goal: dietPlan.goal,
      dietaryPreference: dietPlan.dietaryPreference,
      groceryItems,
    });

    res.status(201).json({
      success: true,
      message: "Grocery list generated successfully",
      groceryList: newList,
    });
  } catch (error) {
    console.error(" Error generating grocery list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate grocery list",
    });
  }
};

module.exports = { createGroceryList };
