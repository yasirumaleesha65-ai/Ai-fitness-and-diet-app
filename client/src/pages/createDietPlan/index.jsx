import React, { useState } from "react";
import axios from "axios";

const CreateDietPlan = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    targetWeight: "",

    goal: "",
    dailyCalories: "",

    dietaryPreference: "",
    mealsPerDay: "3",

    activityLevel: "Moderate",

    allergies: "",
    dislikedFoods: "",
    preferredFoods: "",

    budget: "Moderate",
    cookingTime: "30",

    waterIntake: "",
    planDuration: "",

    additionalPreferences: "",
  });

  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setDietPlan("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/diet/create",
        formData,
        { withCredentials: true },
      );

      if (response.data?.success && response.data?.plan?.aiPlan) {
        setDietPlan(response.data.plan.aiPlan);
      } else {
        alert("No diet plan received from server.");
      }
    } catch (error) {
      console.error("Error generating diet plan:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate diet plan. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2 text-center">
        Create Your Personalized Diet Plan
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-xl">
        Tell us about your body, goals, lifestyle, and food preferences so the
        AI can create a more personalized plan.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-2xl"
      >
        {/* Personal Information */}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Age</label>

            <input
              type="number"
              name="age"
              placeholder="e.g., 23"
              min="13"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Height (cm)
            </label>

            <input
              type="number"
              name="height"
              placeholder="e.g., 175"
              min="100"
              max="250"
              value={formData.height}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Current Weight (kg)
            </label>

            <input
              type="number"
              name="weight"
              placeholder="e.g., 70"
              min="30"
              max="300"
              value={formData.weight}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Target Weight (kg)
            </label>

            <input
              type="number"
              name="targetWeight"
              placeholder="e.g., 75"
              min="30"
              max="300"
              value={formData.targetWeight}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Goals */}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Goals & Calories
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Main Goal
          </label>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select your goal</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Weight Maintenance">Weight Maintenance</option>
            <option value="Improve General Health">
              Improve General Health
            </option>
            <option value="Improve Energy">Improve Energy</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Daily Calories
            </label>

            <input
              type="number"
              name="dailyCalories"
              placeholder="e.g., 2000"
              min="1000"
              max="6000"
              value={formData.dailyCalories}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Plan Duration
            </label>

            <input
              type="text"
              name="planDuration"
              placeholder="e.g., 8 weeks"
              value={formData.planDuration}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Diet Preferences */}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Dietary Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Dietary Preference
            </label>

            <select
              name="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select...</option>
              <option value="No Specific Preference">
                No Specific Preference
              </option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Pescatarian">Pescatarian</option>
              <option value="Keto">Keto</option>
              <option value="Low Carb">Low Carb</option>
              <option value="High Protein">High Protein</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Meals Per Day
            </label>

            <select
              name="mealsPerDay"
              value={formData.mealsPerDay}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="2">2 meals</option>
              <option value="3">3 meals</option>
              <option value="4">4 meals</option>
              <option value="5">5 meals</option>
              <option value="6">6 meals</option>
            </select>
          </div>
        </div>

        {/* Activity */}

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-6">
          Lifestyle & Activity
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            Activity Level
          </label>

          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="Sedentary">Sedentary - little exercise</option>

            <option value="Light">Lightly Active - 1-2 days/week</option>

            <option value="Moderate">Moderately Active - 3-4 days/week</option>

            <option value="Very Active">Very Active - 5-6 days/week</option>

            <option value="Extremely Active">
              Extremely Active - intense daily activity
            </option>
          </select>
        </div>

        {/* Food Preferences */}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Food Preferences
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Favorite Foods
          </label>

          <textarea
            name="preferredFoods"
            placeholder="e.g., chicken, rice, eggs, bananas, oats"
            value={formData.preferredFoods}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Foods You Dislike
          </label>

          <textarea
            name="dislikedFoods"
            placeholder="e.g., broccoli, fish, mushrooms"
            value={formData.dislikedFoods}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            Food Allergies
          </label>

          <textarea
            name="allergies"
            placeholder="e.g., peanuts, shellfish, dairy (leave empty if none)"
            value={formData.allergies}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Practical Preferences */}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Practical Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Food Budget
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Cooking Time
            </label>

            <select
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1+ hours</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Daily Water Intake (liters)
          </label>

          <input
            type="number"
            name="waterIntake"
            placeholder="e.g., 2.5"
            min="0.5"
            max="10"
            step="0.1"
            value={formData.waterIntake}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            Additional Preferences
          </label>

          <textarea
            name="additionalPreferences"
            placeholder="Anything else you want the AI to consider?"
            value={formData.additionalPreferences}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition-all"
        >
          {loading ? "Generating Your Plan..." : "Generate Diet Plan"}
        </button>
      </form>

      {dietPlan && (
        <div className="mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Your Personalized Diet Plan
          </h2>

          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {dietPlan}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CreateDietPlan;
