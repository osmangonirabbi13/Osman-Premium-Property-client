import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckoutForm = ({ amount, info }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount: Math.round(amount * 100) })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          toast.error("Failed to initialize payment.");
          console.error(err);
        });
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "anonymous",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setProcessing(false);
      return;
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentData = {
        userEmail: user.email,
        amount,
        transactionId: paymentIntent.id,
        month: info.month,
        discount: info.discount,
        rent: info.rent,
        paymentDate: new Date(),
      };

      try {
        const res = await axiosSecure.post("/payments/save", paymentData);
        if (res.data.insertedId) {
          toast.success("Payment successful!");
        } else {
          toast.error("Payment recorded, but failed to save.");
        }
      } catch (err) {
        setErrorMessage("Payment saved failed.");
        console.error(err);
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="mb-3 block text-textT dark:text-white mt-2">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || amount <= 0}
        className={`mt-4 mb-3 px-4 py-2 rounded-lg text-white transition ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-700"
        }`}
      >
        {processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>

      {transactionId && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Payment Successful! Transaction ID:{" "}
          <span className="font-mono">{transactionId}</span>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
