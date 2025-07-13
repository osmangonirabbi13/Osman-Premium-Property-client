import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState({});
  const [rent, setRent] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const [availableCoupons, setAvailableCoupons] = useState([]);

  // Fetch user profile and rent
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/profile?email=${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setRent(Number(res.data.rent) || 0);
      })
      .catch(() => {
        toast.error("Failed to fetch profile data");
      });
  }, [user?.email, axiosSecure]);

  // Fetch all active coupons
  useEffect(() => {
    axiosSecure
      .get("/coupons")
      .then((res) => {
        // Filter only active coupons
        const activeCoupons = res.data.filter((c) => c.isActive);
        setAvailableCoupons(activeCoupons);
      })
      .catch(() => {
        toast.error("Failed to load coupons");
      });
  }, [axiosSecure]);

  // Reset discount when coupon or rent changes
  useEffect(() => {
    setDiscount(0);
    setCouponMessage("");
  }, [coupon, rent]);

  // Apply coupon code manually
  const applyCoupon = async () => {
    if (!coupon) return toast.error("Please enter a coupon code");

    try {
      const res = await axiosSecure.get(`/coupons/${coupon}`);
      const discountAmount = (res.data.discountPercentage * rent) / 100;
      setDiscount(discountAmount);
      setCouponMessage(res.data.description || "Coupon applied successfully!");
      toast.success(res.data.description || "Coupon applied!");

      if (
        res.data.description?.toLowerCase().includes("first month") ||
        coupon.toLowerCase().includes("first")
      ) {
        toast.success("🎉 You’ve received a first month discount!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid or inactive coupon code"
      );
      setDiscount(0);
      setCouponMessage("");
    }
  };

  const formattedRent = Number(rent || 0).toFixed(2);
  const formattedDiscount = Number(discount || 0).toFixed(2);
  const totalPayable = Number(rent - discount || 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1e1e2d] py-10 px-4">
      <section className="container mx-auto max-w-4xl bg-white dark:bg-boxdark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-textT mb-4">
          Payment Details
        </h2>

        <form className="space-y-4">
          {/* Member Email */}
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Member Email
            </label>
            <input
              readOnly
              value={user?.email || ""}
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Block No & Room No */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Block No
              </label>
              <input
                readOnly
                value={profile.blockNo || ""}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Room No
              </label>
              <input
                readOnly
                value={profile.floorNo || ""}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
          </div>

          {/* Apartment No & Rent */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Apartment No
              </label>
              <input
                readOnly
                value={profile.apartmentNo || ""}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Rent
              </label>
              <input
                readOnly
                value={formattedRent}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
          </div>

          {/* Select Month */}
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Month
            </label>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Coupon Input + Apply Button */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            />
            <button
              type="button"
              className="px-4 py-2 min-w-[100px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>

          {/* Coupon Message */}
          {couponMessage && (
            <p className="text-green-500 text-sm font-medium mt-1">
              {couponMessage}
            </p>
          )}

          {/* Available Coupons List */}
          {availableCoupons.length > 0 && (
            <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-[#2a2a40] max-h-40 overflow-auto">
              <h4 className="font-semibold text-textT dark:text-white mb-2">
                Available Coupons (Click to apply)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-textT dark:text-white">
                {availableCoupons.map((c) => (
                  <li
                    key={c._id}
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      setCoupon(
                        c.couponCode || c.code || c.code?.toUpperCase()
                      );
                      toast.success(
                        `Coupon ${c.couponCode || c.code} selected!`
                      );
                    }}
                    title={c.description}
                  >
                    {c.couponCode || c.code} - {c.discountPercentage}% off
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Stripe Payment Form */}
        <div className="mt-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={Number(rent - discount)}
              info={{
                month: selectedMonth,
                apartmentId: profile.apartmentId,
                discount,
                finalAmount: rent - discount,
                rent,
                email: user?.email,
                couponCode: coupon,
              }}
            />
          </Elements>
        </div>

        {/* Payment Summary */}
        <div className="p-4 mt-6 bg-transparent border-[1.5px] border-stroke text-textT rounded-lg">
          <p className="text-sm font-medium">Original Rent: ${formattedRent}</p>
          <p className="text-sm font-medium text-green-600">
            Discount: -${formattedDiscount}
          </p>
          <p className="text-lg font-bold mt-2">
            Total Payable: ${totalPayable}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Payment;
