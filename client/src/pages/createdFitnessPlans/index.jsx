import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlans, deletePlan, regeneratePlan } from "../../services/index";
import PlanCard from "../../components/plainCards/index";

function CreatedPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await getUserPlans();
      if (res?.success) setPlans(res.plans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this plan?")) return;
    try {
      const res = await deletePlan(id);
      if (res?.success) loadPlans();
    } catch (err) {
      alert("Failed to delete plan");
    }
  };

  const handleRegenerate = async (plan) => {
    // plan contains goal, duration, experienceLevel, etc.
    if (!confirm("Regenerate this plan (will create a new plan)?")) return;
    try {
      const payload = {
        goal: plan.goal,
        duration: plan.duration,
        experienceLevel: plan.experienceLevel,
        // optionally include other fields if stored
      };
      const res = await regeneratePlan(payload);
      if (res?.success) {
        alert("Regenerated successfully");
        loadPlans();
      }
    } catch (err) {
      alert("Regeneration failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">Your Fitness Plans</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-plan")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create New Plan
            </button>
            <button
              onClick={loadPlans}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Refresh
            </button>
          </div>
        </header>

        {loading ? (
          <p>Loading plans...</p>
        ) : plans.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">No plans yet</h3>
            <p className="text-gray-600 mb-4">
              Generate your first AI-powered fitness plan.
            </p>
            <button
              onClick={() => navigate("/create-plan")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              Create Plan
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <PlanCard
                key={p._id}
                plan={p}
                onView={() => navigate(`/plan/${p._id}`)}
                onDelete={() => handleDelete(p._id)}
                onRegenerate={() => handleRegenerate(p)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatedPlans;
