import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBuilding } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: apartment = {} } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data || {};
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <div className="rounded-lg shadow-md overflow-hidden bg-white">
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-slate-900 to-slate-800"></div>

        {/* Profile section */}
        <div className="flex flex-col items-center -mt-16 pb-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <h3 className="text-xl font-semibold mt-2">{user?.displayName}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>

          {/* Info cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full px-4">
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1">
                <FaBuilding /> Agreement:
              </p>
              <p>{apartment?.agreementDate?.split("T")[0] || "None"}</p>
            </div>

            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1">
                <FaBuilding /> Floor:
              </p>
              <p>{apartment?.floor || "None"}</p>
            </div>

            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1">
                <FaBuilding /> Block No:
              </p>
              <p>{apartment?.block || "None"}</p>
            </div>

            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1">
                <FaBuilding /> Room No:
              </p>
              <p>{apartment?.apartmentNo || "None"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
