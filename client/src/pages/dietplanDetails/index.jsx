import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import html2pdf from "html2pdf.js";

function DietPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loadingGrocery, setLoadingGrocery] = useState(false);
  const [groceryList, setGroceryList] = useState("");
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/diet/plans/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) setPlan(response.data.plan);
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
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Plan deleted successfully!");
        navigate("/your-diet-plans");
      }
    } catch (error) {
      console.error("Error deleting diet plan:", error);
    }
  };

  const handleGenerateGroceryList = async () => {
    try {
      setLoadingGrocery(true);
      setGroceryList("");

      const response = await axios.post(
        "http://localhost:3000/api/grocery/create",
        { dietPlanId: id },
        { withCredentials: true }
      );

      if (response.data.success) {
        setGroceryList(response.data.groceryList.groceryItems);
        setShowGroceryModal(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error generating grocery list:", error);
      alert("Failed to generate grocery list. Please try again.");
    } finally {
      setLoadingGrocery(false);
    }
  };

  // ✅ Download PDF (patched for Tailwind oklch color issue)
  const handleDownloadPDF = () => {
    const element = pdfRef.current;

    // temporarily disable oklch color mode for snapshot
    const root = document.documentElement;
    const previousScheme = root.style.colorScheme;
    root.style.colorScheme = "light";

    const options = {
      margin: 0.5,
      filename: `${plan.goal.replace(/\s+/g, "_")}_Diet_Plan.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .finally(() => {
        // restore previous color scheme
        root.style.colorScheme = previousScheme;
      });
  };

  if (!plan) return <p className="text-center mt-20">Loading plan...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      <div ref={pdfRef} className="pdf-export">
        <h1 className="text-4xl font-bold mb-4 text-center capitalize">
          {plan.goal}
        </h1>
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

          {groceryList && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">Grocery List 🛒</h2>
              <pre className="whitespace-pre-wrap text-gray-700">
                {groceryList}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <button
          onClick={handleGenerateGroceryList}
          disabled={loadingGrocery}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {loadingGrocery
            ? "Generating Grocery List..."
            : "Generate Grocery List 🛒"}
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Download as PDF 📄
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Delete Plan
        </button>
      </div>

      {/* Grocery List Modal */}
      {showGroceryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowGroceryModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Grocery List 🛒
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {groceryList}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default DietPlanDetails;
