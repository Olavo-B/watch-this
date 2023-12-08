import React from 'react';
import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton';
import SettingsButton from '../components/SettingsButton';

const Catalog = () => {
  

  return (
    <div>
        <div className='icons'>
            <SettingsButton />
            <HomeButton />
            <LogoutButton />
        </div>
    </div>
  );
};

export default Catalog;
