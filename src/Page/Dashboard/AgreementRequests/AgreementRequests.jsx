import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AgreementRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const fetchAgreements = async () => {
    const { data } = await axiosSecure.get("/agreements/request");
    return data;
  };

  const {
    data: agreements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: fetchAgreements,
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, email, apartmentId }) =>
      axiosSecure.patch(`/agreements/update/${id}`, {
        email,
        status: "approved",
        apartmentId,
      }),
    onSuccess: () => {
      toast.success("Agreement approved successfully");
      queryClient.invalidateQueries(["agreements"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to approve agreement"
      );
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/agreements/reject/${id}`),
    onSuccess: () => {
      toast.success("Agreement rejected successfully");
      queryClient.invalidateQueries(["agreements"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to reject agreement"
      );
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading requests...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error loading requests: {error.message}
      </p>
    );
  if (agreements.length === 0)
    return <p className="text-center mt-10">No pending agreement requests</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Pending Agreement Requests</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Apartment No</th>
            <th className="border border-gray-300 px-4 py-2">Block</th>
            <th className="border border-gray-300 px-4 py-2">Floor</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agreements.map((agreement) => (
            <tr key={agreement._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {agreement.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {agreement.apartmentNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {agreement.block}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {agreement.floor}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {agreement.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  disabled={
                    approveMutation.isLoading || rejectMutation.isLoading
                  }
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-3 py-1 rounded"
                  onClick={() =>
                    approveMutation.mutate({
                      id: agreement._id,
                      email: agreement.email,
                      apartmentId: agreement.apartmentId,
                    })
                  }
                >
                  Approve
                </button>
                <button
                  disabled={
                    approveMutation.isLoading || rejectMutation.isLoading
                  }
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-1 rounded"
                  onClick={() => rejectMutation.mutate(agreement._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequests;
