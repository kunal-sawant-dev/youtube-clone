"use client";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@/lib/AuthContext";
import Script from "next/script";

<Script src="https://checkout.razorpay.com/v1/checkout.js" />

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Bronze",
    price: 10,
    plan: "bronze",
    limit: "7 minutes",
  },
  {
    name: "Silver",
    price: 50,
    plan: "silver",
    limit: "10 minutes",
  },
  {
    name: "Gold",
    price: 100,
    plan: "gold",
    limit: "Unlimited",
  },
];

export default function UpgradePlans() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleUpgrade = async (plan: string, price: number) => {
    try {
      setLoading(true);

      // Create order from backend
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/create-order`,
        {
          plan,
        }
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "YouTube Clone",
        description: `${plan} Plan Upgrade`,
        order_id: data.id,

        handler: async function (response: any) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/upgrade`,
            {
              userId: user?._id,
              plan,
              paymentId: response.razorpay_payment_id,
            }
          );

          alert("Plan upgraded successfully");
          window.location.reload();
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#ff0000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upgrade Your Plan
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.plan}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {plan.name}
            </h3>

            <p className="text-3xl font-bold mb-4">
              ₹{plan.price}
            </p>

            <p className="text-gray-600 mb-6">
              Watch Time: {plan.limit}
            </p>

            <button
              onClick={() =>
                handleUpgrade(plan.plan, plan.price)
              }
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Upgrade Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}