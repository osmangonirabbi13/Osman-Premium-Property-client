import React from "react";
import Banner from "../Banner/Banner";
import WelcomeHome from "../WelcomeHome/WelcomeHome";
import ProjectOverview from "../ProjectOverview/ProjectOverview";
import Features from "../Features/Features";
import Location from "../Location/Location";
import WeProvide from "../WeProvide/WeProvide";
import Testimonial from "../Testimonial/Testimonial";
import Compani from "../Company/Company";
import HomeCard from "../HomeCard/HomeCard";

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeHome />
      <HomeCard />
      <ProjectOverview />
      <Features />
      <Location />
      <WeProvide />
      <Testimonial />
      <Compani />
    </div>
  );
};

export default Home;
