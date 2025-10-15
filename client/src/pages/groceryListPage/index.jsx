import React, { useState } from "react";
import axios from "axios";

export default function GroceryListGenerator({ dietPlanId }) {
  const [loading, setLoading] = useState(false);
  const [groceryList, setGroceryList] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setGroceryList("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/grocery/create",
        { dietPlanId },
        { withCredentials: true }
      );

      if (response.data.success) {
        setGroceryList(response.data.groceryList.groceryItems);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error generating grocery list:", error);
      alert("Failed to generate grocery list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grocery-generator">
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Grocery List 🛒"}
      </button>

      {groceryList && (
        <div className="grocery-output">
          <h3>Your AI Grocery List:</h3>
          <pre>{groceryList}</pre>
        </div>
      )}
    </div>
  );
}
