import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import BGimg from "../../assets/About/south.jpg";
import {
  FaLayerGroup,
  FaBuilding,
  FaDollarSign,
  FaDoorOpen,
} from "react-icons/fa";
import Loading from "../Shared/Loading";
const fetchApartments = async (axiosInstance, page, minRent, maxRent) => {
  let url = `/all-apartments?page=${page}`;
  if (minRent) url += `&minRent=${minRent}`;
  if (maxRent) url += `&maxRent=${maxRent}`;

  const res = await axiosInstance.get(url);
  return res.data;
};

const AllApartments = () => {
  const axiosInstance = useAxios();

  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [filter, setFilter] = useState({ min: "", max: "" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["apartments", page, filter.min, filter.max],
    queryFn: () => fetchApartments(axiosInstance, page, filter.min, filter.max),
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setFilter({ min: minRent, max: maxRent });
  };

  return (
    <>
      {/* 🔷 Banner Section */}
      <div
        className="w-full h-[300px] md:h-[450px] flex justify-center items-center bg-center bg-fixed bg-cover bg-no-repeat "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${BGimg})`,
        }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          All Apartments
        </h1>
      </div>

      {/* 🔶 Content Section Starts Below */}
      <div className="p-4 pt-16 max-w-8xl  lg:px-30 relative z-10 dark:bg-gray-900 dark:text-white">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-wrap gap-4 justify-center items-center"
        >
          <input
            type="number"
            placeholder="Min Rent"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            className="border rounded px-4 py-2 w-32"
          />
          <input
            type="number"
            placeholder="Max Rent"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="border rounded px-4 py-2 w-32"
          />
          <button
            type="submit"
            className="bg-[#1F4B3F] text-white py-2 rounded hover:bg-[#059445]  px-6  "
          >
            Search
          </button>
        </form>

        {/* Loading/Error State */}
        {isLoading && <Loading />}
        {isError && (
          <p className="text-center text-red-500 mt-10">Failed to load data.</p>
        )}

        {/* Apartment Cards */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data?.map((apartment) => (
                <Link
                  to={`/apartment/${apartment._id}`}
                  key={apartment._id}
                  className="block"
                >
                  <div className="border border-[#E5E7EB] p-4 rounded shadow hover:shadow-md transition cursor-pointer flex flex-col h-full">
                    <img
                      src={apartment.thumbnail}
                      alt="Apartment"
                      className="h-48 w-full object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="mt-2 font-bold text-lg flex items-center gap-2">
                        <FaDoorOpen />
                        {apartment.floor} Floor - Apartment{" "}
                        {apartment.apartmentNo}
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

                    <div className="w-full text-center bg-[#1F4B3F] text-white py-2  hover:bg-[#059445]  rounded mt-4">
                      View Details
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  className={`px-4 py-2 rounded border cursor-pointer ${
                    page === idx + 1
                      ? "bg-blue-600 text-white "
                      : "bg-white text-blue-600 dark:bg-gray-900 dark:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllApartments;
