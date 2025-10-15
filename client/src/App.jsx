import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import AuthPage from "./pages/authPage";
import Dashboard from "./pages/dashBoard";
import CreatePlan from "./pages/createPlan";
import CreatedPlans from "./pages/createdFitnessPlans";
import PlanDetail from "./pages/planDetails";
import CreateDietPlan from "./pages/createDietPlan";
import YourDietPlans from "./pages/createdDietPlans";
import DietPlanDetails from "./pages/dietplanDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dash-board" element={<Dashboard />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/myplans" element={<CreatedPlans />} />
        <Route path="/plan/:id" element={<PlanDetail />} />
        <Route path="/create-diet" element={<CreateDietPlan />} />
        <Route path="/your-diet-plans" element={<YourDietPlans />} />
        <Route path="/diet-plan/:id" element={<DietPlanDetails />} />
      </Routes>
    </div>
  );
}

export default App;
