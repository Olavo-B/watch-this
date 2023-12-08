// LoginButton.jsx
import React, { useState } from 'react';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

// import { AuthProvider } from "../context/Auth";
import useAuth from "../hooks/UseAuth";

import './style/Button.css';

const LoginButton = ({ onLogin }) => {
  const { signed, signout, signin } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(signed);
  const navigate = useNavigate();

  

  const toggleLogin = () => {
    


  };

  const handleButtonClick = () => {
    // Chama a função onLogin quando o botão é clicado
    onLogin();
    toggleLogin();

    // Navega para a página de login se o usuário não estiver logado
    if (!isLoggedIn) {
      signout();
      navigate('/login');

    } else {
      navigate('/catalog');
    }
  };

  return (
    <button className='Button' onClick={handleButtonClick}>
      {isLoggedIn ? <FiUser size={25} color='#FFF' /> : <FiLogIn size={25} color="#FFF" />}
    </button>
  );
};

export default LoginButton;
