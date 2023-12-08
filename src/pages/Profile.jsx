import React from 'react';
import { Link } from 'react-router-dom';
import {  FiLogOut } from 'react-icons/fi';
import HomeButton from '../components/HomeButton';
import SignOut from '../components/LogoutButton';
import CatalogButton from '../components/CatalogButton';

const Profile = () => {
  return (
    
    <div>
        <div className='icons'>
        <CatalogButton />
        <HomeButton />
        <SignOut />
        </div>
    </div>
    
  );
};

export default Profile;
