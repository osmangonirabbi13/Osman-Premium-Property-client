import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

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

  if (isLoading)
    return <p className="text-center mt-10">Loading apartments...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load data.</p>
    );

  return (
    <div className="p-4 pt-50 max-w-7xl mx-auto">
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.data?.map((apartment) => (
          <Link to={`/apartments/${apartment._id}`} key={apartment._id}>
            <div className="border p-4 rounded shadow hover:shadow-md transition cursor-pointer">
              <img
                src={apartment.thumbnail}
                alt="Apartment"
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-bold text-lg">
                {apartment.apartmentNo}
              </h3>
              <p>Block: {apartment.block}</p>
              <p>Floor: {apartment.floor}</p>
              <p>Rent: ${apartment.rent}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 rounded border ${
              page === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllApartments;
