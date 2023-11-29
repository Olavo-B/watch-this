// LoginForm.jsx
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import HomeButton from '../components/HomeButton';
import useAuth from "../hooks/UseAuth";
import './style/LoginForm.css';

const LoginForm = () => {

  const { signin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");

  const handleLogin = () => {


    if (!username | !password) {
      setError("Fill in all fields");
      alert("Fill in all fields")
      return;
    }

    console.log(username, password);


    const res = signin(username, password);

    if (res) {
      setError(res);
      alert(res)
      return;
    }

    navigate("/");
  };

  return (
    <div>
      <div className='login-container'>
    
        <input 
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError("")]}
          />
    
          <div className="button-container">
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
 
       </div>

        <div className="icons">
          <HomeButton />
        </div>
    </div>
  );
};


export default LoginForm;
