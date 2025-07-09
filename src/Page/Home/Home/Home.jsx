import React from "react";
import Banner from "../Banner/Banner";
import WelcomeHome from "../WelcomeHome/WelcomeHome";
import ProjectOverview from "../ProjectOverview/ProjectOverview";

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeHome />
      <ProjectOverview />
    </div>
  );
};

export default Home;
