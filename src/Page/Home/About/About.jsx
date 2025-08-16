import React from "react";
import BGimg from "../../../assets/About/south.jpg";
import image from "../../../assets/About/aboutus.jpg";
import AboutText from "./AboutText";
import DesignQuote from "./DesignQuote";
import Exparieance from "./Exparieance";
import FeatureCard from "./FeatureCard";
import Team from "./Team";
import Company from "../Company/Company";

const About = () => {
  return (
    <div>
      <div className="w-full">
        <div
          className="w-full h-[500px] flex justify-center items-center bg-center bg-fixed bg-cover bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BGimg})`,
          }}
        >
          <h1 className="text-white font-extrabold text-5xl md:text-7xl uppercase">
            About us
          </h1>
        </div>
        <AboutText></AboutText>
        <DesignQuote></DesignQuote>
        <Exparieance></Exparieance>
        <FeatureCard></FeatureCard>
        <div className="w-full py-10 dark:bg-gray-900 dark:text-white">
          <div className="container mx-auto ">
            <img src={image} className="w-full" alt="" />
          </div>
        </div>
        <Team></Team>
        <Company></Company>
      </div>
    </div>
  );
};

export default About;
