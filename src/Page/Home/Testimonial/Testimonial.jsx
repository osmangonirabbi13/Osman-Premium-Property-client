import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import design from "../../../assets/WelcomeHome-Img/design1.png";
import image from "../../../assets/WelcomeHome-Img/image2.jpg";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row items-center">
      {/* Left: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={image}
          alt="NYC View"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Review Swiper */}
      <div className="w-full md:w-1/2 flex flex-col items-center py-10">
        <div className="flex flex-col gap-1 items-center mb-6">
          <h3 className="uppercase font-bold text-xl text-[#c78960]">
            Customer Reviews
          </h3>
          <img src={design} alt="divider" />
        </div>

        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          className="w-[90%]"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="text-center px-4">
                <FaQuoteLeft className="text-[50px] text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-700 italic mb-4">
                  {review.details}
                </p>
                <h3 className="text-xl font-semibold text-orange-500">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
