import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe("pk_test_51PQn5MIhKnAlMOQ0oaugCc7AfPnGrcPknAM0RdKRVsOH06ErrLfVsMhopTqYEyJte1OuUyl2ghv1eKp7bOwk7Qvc00fkPYHOdN");

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={50} /> 
    </Elements>
  );
};

export default Checkout;
