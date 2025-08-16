import React from "react";
import { Outlet } from "react-router";
import animationData from "../assets/Lottie/register.json";
import Logoosman from "../Page/Shared/Logoosman";
import Navbar from "../Page/Shared/Navbar";
import Lottie from "lottie-react";
const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Image Section - Updated */}
        <div className="w-full lg:w-1/2  bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center p-6">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 dark:text-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-6 text-left">
              <Logoosman />
            </div>

            {/* Form Content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
