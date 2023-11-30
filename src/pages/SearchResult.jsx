import React from 'react';
import { useState } from 'react';
import { SlideToggle } from 'react-smooth-slide-toggle';

import HomeButton from '../components/HomeButton';

const SearchResult = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  }

  return (
    <div>
        <div className="container_search">
          <SlideToggle trigger={<button><img src='rat.jpg'/></button>}>
            <div>
              <p>This content will slide in and out when the button is clicked.</p>
            </div>
          </SlideToggle>
        </div>
        <HomeButton />
    </div>
  
  );
};

export default SearchResult;
