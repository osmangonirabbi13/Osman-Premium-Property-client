import image from "../../../assets/Features/feature.jpg";
import image1 from "../../../assets/Features/feature2.jpg";
import design from "../../../assets/Features/design1.png";
import image2 from "../../../assets/Features/3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

export default function Features() {
  const featureData = [
    {
      image: image,
      title: "Living Room",
      desc: "A living room is a cozy space for relaxing and socializing, typically featuring seating, a coffee table, and entertainment.",
    },
    {
      image: image1,
      title: "Bad Room",
      desc: "A bedroom is a private space for sleeping and relaxation, typically featuring a bed, nightstands, and storage.",
    },
    {
      image: image2,
      title: "Kitchen",
      desc: "A kitchen is a functional space for cooking and meal preparation, typically equipped with appliances, cabinets, and a sink.      ",
    },
  ];

  return (
    <div className="w-full pt-10 bg-[#ffefe5] dark:bg-gray-900 dark:text-white">
      <div className="mx-auto grid grid-cols-1 relative lg:grid-cols-2 gap-5 md:gap-0">
        <div className="w-full order-2 lg:order-none">
          <img src={image} className="w-full" alt="" />
        </div>
        <div className="py-10 px-3 mb-5 w-full gap-1  lg:order-none">
          <h3 className=" uppercase text-4xl font-bold  text-[#2c241e] dark:bg-gray-900 dark:text-white">
            Residences
          </h3>
          <img src={design} alt="" className="w-[220px] " />
          <small className="w-full pt-2 text-xl">
            Spacious light-filled condominium residences, with panoramic views.
            An architectural wonder designed by Jean Nouvel.
          </small>
        </div>

        <div className="md:w-[600px] lg:w-[800px] w-full p-3 h-[250px] static md:absolute   md:top-[30%] md:left-[50%] md:translate-y-[-30%] md:translate-x-[-50%] lg:absolute lg:top-[60%] lg:translate-x-[-20%]">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            loop={true}
            grabCursor={true}
            modules={[Autoplay]}
            className="mySwiper bg-[#b6a99c] dark:bg-gray-900 dark:text-white w-full h-full transition-opacity"
            style={{ transitionDuration: "0.8s" }}
          >
            {featureData.map((item, idx) => {
              return (
                <SwiperSlide key={idx} className=" flex relative grid-cols-2">
                  <div className="w-1/2 absolute left-0 flex flex-col justify-start pt-10 pl-6">
                    <h2 className="uppercase text-md my-3 text-white md:text-2xl lg:text-3xl font-medium">
                      {item.title}
                    </h2>
                    <small className=" text-left text-white">{item.desc}</small>
                  </div>
                  <img
                    src={item.image}
                    alt={`slide${idx}`}
                    className="absolute right-0 w-1/2 h-full object-cover"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
