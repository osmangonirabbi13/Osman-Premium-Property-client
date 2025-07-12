import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

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
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ApartmentDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch apartment details
  const {
    data: apartment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-apartments/${id}`);
      return res.data;
    },
  });

  // Fetch user agreement status if user logged in
  const { data: agreementStatus, refetch: refetchAgreementStatus } = useQuery({
    queryKey: ["agreementStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/agreements/user-status?email=${user.email}`
      );
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

  // Handler for Agreement button click
  const handleAgreementClick = async () => {
    if (!user?.email) {
      toast.error("Please log in to request an agreement.");
      return;
    }

    // If user role is member, no new agreement allowed
    if (agreementStatus?.role === "member") {
      toast.error("Members cannot request a new agreement");
      return;
    }

    // If request pending
    if (agreementStatus?.status === "pending") {
      toast("Your agreement request is pending admin approval.");
      return;
    }

    // If approved, redirect to payment page
    if (agreementStatus?.status === "approved") {
      navigate("/payment");
      return;
    }

    // Otherwise, no agreement or rejected, send new request
    try {
      const requestData = {
        floorNo: apartment.floor,
        blockNo: apartment.block,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
      };

      const res = await axiosSecure.post(
        `/agreement?email=${user.email}`,
        requestData
      );

      if (res.data.message.includes("submitted")) {
        toast.success("Agreement request submitted successfully!");
        refetchAgreementStatus();
      } else {
        toast.error(res.data.message || "Failed to submit request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting agreement request");
    }
  };

  return (
    <>
      {/* Background Banner */}
      <div
        className="w-full h-[300px] md:h-[450px] flex justify-center items-center bg-center bg-fixed bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BGimg})`,
        }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Apartment Details
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-full lg:max-w-[1260px] mx-auto mt-3 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-2 h-[450px]">
          <div className="col-span-2">
            <img
              src={selectedImage}
              alt="Main"
              className="w-full h-full lg:h-[500px] object-cover rounded-lg"
            />
          </div>

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

        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 md:h-[500px] object-cover rounded-lg mb-3"
            />
          </div>

          {/* Swiper thumbnails if you want */}
          {/* ... can keep your swiper here */}
        </div>

        {/* Apartment Info */}
        <div className="bg-[#111] p-4 mt-6 lg:mt-16 mb-6 lg:pt-20 text-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {apartment.floor} Floor - Apartment {apartment.apartmentNo}
            <span className="float-start md:float-right text-xl font-bold">
              Rent: ${apartment.rent}
            </span>
          </h2>
          <p className="text-gray-300 mb-4">
            Affordable {apartment.bedrooms}-bedroom apartment with basic
            amenities.
          </p>

          {/* Info Grid */}
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
          <button
            onClick={handleAgreementClick}
            className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Agreement
          </button>
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;
