// LoginButton.jsx
import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './style/LoginButton.css';

const LoginButton = ({ onLogin }) => {
  const handleButtonClick = () => {
    // Chama a função onLogin quando o botão é clicado
    onLogin();
  };

  return (
    <button className='buttonLogin' onClick={handleButtonClick}>
      <FiLogIn size={25} color="#FFF"/>
    </button>
  );
};

export default LoginButton;
