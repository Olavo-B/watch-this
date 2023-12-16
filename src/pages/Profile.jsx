// src/components/AlteracaoSenha.js
import React, { useState, useEffect } from 'react';

import useAuth from '../hooks/UseAuth';

import HomeButton from '../components/HomeButton';
import SignOut from '../components/LogoutButton';
import CatalogButton from '../components/CatalogButton';

import { updateUser, updateCatalog } from '../api/userData';

const AlteracaoSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const { user } = useAuth();


  const handleSenhaChange = (e) => {
    setSenhaAtual(e.target.value);
  };

  const handleNovaSenhaChange = (e) => {
    setNovaSenha(e.target.value);
  };

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmitSenha = async () => {

    if( user !== undefined && novaSenha !== ''){
      await updateUser(user.id, {password: novaSenha});
    }


    console.log('Enviando solicitação de alteração de senha');
  };

  const handleSubmitJson = async () => {
    // Lógica para enviar JSON para o sistema
    const vector = jsonInput.split(',');
    const catalogInput = {"catalog": vector};

    if( user !== undefined && jsonInput !== ''){
      await updateCatalog(user.id, {"catalog": vector});
    }
  };

  const styles = {
    mainContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '600px',
    },
    form: {
      width: '48%',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(35px)',
    },
    input: {
      borderRadius: '8px',
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: 'indigo',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '8px',
      width: '100%',
    },
  };

  return (
    <div>
    <div style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h1>Alteração de Senha</h1>
          <div>
            <input
              style={styles.input}
              type="password"
              id="senhaAtual"
              value={senhaAtual}
              onChange={handleSenhaChange}
              placeholder='Senha Atual'
            />
          </div>
          <div>
            <input
              style={styles.input}
              type="password"
              id="novaSenha"
              value={novaSenha}
              onChange={handleNovaSenhaChange}
              placeholder='Nova Senha'
            />
          </div>
          <button style={styles.button} onClick={handleSubmitSenha}>
            Alterar Senha
          </button>
        </div>

        <div style={styles.form}>
          <h2>Adicionar Animes</h2>
          <div>
            <textarea
              style={{ ...styles.input, ...{ height: '100px' } }}
              value={jsonInput}
              onChange={handleJsonInputChange}
            />
          </div>
          <button style={styles.button} onClick={handleSubmitJson}>
            Enviar
          </button>
        </div>
      </div>
    </div>
    <div>
        <div className='icons'>
        <CatalogButton />
        <HomeButton />
        <SignOut />
        </div>
    </div>
    </div>
  );
};

export default AlteracaoSenha;
