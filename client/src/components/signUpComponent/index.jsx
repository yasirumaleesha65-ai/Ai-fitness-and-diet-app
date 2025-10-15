import { registerFormElements } from "../../config/index";
import { callSignUpUser } from "../../services";
import CommonForm from "../commonForm";
import { useNavigate } from "react-router-dom";

function SignUpComponent() {
  const navigate = useNavigate();

  async function onSignUpSubmit(formData) {
    const FormData = Object.fromEntries(formData);
    const data = await callSignUpUser(FormData);
    console.log(FormData);

    if (data.success) {
      navigate("/dash-board");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      {/* Motivational Header */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700">
        Join the <span className="text-blue-600">FitLife</span> Community 💪
      </h2>
      <p className="text-gray-300 text-center font-medium text-base sm:text-lg max-w-md">
        Create your account to start your fitness journey with personalized
        AI-powered training and nutrition plans.
      </p>

      {/* Sign Up Form */}
      <div className="w-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-3xl shadow-md p-6 sm:p-8 mt-2 border border-gray-200">
        <CommonForm
          buttonText={"Sign Up"}
          formControls={registerFormElements}
          onHandleSubmit={onSignUpSubmit}
        />
      </div>
    </div>
  );
}

export default SignUpComponent;
