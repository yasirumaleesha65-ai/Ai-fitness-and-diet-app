import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function DietPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/diet/plans/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setPlan(response.data.plan);
        }
      } catch (error) {
        console.error("Error fetching diet plan:", error);
      }
    };
    fetchPlan();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/diet/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert("Plan deleted successfully!");
        navigate("/your-diet-plans");
      }
    } catch (error) {
      console.error("Error deleting diet plan:", error);
    }
  };

  if (!plan) return <p className="text-center mt-20">Loading plan...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">{plan.goal}</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        {plan.dietaryPreference} • {plan.dailyCalories} calories/day
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-3xl font-bold border-b pb-2 mt-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-2xl font-semibold mt-4 text-gray-800"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-xl font-semibold mt-3 text-gray-700"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                className="ml-4 list-disc text-gray-800 leading-relaxed"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-800 leading-relaxed mb-2" {...props} />
            ),
          }}
        >
          {plan.aiPlan}
        </ReactMarkdown>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Delete Plan
        </button>
      </div>
    </div>
  );
}

export default DietPlanDetails;
