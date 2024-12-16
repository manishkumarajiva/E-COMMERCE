import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe('pk_test_51NNEtiSGYebLfg1rgcmMKdKzGD7STiqANUWuM7fWv9e5Rps2xbfO1jyoMJZdhrsZY2zYBllwjjiThniPGfy2JNPo00qtHK6blU');

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const order =  useSelector(selectCurrentOrder);
  
  useEffect(() => {
  fetch("http://localhost:5555/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  items: order }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
      <div className="Stripe">
        {clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
          </Elements>
        )}
      </div>
  );
}