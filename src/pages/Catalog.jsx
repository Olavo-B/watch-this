import React, { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiInfo } from 'react-icons/fi';

import useAuth from "../hooks/UseAuth";

import { fetchTrailer, fetchImage } from '../api/animeData';
import { fetchCatalog, deleteAnime } from '../api/userData';


import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton';
import SettingsButton from '../components/SettingsButton';

const InfiniteScrollList = () => {
    const { user } = useAuth();
    const [userCatalog, setUserCatalog] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [media, setMedia] = useState('');
  
    const containerRef = useRef();
  
    const loadMoreItems = () => {
      setIsLoading(true);
      setTimeout(() => {
        const newItems = userCatalog.slice(items.length, items.length + 10);
        setItems((prevItems) => [...prevItems, ...newItems]);
        setIsLoading(false);
      }, 1000);
    };
  
    useEffect(() => {
      const fetchUserCatalog = async () => {
        if (user !== undefined) {
          const userResponse = await fetchCatalog(user.id);
          setUserCatalog(userResponse);
        }
      };
  
      fetchUserCatalog();
    }, [user]);
  
    useEffect(() => {
      setItems(userCatalog.slice(0, 15));
    }, [userCatalog]);
  
    useEffect(() => {
      const container = containerRef.current;
  
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = container;
  
        if (scrollTop + clientHeight >= scrollHeight - 10 && scrollTop > 0 && !isLoading) {
          loadMoreItems();
        }
      };
  
      container.addEventListener('scroll', handleScroll);
  
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
  
    }, [isLoading]);
  
    const handleInfoClick = async (item) => {
      const url = await fetchTrailer(item);
      if (url == null) {
        const image = await fetchImage(item);
        console.log('Anime trailer not found! ' + item + ' image: ' + image);
        setMedia(image);
      } else {
        setMedia(url);
      }
      setSelectedItem(item);
    };
  
    const handleDeleteClick = async (item) => {
      // Remove the item from the state
      setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
    
      try {
        // Call deleteAnime with the user ID and anime data
        await deleteAnime(user.id, {catalog : item});
      } catch (error) {
        console.error('Error deleting anime:', error);
        // Handle the error as needed
      }
    
      // Additional logic after the deletion (e.g., resetting selectedItem)
      setSelectedItem(null);
    };
    
  return (
    <div>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '20px',
        }}
      >
     
        <div
          ref={containerRef}
          style={{
            width: '100vw',
            maxWidth: '600px',
            height: '80vh',
            overflowY: 'auto',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
            marginRight: '20px', // Adiciona margem à direita da lista
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
                color: 'white',
                fontWeight: 'bold',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
              }}
            >
              <div>{item}</div>
              <div>
                <button
                  onClick={() => handleInfoClick(item)}
                  style={{ marginRight: '15px' }}
                >
                  <FiInfo size={18} />
                </button>
                <button onClick={() => handleDeleteClick(item)}>
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {isLoading && <p>Loading...</p>}
        </div>
        {selectedItem && (
          <div>
            <iframe
              width="1280"
              height="720"
              src={media}
              title="YouTube video player"
              allowFullScreen
              style={{ borderRadius: '20px' }}
            ></iframe>
          </div>
        )}
      </div>
      <div className='icons'>
          <SettingsButton />
          <HomeButton />
          <LogoutButton />
      </div>
    </div>
  );
};

export default InfiniteScrollList;
