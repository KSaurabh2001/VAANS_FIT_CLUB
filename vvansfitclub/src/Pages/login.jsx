import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../Component/Login";

const Auth = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex">
      {/* Left 75% Background Video */}
      <div className="absolute top-0 left-0 w-3/4 h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Auth.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right 25% Dimmed Video */}
      <div className="absolute top-0 right-0 w-1/4 h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Auth2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Left Section – Branding */}
        <div className="w-1/2 flex flex-col justify-center items-center text-center px-10">
          <div className="bg-white/10 px-8 py-6 rounded-xl backdrop-blur-sm shadow-2xl border border-white/20">
            <h1
              className="text-7xl font-extrabold bg-gradient-to-r from-red-800 via-red-600 to-gray-600 bg-clip-text text-transparent drop-shadow-lg mb-4"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
              }}
            >
              VVANS Fit Club
            </h1>
            <p className="text-white text-lg font-medium max-w-md leading-relaxed">
              Transform your body, elevate your spirit, and unleash your inner strength with VVANS Fit Club.
            </p>
          </div>
        </div>

        {/* Right Section – Form (Sign In/Sign Up) */}
        <div className="w-1/2 flex items-center justify-center px-6">

          <Login />


        </div>
      </div>
    </div>
  );
};

export default Auth;
