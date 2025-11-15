import axios from "axios";
export const callSignUpUser = async (formdata) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      formdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const callSignInUser = async (formdata) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/signin",
      formdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const callLogOutUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

const API = axios.create({
  baseURL: "http://localhost:3000/api/fitness",
  withCredentials: true,
});

// get all plans for logged-in user
export const getUserPlans = async () => {
  try {
    const res = await API.get("/plans");
    return res.data;
  } catch (err) {
    console.error("getUserPlans error:", err);
    throw err;
  }
};

// delete a plan by id
export const deletePlan = async (planId) => {
  try {
    const res = await API.delete(`/${planId}`);
    return res.data;
  } catch (err) {
    console.error("deletePlan error:", err);
    throw err;
  }
};

// regenerate 
export const regeneratePlan = async (payload) => {
  try {
    const res = await API.post("/create", payload);
    return res.data;
  } catch (err) {
    console.error("regeneratePlan error:", err);
    throw err;
  }
};
