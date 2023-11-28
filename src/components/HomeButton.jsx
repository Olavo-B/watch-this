// src/HomeButton.jsx
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './style/HomeButton.css';

const HomeButton = () => {
  return (
    <Link to="/">
      <button className='homeButton'>
        <FiHome size={25} color='#FFF' />
      </button>
    </Link>
  );
};

export default HomeButton;
