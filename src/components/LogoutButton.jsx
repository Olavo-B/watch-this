import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from "../hooks/UseAuth";

import './style/Button.css';

const SignOut = () => {
    const { signed, signout } = useAuth();
    const [isLoggedIn, setLoggedIn] = useState(signed);
    const navigate = useNavigate();

    const toggleLogin = () => {


        console.log(signed);
        signout();
        // setLoggedIn(!isLoggedIn);

    }

    const handleButtonClick = () => {
        // Chama a função onLogin quando o botão é clicado

        toggleLogin();

        // Navega para a página de login se o usuário não estiver logado
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    return (
        <button className='Button' onClick={handleButtonClick}>
            <FiLogOut size={25} color="#FFF" />
        </button>
    );
}

export default SignOut;