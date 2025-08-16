import React from "react";
import { useLoaderData, Link } from "react-router";
import {
  FaDoorOpen,
  FaBuilding,
  FaLayerGroup,
  FaDollarSign,
} from "react-icons/fa";

const HomeCard = () => {
  const data = useLoaderData();
  const apartments = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Your Perfect Home
      </h1>
      <p className="text-xl mb-6 text-center">
        Easy booking for hassle-free apartment viewings
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 max-w-7xl mx-auto">
        {apartments.map((apartment) => (
          <div
            key={apartment._id}
            className="border border-[#E5E7EB] p-4 rounded shadow hover:shadow-md transition flex flex-col h-full"
          >
            <img
              src={apartment.thumbnail}
              alt="Apartment"
              className="h-48 w-full object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="mt-2 font-bold text-lg flex items-center gap-2">
                <FaDoorOpen />
                {apartment.floor} Floor - Apartment {apartment.apartmentNo}
              </h3>
              <p className="flex items-center gap-2">
                <FaBuilding /> Block: {apartment.block}
              </p>
              <p className="flex items-center gap-2">
                <FaLayerGroup /> Floor: {apartment.floor}
              </p>
              <p className="flex items-center gap-2">
                <FaDollarSign /> Rent: ${apartment.rent}
              </p>
            </div>

            <Link
              to={`/apartment/${apartment._id}`}
              className="w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition block mt-4"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Centered VIEW ALL button below the grid */}
      <div className="flex justify-center mt-8">
        <Link
          to="/appartment"
          className="text-center px-8 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
