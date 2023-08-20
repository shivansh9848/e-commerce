import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NgWdgSCvYJLCDhj0TDF9HWKr1v3QA5RkVYMmgDqYX21ClBahAjmBsDOaYxPAvo3xTqu4s5p0cMO6RsqBQgmwLgL00c4hnGmIt"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (currentOrder)
      fetch("http://localhost:8000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount: currentOrder.totalAmount,
          orderId: currentOrder.id,
        }),
        meta: {
          totalAmount: currentOrder.totalAmount,
          orderId: currentOrder.id,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("abc", data);
          return setClientSecret(data.clientSecret);
        });
  }, [currentOrder]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
