// LoginButton.jsx
import React, { useState } from 'react';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './style/LoginButton.css';

const LoginButton = ({ onLogin }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    if (isLoggedIn) {
      alert("Logout");
      setLoggedIn(!isLoggedIn);
    } else {
      setLoggedIn(!isLoggedIn);
    }
  };

  const handleButtonClick = () => {
    // Chama a função onLogin quando o botão é clicado
    onLogin();
    toggleLogin();

    // Navega para a página de login se o usuário não estiver logado
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  return (
    <button className='buttonLogin' onClick={handleButtonClick}>
      {isLoggedIn ? <FiUser size={25} color='#FFF' /> : <FiLogIn size={25} color="#FFF" />}
    </button>
  );
};

export default LoginButton;
