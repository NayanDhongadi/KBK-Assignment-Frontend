import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const [signemail, setsignEmail] = useState('');
  const [signpassword, setsignPassword] = useState('');







  const navigate = useNavigate();
  const handleLogin = async (e) => {
    console.log("function trigger")
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    const user = {
      email: email,
      password: password,
    };


    try {
      const resp = await axios.post(`${API_URL}/login`, user);
      console.log("Response----->", resp);

      // Assuming a successful login
      localStorage.setItem("userToken", true);
      alert("Login Successfully");

      navigate("/");
    } catch (error) {
      alert("Error Occurred");
      console.log("Error---->", error);
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Email:", signemail);
    console.log("Password:", signpassword);

    const user = {
      email: signemail,
      password: signpassword,
    };


    try {
      const resp = await axios.post(`${API_URL}/signup`, user);
      console.log("Response----->", resp);

      alert("Signup Successfully");

    } catch (error) {
      alert("Error Occurred");
      console.log("Error---->", error);
    }
  }


  return (
    <>


      <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1rem' }}>

            <label>Email:</label>
            <input
              type="email"
              value={signemail}
              onChange={(e) => setsignEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Password:</label>
            <input
              type="password"
              value={signpassword}
              onChange={(e) => setsignPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Signup
          </button>
        </form>
      </div>











      <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Login
          </button>
        </form>
      </div>

    </>
  );
};

export default Login;
