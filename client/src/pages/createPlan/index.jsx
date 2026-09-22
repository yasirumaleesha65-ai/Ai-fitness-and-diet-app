import React, { useState } from "react";
import axios from "axios";
import { useFitnessApp } from "../../context/index";

function CreatePlan() {
  const { fetchFitnessPlans } = useFitnessApp();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    targetWeight: "",
    duration: "",
    experienceLevel: "Beginner",
    workoutDays: "3",
    sessionDuration: "60",
    workoutLocation: "Gym",
    equipment: "",
    workoutType: "Strength Training",
    activityLevel: "Moderate",
    dietPreference: "No specific preference",
    injuries: "",
    additionalPreferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiPlan("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/fitness/create",
        formData,
        { withCredentials: true },
      );

      if (response.data.success) {
        setAiPlan(response.data.plan.aiPlan);
        fetchFitnessPlans();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Your Personalized Fitness Plan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl flex flex-col gap-4"
      >
        {/* Basic Information */}
        <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>

        <input
          type="number"
          name="age"
          placeholder="Age"
          min="13"
          max="100"
          value={formData.age}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            min="100"
            max="250"
            value={formData.height}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            min="30"
            max="300"
            value={formData.weight}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />
        </div>

        {/* Goals */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">Fitness Goals</h2>

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        >
          <option value="">Select your goal</option>
          <option value="Build muscle">Build muscle</option>
          <option value="Lose fat">Lose fat</option>
          <option value="Lose weight">Lose weight</option>
          <option value="Gain weight">Gain weight</option>
          <option value="Improve strength">Improve strength</option>
          <option value="Improve endurance">Improve endurance</option>
          <option value="Improve fitness">Improve overall fitness</option>
          <option value="Maintain fitness">Maintain current fitness</option>
        </select>

        <input
          type="number"
          name="targetWeight"
          placeholder="Target weight (kg) - optional"
          min="30"
          max="300"
          value={formData.targetWeight}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="duration"
          placeholder="Plan duration (e.g., 8 weeks)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        {/* Experience */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">
          Experience & Activity
        </h2>

        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="Sedentary">Sedentary - little exercise</option>
          <option value="Light">Lightly active - 1-2 days/week</option>
          <option value="Moderate">Moderately active - 3-4 days/week</option>
          <option value="Very Active">Very active - 5-6 days/week</option>
          <option value="Extremely Active">
            Extremely active - daily intense activity
          </option>
        </select>

        {/* Workout Preferences */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">
          Workout Preferences
        </h2>

        <select
          name="workoutDays"
          value={formData.workoutDays}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="2">2 days per week</option>
          <option value="3">3 days per week</option>
          <option value="4">4 days per week</option>
          <option value="5">5 days per week</option>
          <option value="6">6 days per week</option>
          <option value="7">7 days per week</option>
        </select>

        <select
          name="sessionDuration"
          value={formData.sessionDuration}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
          <option value="120">120 minutes</option>
        </select>

        <select
          name="workoutLocation"
          value={formData.workoutLocation}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="Gym">Gym</option>
          <option value="Home">Home</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Mixed">Mixed</option>
        </select>

        <select
          name="workoutType"
          value={formData.workoutType}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="Strength Training">Strength Training</option>
          <option value="Cardio">Cardio</option>
          <option value="HIIT">HIIT</option>
          <option value="Yoga">Yoga / Flexibility</option>
          <option value="Bodyweight">Bodyweight Training</option>
          <option value="Mixed">Mixed Training</option>
        </select>

        <textarea
          name="equipment"
          placeholder="Available equipment (e.g., dumbbells, barbell, treadmill)"
          value={formData.equipment}
          onChange={handleChange}
          rows="3"
          className="border p-3 rounded-lg"
        />

        {/* Nutrition */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">Nutrition</h2>

        <select
          name="dietPreference"
          value={formData.dietPreference}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="No specific preference">No specific preference</option>
          <option value="Balanced">Balanced diet</option>
          <option value="High Protein">High protein</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>

        {/* Limitations */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">
          Health & Limitations
        </h2>

        <textarea
          name="injuries"
          placeholder="Any injuries, physical limitations, or exercises you need to avoid? (Optional)"
          value={formData.injuries}
          onChange={handleChange}
          rows="3"
          className="border p-3 rounded-lg"
        />

        <textarea
          name="additionalPreferences"
          placeholder="Anything else you want the AI to consider? (Optional)"
          value={formData.additionalPreferences}
          onChange={handleChange}
          rows="3"
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Generating Plan..." : "Generate Plan"}
        </button>
      </form>

      {aiPlan && (
        <div className="bg-white shadow-lg rounded-2xl mt-8 p-6 max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Your AI Plan
          </h2>

          <pre className="whitespace-pre-wrap text-gray-800 text-lg">
            {aiPlan}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CreatePlan;
