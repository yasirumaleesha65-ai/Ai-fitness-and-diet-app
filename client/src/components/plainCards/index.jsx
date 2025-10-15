import React from "react";

function PlanCard({ plan, onView, onDelete, onRegenerate }) {
  const preview = plan.aiPlan ? plan.aiPlan.slice(0, 200) + "..." : "";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-1">{plan.goal}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {plan.experienceLevel || plan.experienceLevel} • {plan.duration}
        </p>
        <p className="text-gray-700 text-sm whitespace-pre-wrap">{preview}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          View
        </button>
        <button
          onClick={onRegenerate}
          className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
        >
          Regenerate
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
