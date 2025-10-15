import { useState } from "react";
import SignUpComponent from "../../components/signUpComponent";
import SignInComponent from "../../components/signInComponent";

function AuthPage() {
  const [register, setRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-900/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center gap-6 border border-gray-700">
        {/* Branding */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-400 tracking-wide">
          FitAI<span className="text-white">Trainer</span>
        </h1>
        <p className="text-gray-400 text-center text-sm md:text-base">
          {register
            ? "Join us to start your AI-powered fitness journey!"
            : "Welcome back! Let’s continue your transformation."}
        </p>

        {/* Title */}
        <h2 className="font-bold text-2xl md:text-3xl mt-2">
          {register ? "Create an Account" : "Sign In to Continue"}
        </h2>

        {/* Auth Component */}
        <div className="w-full mt-4">
          {register ? <SignUpComponent /> : <SignInComponent />}
        </div>

        {/* Switch Button */}
        <button
          onClick={() => setRegister(!register)}
          className="w-full py-3 sm:py-4 text-lg font-semibold rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300 mt-4"
        >
          {register ? "Switch to Sign In" : "Switch to Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
