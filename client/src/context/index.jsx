import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const FitnessAppContext = createContext();

export const useFitnessApp = () => useContext(FitnessAppContext);

export const FitnessAppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fitnessPlans, setFitnessPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/auth", {
        withCredentials: true,
      });

      if (response.data?.success) {
        setUser(response.data.userInfo);

        // If user is on /auth (login/register) and already authenticated, redirect to dashboard
        if (location.pathname === "/auth") {
          navigate("/dash-board");
        }
      } else {
        // If user is not authenticated and trying to access other routes, send them to login
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      }
    } catch (error) {
      console.log("Auth check failed:", error);

      // On error, ensure user is redirected to /auth
      if (location.pathname !== "/auth") {
        navigate("/auth");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFitnessPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/fitness/plans",
        { withCredentials: true }
      );
      setFitnessPlans(response.data.plans || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate, location.pathname]);

  return (
    <FitnessAppContext.Provider
      value={{
        user,
        setUser,
        fitnessPlans,
        setFitnessPlans,
        fetchUser,
        fetchFitnessPlans,
        loading,
      }}
    >
      {children}
    </FitnessAppContext.Provider>
  );
};
