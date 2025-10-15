import { useNavigate } from "react-router-dom";
import { loginFormElements } from "../../config/index";
import { callSignInUser } from "../../services";
import CommonForm from "../commonForm";

function SignInComponent() {
  const navigate = useNavigate();

  async function onSignInSubmit(formData) {
    const formObject = Object.fromEntries(formData);
    console.log(formObject);
    const data = await callSignInUser(formObject);

    if (data.success) {
      navigate("/dash-board");
    }
  }

  return (
    <div className="w-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-3xl shadow-2xl p-6 sm:p-10">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-wide">
          Welcome Back 💪
        </h2>
        <p className="text-gray-100 text-base sm:text-lg">
          Sign in to track your workouts and reach your goals
        </p>
      </div>

      {/* Form */}
      <CommonForm
        buttonText={"Sign In"}
        formControls={loginFormElements}
        onHandleSubmit={onSignInSubmit}
      />

      {/* Footer Links */}
      <div className="text-center mt-5">
        <p className="text-gray-200 text-sm">
          Don’t have an account?{" "}
          <span className="text-white font-semibold cursor-pointer hover:underline">
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignInComponent;
