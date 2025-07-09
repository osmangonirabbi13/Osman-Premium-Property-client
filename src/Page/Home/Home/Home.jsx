import React from "react";
import Banner from "../Banner/Banner";
import WelcomeHome from "../WelcomeHome/WelcomeHome";
import ProjectOverview from "../ProjectOverview/ProjectOverview";
import Features from "../Features/Features";
import Location from "../Location/Location";
import WeProvide from "../WeProvide/WeProvide";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeHome />
      <ProjectOverview />
      <Features />
      <Location />
      <WeProvide />
      <Testimonial />
    </div>
  );
};

export default Home;
