import React from "react";
import Navbar from "../Page/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Page/Shared/Footer";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-108px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayouts;
