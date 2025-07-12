import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import BGimg from "../../assets/About/south.jpg";
import {
  FaBuilding,
  FaLayerGroup,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaDoorOpen,
  FaCar,
  FaPaw,
  FaArrowAltCircleUp,
} from "react-icons/fa";

const ApartmentDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: apartment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-apartments/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (apartment && !selectedImage) {
      setSelectedImage(apartment.thumbnail || apartment.images?.[0]);
    }
  }, [apartment, selectedImage]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading apartment.</p>;

  const images = [apartment.thumbnail, ...(apartment.images || [])].filter(
    Boolean
  );

  return (
    <>
      {/* 🔷 Background Banner Section */}
      <div
        className="w-full h-[300px] md:h-[450px]  flex justify-center items-center bg-center bg-fixed bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BGimg})`,
        }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Apartment Details
        </h1>
      </div>

      {/* 🔶 Main Content Section */}
      <div className="max-w-full lg:max-w-[1260px] mx-auto  mt-3 relative z-10">
        {/* ===== Desktop Layout ===== */}
        <div className="hidden lg:grid grid-cols-3 gap-2 h-[450px]">
          {/* Left large image */}
          <div className="col-span-2">
            <img
              src={selectedImage}
              alt="Main"
              className="w-full h-full lg:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Right 2x2 thumbnails */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {images.slice(1, 5).map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80"
                alt={`Thumb ${idx}`}
              />
            ))}
          </div>
        </div>

        {/* ===== Mobile/Tablet Layout with Swiper ===== */}
        <div className="block lg:hidden">
          {/* Selected Image */}
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 md:h-[500px] object-cover rounded-lg mb-3"
            />
          </div>

          {/* Scrollable/swipeable thumbnails */}
          <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            autoplay={{ delay: 2500 }}
            modules={[Autoplay]}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} style={{ width: "96px" }}>
                <img
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border hover:border-blue-500 ${
                    selectedImage === img ? "border-4 border-blue-500" : ""
                  }`}
                  alt={`Thumb ${idx}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Apartment Info Box */}
        <div className=" bg-[#111] p-4 mt-6 lg:mt-16 mb-6 lg:pt-20 text-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {apartment.floor} Floor - Apartment {apartment.apartmentNo}
            <span className="float-start md:float-right text-xl font-bold">
              Rent: ${apartment.rent}
            </span>
          </h2>
          <p className="text-gray-300 mb-4">
            <br />
            Affordable {apartment.bedrooms}-bedroom apartment with basic
            amenities.
          </p>{" "}
          {/* Apartment Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FaDoorOpen />
              <span>Apartment: {apartment.apartmentNo}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLayerGroup />
              <span>Floor: {apartment.floor}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding />
              <span>Block: {apartment.block}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRulerCombined />
              <span>Size: {apartment.size} SqFt</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBed />
              <span>Bedrooms: {apartment.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath />
              <span>Bathrooms: {apartment.bathrooms}</span>
            </div>
          </div>
          {/* Amenities */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Apartment Amenities</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              {apartment.hasParking && (
                <div className="flex items-center gap-2">
                  <FaCar className="text-green-400" />
                  <span>Parking</span>
                </div>
              )}
              {apartment.hasElevator && (
                <div className="flex items-center gap-2">
                  <FaArrowAltCircleUp className="text-green-400" />
                  <span>Elevator</span>
                </div>
              )}
              {apartment.isPetFriendly && (
                <div className="flex items-center gap-2">
                  <FaPaw className="text-green-400" />
                  <span>Pet Friendly</span>
                </div>
              )}
            </div>
          </div>
          {/* Agreement Button */}
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
            Agreement
          </button>
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;
