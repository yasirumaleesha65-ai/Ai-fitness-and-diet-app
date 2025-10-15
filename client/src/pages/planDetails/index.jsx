import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/fitness/plans/${id}`,
          {
            withCredentials: true,
          }
        );
        // backend should return { success, plan }
        if (res.data?.success) setPlan(res.data.plan);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!plan) return <p className="p-6">Plan not found</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{plan.goal}</h1>
            <p className="text-sm text-gray-500">
              {plan.experienceLevel} • {plan.duration}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          </div>
        </div>

        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {plan.aiPlan}
        </div>
      </div>
    </div>
  );
}

export default PlanDetail;
