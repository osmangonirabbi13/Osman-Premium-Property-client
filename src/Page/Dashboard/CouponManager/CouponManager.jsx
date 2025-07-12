import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CouponManager = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    couponCode: "",
    discountPercentage: "",
    description: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    const res = await axiosSecure.get("/coupons");
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/coupons", form);
      toast.success("Coupon added!");
      fetchCoupons();
      setForm({
        couponCode: "",
        discountPercentage: "",
        description: "",
        isActive: true,
      });
    } catch (err) {
      toast.error("Failed to add coupon");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/coupons/${id}`);
      toast.success("Coupon deleted!");
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-boxdark rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Coupon Management</h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleAddCoupon}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          value={form.couponCode}
          onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={form.discountPercentage}
          onChange={(e) =>
            setForm({ ...form, discountPercentage: e.target.value })
          }
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Coupon
        </button>
      </form>

      {/* Coupon List */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-dark">
            <th className="px-3 py-2 border">Code</th>
            <th className="px-3 py-2 border">Discount</th>
            <th className="px-3 py-2 border">Description</th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td className="px-3 py-2 border">{c.couponCode}</td>
              <td className="px-3 py-2 border">{c.discountPercentage}%</td>
              <td className="px-3 py-2 border">{c.description}</td>
              <td className="px-3 py-2 border">
                <span
                  className={c.isActive ? "text-green-600" : "text-red-600"}
                >
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-3 py-2 border text-center">
                {/* You can add edit modal here later */}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {coupons.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponManager;
