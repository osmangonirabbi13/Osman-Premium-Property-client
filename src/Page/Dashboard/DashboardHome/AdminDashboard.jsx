import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    unavailableRooms: 0,
    totalUsers: 0,
    totalMembers: 0,
    totalEarning: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/admin-stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  const availablePercentage =
    stats.totalRooms > 0
      ? ((stats.availableRooms / stats.totalRooms) * 100).toFixed(1)
      : 0;
  const unavailablePercentage =
    stats.totalRooms > 0
      ? ((stats.unavailableRooms / stats.totalRooms) * 100).toFixed(1)
      : 0;

  const COLORS = ["#00C49F", "#FF8042"];

  const pieData = [
    { name: "Available", value: stats.availableRooms },
    { name: "Unavailable", value: stats.unavailableRooms },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="bg-white dark:bg-boxdark shadow rounded-lg p-6 flex items-center gap-6">
        <img
          src={user?.photoURL || stats.admin?.image}
          alt="Admin"
          className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {user?.displayName || stats.admin?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email || stats.admin?.email}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow">
          <p className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
            Total Rooms
          </p>
          <p className="text-2xl font-bold">{stats.totalRooms}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow">
          <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
            Available Rooms (%)
          </p>
          <p className="text-2xl font-bold">{availablePercentage}%</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg shadow">
          <p className="text-red-800 dark:text-red-200 font-semibold text-lg">
            Agreement/Unavailable (%)
          </p>
          <p className="text-2xl font-bold">{unavailablePercentage}%</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow">
          <p className="text-yellow-900 font-semibold text-lg">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg shadow">
          <p className="text-indigo-800 font-semibold text-lg">Total Members</p>
          <p className="text-2xl font-bold">{stats.totalMembers}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg shadow">
          <p className="text-purple-800 font-semibold text-lg">Total Earning</p>
          <p className="text-2xl font-bold">${stats.totalEarning.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-boxdark rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Room Availability Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
