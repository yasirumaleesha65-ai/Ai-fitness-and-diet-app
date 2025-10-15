import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function YourDietPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/diet/plans",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setPlans(response.data.plans);
        }
      } catch (error) {
        console.error("Error fetching diet plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Your Diet Plans</h1>

      {plans.length === 0 ? (
        <p className="text-center text-gray-600">No diet plans created yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <h2 className="text-2xl font-bold">{plan.goal}</h2>
              <p className="text-gray-700 mt-2">
                {plan.dietaryPreference} — {plan.dailyCalories} calories/day
              </p>
              <Link
                to={`/diet-plan/${plan._id}`}
                className="block mt-4 bg-black text-white text-center rounded-xl py-2 font-semibold hover:bg-gray-800 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourDietPlans;
