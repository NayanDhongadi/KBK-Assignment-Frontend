import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CardContainer from './component/Card/CardContainer';
import Login from './component/Login/Login';
import { useEffect } from 'react';
import Admin from './component/Admin/Admin';
import Checkout from './component/Stripe/Checkout';
import PaymentSuccess from './component/Stripe/PaymentSuccess';

function App() {
  const navigate = useNavigate();  
  const isLoggedin = localStorage.getItem("userToken");


  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate('/login'); 
  };

  return (
    <>
      <div className="nav" style={{ display: "flex", justifyContent: "space-around" }}>
        <p>KBK Assignment</p>
        {isLoggedin && <button onClick={handleLogout}>Logout</button>}
      </div>
      <Routes>
        <Route path='/' element={isLoggedin ? <CardContainer /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/payment-success' element={<PaymentSuccess />} />
      </Routes>
    </>
  );
}

export default App;
