import React, { useState } from "react";
import axios from "axios";

const CreateDietPlan = () => {
  const [goal, setGoal] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [dailyCalories, setDailyCalories] = useState("");
  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDietPlan("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/diet/create",
        {
          goal,
          dietaryPreference,
          dailyCalories,
        },
        { withCredentials: true }
      );

      if (response.data?.success && response.data?.plan?.aiPlan) {
        setDietPlan(response.data.plan.aiPlan);
      } else {
        alert("No diet plan received from server.");
      }
    } catch (error) {
      console.error("Error generating diet plan:", error);
      alert("Failed to generate diet plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
        Create Your Diet Plan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Goal</label>
          <input
            type="text"
            placeholder="e.g., Muscle Gain, Fat Loss, Maintenance"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Dietary Preference
          </label>
          <select
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select...</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Keto">Keto</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">
            Daily Calories
          </label>
          <input
            type="number"
            placeholder="e.g., 2000"
            value={dailyCalories}
            onChange={(e) => setDailyCalories(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          {loading ? "Generating..." : "Generate Diet Plan"}
        </button>
      </form>

      {dietPlan && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Your Personalized Diet Plan 🍽️
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
