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
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );

  // Fetch user profile on load
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/profile?email=${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setRent(res.data.rent || 0);
      })
      .catch(() => {
        toast.error("Failed to fetch profile data");
      });
  }, [user, axiosSecure]);

  // Apply coupon discount
  const applyCoupon = async () => {
    if (!coupon) return toast.error("Please enter a coupon code");

    try {
      const res = await axiosSecure.get(`/coupons/${coupon}`);
      const discountAmount = (res.data.discountPercentage * rent) / 100;
      setDiscount(discountAmount);
      toast.success(res.data.description);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid or inactive coupon code"
      );
      setDiscount(0);
    }
  };

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
              value={user.email}
              type="text"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Rent
              </label>
              <input
                readOnly
                value={rent}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          {/* Select Month */}
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Month
            </label>
            <select
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

          {/* Coupon Code */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 min-w-[100px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>
        </form>

        {/* Stripe Payment Form */}
        <div className="mt-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={rent - discount}
              info={{
                month: selectedMonth,
                apartmentId: profile.apartmentId,
                discount: discount,
                finalAmount: rent - discount,
                rent: rent,
              }}
            />
          </Elements>
        </div>

        {/* Payment Summary */}
        <div className="p-4 mt-6 bg-transparent border-[1.5px] border-stroke text-textT rounded-lg">
          <p className="text-sm font-medium">
            Original Rent: ${rent.toFixed(2)}
          </p>
          <p className="text-sm font-medium text-green-600">
            Discount: -${discount.toFixed(2)}
          </p>
          <p className="text-lg font-bold mt-2">
            Total Payable: ${(rent - discount).toFixed(2)}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Payment;
