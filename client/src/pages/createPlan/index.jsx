import React, { useState } from "react";
import axios from "axios";
import { useFitnessApp } from "../../context/index";

function CreatePlan() {
  const { fetchFitnessPlans } = useFitnessApp();
  const [formData, setFormData] = useState({
    goal: "",
    duration: "",
    experienceLevel: "Beginner",
  });
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiPlan("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/fitness/create",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setAiPlan(response.data.plan.aiPlan);
        fetchFitnessPlans(); // refresh context
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
        Create Your Personalized Fitness Plan 🏋️‍♂️
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4"
      >
        <input
          type="text"
          name="goal"
          placeholder="Your fitness goal (e.g., Build muscle)"
          value={formData.goal}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 6 weeks)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
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
