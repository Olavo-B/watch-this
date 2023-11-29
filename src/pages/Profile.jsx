import React from 'react';
import { Link } from 'react-router-dom';
import {  FiLogOut } from 'react-icons/fi';
import HomeButton from '../components/HomeButton';
import SignOut from '../components/LogoutButton';

const Profile = () => {
  return (
    
    <div>
        <div className='icons'>
        <HomeButton />
        <SignOut />
        {/* <Link to='/'>
            <FiLogOut size={25} color='#FFF' />
        </Link> */}
        </div>
    </div>
    
  );
};

export default Profile;
