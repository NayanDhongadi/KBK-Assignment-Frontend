import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ amount }) => {


        const navigate = useNavigate();



  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }
  
    setIsProcessing(true);
  
    try {
      // Step 1: Create a PaymentIntent on the backend
      const { data } = await axios.post(
        "http://localhost:8000/create-payment-intent",
        { amount: amount * 100, currency: "usd" } // Amount in cents
      );
  
      // Log the entire data object to check its structure
      console.log("Received data from backend:", data);
  
      const clientSecret = data.clientSecret;
      console.log("Received clientSecret:", clientSecret);  // Log the clientSecret to check its value
  
      if (!clientSecret) {
        throw new Error("clientSecret is missing");
      }
  
      // Step 2: Confirm PaymentIntent on the frontend
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.log("Error during payment confirmation:", error);
        setErrorMessage(error.message);
      } else {
        console.log("PaymentIntent:", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          setSuccessMessage("Payment Successful!");
          setErrorMessage("");
          navigate("payment-success");


        } else {
          setErrorMessage(`Payment failed: ${paymentIntent.status}`);
        }
      }
    } catch (error) {
      console.log("Error during payment processing:", error);
      setErrorMessage("An error occurred while processing payment.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;

































// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // import { useHistory } from "react-router-dom"; // Import useHistory for redirecting

// const CheckoutForm = ({ amount }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     //   const history = useHistory(); // Initialize useHistory
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
    
//     const navigate = useNavigate();



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       setErrorMessage("Stripe has not loaded yet.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // Step 1: Create a PaymentIntent on the backend
//       const { data: clientSecret } = await axios.post(
//         "http://localhost:8000/create-payment-intent",
//         { amount: amount * 100, currency: "usd" } // Amount in cents
//       );

//       // Step 2: Confirm PaymentIntent on the frontend
//       const cardElement = elements.getElement(CardElement);
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         setSuccessMessage("Payment Successful!");
//         setErrorMessage("");

//         // Redirect to the success page after successful payment
//         // history.push("/payment-success"); // Replace with your success page route
//         navigate("payment-success")
//       } else {
//         setErrorMessage(`Payment failed: ${paymentIntent.status}`);
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred while processing payment.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <p>Amount: ${amount}</p>

//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": { color: "#aab7c4" },
//               },
//               invalid: { color: "#9e2146" },
//             },
//           }}
//         />
//         <button
//           type="submit"
//           disabled={!stripe || isProcessing}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#5cb85c",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           {isProcessing ? "Processing..." : `Pay $${amount}`}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;
