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

        if (location.pathname === "/auth") {
          navigate("/dash-board");
        }
      } else {
        if (location.pathname !== "/auth") {
          if (location.pathname !== "/") {
            navigate("/auth");
          }
        }
      }
    } catch (error) {
      console.log("Auth check failed:", error);

      if (location.pathname !== "/" && location.pathname !== "/auth") {
        navigate("/auth");
      }
    }
  };

  const fetchFitnessPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/fitness/plans",
        { withCredentials: true },
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
