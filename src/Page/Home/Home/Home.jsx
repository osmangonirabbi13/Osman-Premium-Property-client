import React from "react";
import Banner from "../Banner/Banner";
import WelcomeHome from "../WelcomeHome/WelcomeHome";
import ProjectOverview from "../ProjectOverview/ProjectOverview";
import Features from "../Features/Features";

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeHome />
      <ProjectOverview />
      <Features />
    </div>
  );
};

export default Home;
