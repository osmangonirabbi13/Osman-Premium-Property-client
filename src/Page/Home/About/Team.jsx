import React from "react";
import design from "../../../assets/WelcomeHome-Img/design1.png";
const Team = () => {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center py-10">
        <div className="flex mb-5 flex-col max-w-[350px] gap-1">
          <h3 className="text-center uppercase text-xl text-[#c78960]">
            Our Team
          </h3>
          <img src={design} className="w-[150px] mx-auto" alt="" />
          <h1 className="text-2xl font-bold text-center md:text-3xl my-3">
            Meet Our Amazing Team
          </h1>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="w-full relative border-2 border-[#2c241e] flex justify-center items-center">
            <div className="absolute bg-[#2c241e] flex flex-col justify-center items-center bottom-0 p-1 px-5">
              <h3 className="text-white">John Doe</h3>
              <small className="text-white uppercase">Founder</small>
            </div>
            <img
              src="https://i.ibb.co/sd4hhqkR/portrait-white-man-isolated.jpg"
              className="w-full"
              alt=""
            />
          </div>
          <div className="w-full  relative border-2 border-[#2c241e] flex justify-center items-center">
            <div className="absolute bg-[#2c241e] flex flex-col justify-center items-center bottom-0 p-1 px-5">
              <h3 className="text-white">Leela John</h3>
              <small className="text-white">PROPERTY MANAGEMENT</small>
            </div>
            <img
              src="https://i.ibb.co/8LtdxbbM/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg"
              className="w-full"
              alt=""
            />
          </div>
          <div className="w-full  relative border-2 border-[#2c241e] flex justify-center items-center">
            <div className="absolute bg-[#2c241e] flex flex-col justify-center items-center bottom-0 p-1 px-5">
              <h3 className="text-white">Connor Flores</h3>
              <small className="text-white">ARCHITECT</small>
            </div>
            <img
              src="https://i.ibb.co/Pz0Jzbwd/4.jpg"
              className="w-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
