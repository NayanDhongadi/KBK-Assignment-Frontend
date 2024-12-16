import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <button onClick={()=>navigate('/')}>click here to purchase more</button>
    </div>
  );
};

export default PaymentSuccess;
