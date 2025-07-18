import { Link } from "react-router";
import { MdSlowMotionVideo, MdArrowRightAlt } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { useState } from "react";
import leftimg from "../../../assets/WelcomeHome-Img/image1.jpg";
import bgimg from "../../../assets/WelcomeHome-Img/image3.jpg";
import design from "../../../assets/WelcomeHome-Img/design1.png";
import img from "../../../assets/WelcomeHome-Img/image2.jpg";

export default function WelcomeHome() {
  const [whatch, setWhatch] = useState(false);

  return (
    <div className="bg-[#2c241e] relative w-full ">
      {/* -----------social icon div---------------- */}
      <div className="w-full h-[80px] z-40 customIndex static sm:absolute -top-[80px] grid sm:flex-row-reverse sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        <div className="w-full col-span-1 md:col-span-2 flex justify-center bg-slate-400 sm:bg-transparent sm:justify-end items-center gap-3 sm:gap-10 h-full">
          <Link
            to="https://web.facebook.com/"
            className="text-white mr-3 sm:mr-10 iconFamily"
          >
            <li>
              <small className="letterSpaceing">Facebook</small>
            </li>
          </Link>
          <Link
            to="https://www.instagram.com/"
            className="text-white mr-3 sm:mr-10 iconFamily"
          >
            <li>
              <small className="letterSpaceing">Instagram</small>
            </li>
          </Link>
          <Link
            to="https://x.com/home"
            className="text-white mr-3 sm:mr-10 iconFamily"
          >
            <li>
              <small className="letterSpaceing">Twitter</small>
            </li>
          </Link>
        </div>
        <div className="w-full h-full flex gap-3 sm:gap-10 justify-center sm:justify-start items-center bg-[#c78960]">
          <button
            onClick={() => setWhatch(!whatch)}
            className="flex gap-3 justify-center items-center ml-3 sm:ml-10 text-white hover:text-black"
          >
            <MdSlowMotionVideo className="text-2xl" />{" "}
            <small>WATCH Video</small>
          </button>
          <Link
            to={`/appartment`}
            className="flex gap-3 justify-center items-center ml-3 sm:ml-10 text-white hover:text-black"
          >
            <small>MODEL UNITES</small> <MdArrowRightAlt className="text-2xl" />
          </Link>
        </div>
      </div>
      {/* ------------------ifren video div --------------------- */}
      <div
        className={`fixed top-0 left-0 w-full h-full  z-[9999] ${
          whatch ? "flex" : "hidden"
        } justify-center items-center`}
      >
        <div className="relative md:w-[750px] w-[90%] h-[400px] md:h-[450px] bg-black rounded-md overflow-hidden shadow-lg">
          <div className="w-full p-3 flex justify-end items-center">
            <IoIosRemoveCircle
              onClick={() => setWhatch(false)}
              className="text-3xl cursor-pointer text-white hover:text-gray-400"
            />
          </div>
          <iframe
            className="w-full h-[calc(100%-48px)]" // 48px is approx height of header div
            src="https://www.youtube.com/embed/EwvPemppoJM?si=xEeugLjriv63SeXe"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* ----------------Section container------------------- */}
      <div className="w-full flex p-3 sm:p-5 md:p-10 justify-center overflow-hidden items-center bg-[#2c241e] relative min-h-screen">
        <div className="w-full md:min-w-[66%] h-full absolute top-0">
          <img
            src={bgimg}
            alt=""
            className=" bottom-0 absolute left-0 object-cover"
          />
        </div>
        <div className="hidden md:block md:w-[33.34%] h-full z-0 absolute top-0 right-0">
          <img
            src={leftimg}
            alt=""
            className="h-full w-full absolute left-0 top-0 object-cover"
          />
        </div>
        {/* ----------------------contamtDiv------------------ */}
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-10">
          <div className="w-full z-10 md:w-1/2">
            <div className="flex mb-5 flex-col w-[220px] gap-1">
              <h3 className="text-center uppercase text-xl text-[#c78960]">
                about the building
              </h3>
              <img src={design} alt="" />
            </div>
            <h1 className="text-left text-3xl md:text-5xl text-[#c78960]">
              The Building You Never Need To Leave
            </h1>
            <p className="text-justify text-[#c78960] text-md  my-10">
              Featuring a refined palette of natural materials, the open living
              spaces provide a warm counterpoint to the soaring ceilings and
              full-height windows. Custom herringbone floors and hand-selected
              stone bring a rich tactility to the rooms.
            </p>
            <p className="text-justify text-[#c78960] text-2xl mb-10  ml-10">
              The design for Osman Premium Property came from looking at the
              city`s existing buildings and thinking about which ones you might
              want to live in, not just look at.
            </p>
            <Link
              to={"/appartment"}
              className="cursor-pointer text-center p-1 hover:text-[#2c241e] hover:bg-[#c78960] border-b-2 border-[#c78960] text-[#c78960] m-10"
            >
              SEE RESIDENCES
            </Link>
          </div>
          <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            <img
              src={img}
              alt=""
              className="shadow-md z-10 border-2 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
