import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogOut() {
    const result = await axios.post(
      "http://localhost:3000/api/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (result.data?.success) {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          🏋️‍♂️ FitAI Dashboard
        </h1>
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-bold text-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Welcome back, <span className="text-blue-400">Champion!</span>
        </h2>
        <p className="text-gray-300 mt-2 max-w-lg mx-auto">
          Track your progress, create personalized AI workout plans, and stay
          consistent on your fitness journey.
        </p>
      </section>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          onClick={() => navigate("/myplans")}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition cursor-pointer"
        >
          <h3 className="text-xl font-bold mb-2">📋 Your Fitness Plans</h3>
          <p className="text-gray-400">View all your AI-generated plans.</p>
        </div>

        <div
          onClick={() => navigate("/create-plan")}
          className="bg-blue-600 p-6 rounded-2xl shadow-lg text-center hover:bg-blue-700 hover:scale-105 transition cursor-pointer"
        >
          <h3 className="text-xl font-bold mb-2">⚡ Create New Plan</h3>
          <p className="text-gray-200">
            Generate a customized workout plan using AI.
          </p>
        </div>

        <div
          onClick={() => navigate("/create-diet")}
          className="bg-green-600 p-6 rounded-2xl shadow-lg text-center
          hover:bg-green-700 hover:scale-105 transition cursor-pointer"
        >
          <h3 className="text-xl font-bold mb-2">
            🍎 Create Your Own Nutrition Plan
          </h3>
          <p className="text-gray-100">
            Explore personalized meal recommendations.
          </p>
        </div>

        <div
          onClick={() => navigate("/your-diet-plans")}
          className="bg-purple-700 p-6 rounded-2xl shadow-lg text-center hover:bg-purple-800 hover:scale-105 transition cursor-pointer"
        >
          <h3 className="text-xl font-bold mb-2">📊 Your Diet Plans</h3>
          <p className="text-gray-100">
            View all your AI-generated Diet plans.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
