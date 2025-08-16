import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";

// Import your images
import slide1 from "../../../assets/Banner/slide1.jpg";
import slide2 from "../../../assets/Banner/slide2.jpg";
import slide3 from "../../../assets/Banner/slide3.jpg";
import slide4 from "../../../assets/Banner/slide4.jpg";
import slide5 from "../../../assets/Banner/slide5.jpg";

// Banner content
const bannerData = [
  {
    image: slide1,
    text: "Efficient Facilities Maintenance",
    desc: "Implementing proactive maintenance strategies to minimize downtime and maximize the lifespan of building equipment and systems.",
  },
  {
    image: slide2,
    text: "Enhancing Building Security",
    desc: "Utilizing state-of-the-art security systems and protocols to safeguard occupants, assets, and sensitive information.",
  },
  {
    image: slide3,
    text: "Sustainable Energy Solutions",
    desc: "Integrating renewable energy sources, energy-efficient technologies, and sustainable practices for a greener future.",
  },
  {
    image: slide4,
    text: "Optimizing Tenant Experience",
    desc: "Delivering exceptional services and experiences to tenants, fostering satisfaction and community engagement.",
  },
  {
    image: slide5,
    text: "Streamlined Operations and Management",
    desc: "Efficient processes and technology-driven management to improve productivity and decision-making.",
  },
];

const Banner = () => {
  return (
    <div className="h-screen w-full bg-cover flex items-center justify-center relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={true}
        grabCursor={true}
        pagination={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper absolute top-0 left-0 w-full h-full transition-opacity"
        style={{ transitionDuration: "0.8s" }}
      >
        {bannerData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={item.image}
              alt={`slide${idx}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-7 px-4 text-white text-center">
              <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-md">
                {item.text}
              </h1>
              <p className="max-w-[700px] text-xl drop-shadow-md">
                {item.desc}
              </p>
              <Link
                to="/appartment"
                className="w-[250px] mt-5 hover:bg-[#c78960] hover:text-black text-center font-bold text-white p-2 border-2 border-white transition-all duration-300"
              >
                EXPLORE
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
