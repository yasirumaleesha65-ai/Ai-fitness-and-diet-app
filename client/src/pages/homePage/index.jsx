import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-extrabold text-green-400 tracking-wide">
          FitAI<span className="text-white">Trainer</span>
        </h1>
        <button
          onClick={() => navigate("/auth")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
        >
          Login
        </button>
      </header>

      {/* Main Hero Content */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-16">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Transform Your Fitness Journey with{" "}
            <span className="text-green-400">AI Power</span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Get personalized fitness plans, nutrition advice, and progress
            tracking — all powered by cutting-edge AI. Your transformation
            starts here. Stay consistent. Stay strong.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6">
            <button
              onClick={() => navigate("/auth")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Join Now
            </button>
            <button
              onClick={() => navigate("/create-plan")}
              className="border border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Create Fitness Plan
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
            alt="AI Fitness"
            className="rounded-2xl shadow-2xl max-w-md md:max-w-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        © {new Date().getFullYear()} FitAI Trainer. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
