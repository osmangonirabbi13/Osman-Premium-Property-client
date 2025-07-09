import React from "react";
import Banner from "../Banner/Banner";
import WelcomeHome from "../WelcomeHome/WelcomeHome";
import ProjectOverview from "../ProjectOverview/ProjectOverview";
import Features from "../Features/Features";
import Location from "../Location/Location";
import WeProvide from "../WeProvide/WeProvide";

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeHome />
      <ProjectOverview />
      <Features />
      <Location />
      <WeProvide />
    </div>
  );
};

export default Home;
