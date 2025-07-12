import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MemberDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
      <img
        src={user?.photoURL}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-2xl mt-2 font-semibold">{user?.displayName}</h2>
      <p className="text-sm text-gray-500">{user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 text-sm">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="font-bold text-green-600">🏢 Agreement:</p>
          <p>{data?.agreementDate?.split("T")[0] || "None"}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="font-bold text-green-600">🏢 Floor:</p>
          <p>{data?.floorNo || "None"}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="font-bold text-red-500">🏢 Block:</p>
          <p>{data?.blockNo || "None"}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="font-bold text-blue-600">🏢 Room No:</p>
          <p>{data?.apartmentNo || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
