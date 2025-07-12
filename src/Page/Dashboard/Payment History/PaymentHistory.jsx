import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/payments/history?email=${user.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user, axiosSecure]);

  if (loading) return <p>Loading payment history...</p>;
  if (!payments.length) return <p>No payments found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Month</th>
            <th className="border border-gray-300 px-4 py-2">Amount ($)</th>
            <th className="border border-gray-300 px-4 py-2">Discount ($)</th>
            <th className="border border-gray-300 px-4 py-2">Rent ($)</th>
            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{p.month}</td>
              <td className="border border-gray-300 px-4 py-2">
                {p.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {p.discount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {p.rent.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(p.paymentDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 font-mono">
                {p.transactionId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
