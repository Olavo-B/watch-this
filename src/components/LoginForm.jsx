// LoginForm.jsx
import React from 'react';
import LoginButton from './LoginButton';


const LoginForm = () => {
  const handleLogin = () => {
    // Lógica de login aqui...
    console.log('Usuário logado!');
  };

  return (
    <div className='LoginForm'>
      {/* Outros campos do formulário aqui... */}
      <LoginButton onLogin={handleLogin} />
    </div>
  );
};

export default LoginForm;
