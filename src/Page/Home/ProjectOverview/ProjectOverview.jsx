import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import design from "../../../assets/WelcomeHome-Img/design1.png";

const stats = [
  { end: 250, label: "SQUARE AREAS" },
  { end: 400, label: "CAR PARKING" },
  { end: 40, label: "APARTMENTS" },
  { end: 500, label: "ROOMS" },
];

const ProjectOverview = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full overflow-hidden flex  flex-col items-center p-2 md:p-5 xl:p-10 py-10 relative bg-[#ffefe5]"
    >
      <div className="w-full z-10 flex flex-col justify-center items-center">
        <h3 className="text-3xl uppercase text-[#312720] font-bold ">
          building overView
        </h3>
        <img src={design} alt="design" className="w-[250px]" />
      </div>

      <div className="container z-10 mx-auto py-10">
        <h1 className="text-3xl md:text-5xl text-center mb-7">
          What Makes A Home?
        </h1>
        <p className="max-w-[750px] mx-auto text-center">
          This attractive new neighbourhood for young families and active people
          delivers fresh contemporary living with numerous free-time
          opportunities. Ovocne sady’s high-quality and practical apartments
          with functional architecture, public spaces, and excellent options for
          sport and relaxation – all just steps from your new home.
        </p>
      </div>

      <div className="container z-10 mx-auto grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="w-full">
            <div
              className="w-full h-[50px]"
              style={{
                background:
                  "linear-gradient(-8deg,#2c241e57 0%,#2c241e57 50%, rgba(255, 0, 0, 0) 50%,rgba(255, 0, 0, 0) 100%)",
              }}
            ></div>
            <div className="w-full bg-[#2c241e57] p-3 flex py-7 flex-col justify-center items-center gap-1">
              <span className="text-6xl font-bold text-white">
                {visible ? <CountUp end={item.end} duration={1} /> : 0}
              </span>
              <span className="text-white tracking-wide">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <h1 className="md:text-[12vw] text-[100px] transform rotate-90 sm:rotate-0  md:pt-40 lg:pt-0 absolute font-bold uppercase text-[#ffe0ce]">
        building <br />
        <span className="ml-0 sm:ml-[100px]">Overview</span>
      </h1>
    </div>
  );
};

export default ProjectOverview;
