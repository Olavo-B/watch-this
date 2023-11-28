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
  const [error, setError] = useState("");

  const handleLogin = () => {


    if (!username | !password) {
      setError("Fill in all fields");
      return;
    }

    console.log(username, password);


    const res = signin(username, password);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <div>
      <div className='container-wrapper'>
        <div className='containerForm'>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        </div>
        <div className='containerForm'>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        </div>
    
          <button className='btn' onClick={handleLogin}>Login</button>
      </div>

      <div className="icons">
        <HomeButton />
      </div>
    </div>
  );
};


export default LoginForm;
