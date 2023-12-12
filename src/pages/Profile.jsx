import React from 'react';
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
