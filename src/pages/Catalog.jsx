import React, { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiInfo } from 'react-icons/fi';
import { fetchTrailer, fetchImage } from '../api/animeData';
import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton';
import SettingsButton from '../components/SettingsButton';

const InfiniteScrollList = () => {
  const [items, setItems] = useState([
    'One Piece',
    'Attack on Titan',
    'My Hero Academia',
    'Demon Slayer',
    'Naruto',
    'Fullmetal Alchemist',
    'Death Note',
    'Dragon Ball Z',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [media, setMedia] = useState(''); // <-- state for trailer URL

  const containerRef = useRef();

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newItems = [
        'One Piece',
        'Attack on Titan',
        'My Hero Academia',
        'Demon Slayer',
        'Naruto',
        'Fullmetal Alchemist',
        'Death Note',
        'Dragon Ball Z',
        'One Punch Man',
        'Sword Art Online',
      ];
      setItems((prevItems) => [...prevItems, ...newItems]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 10 && scrollTop > 0 && !isLoading) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  const handleInfoClick = async (item) => {
    // Lógica para lidar com o clique no botão de informação
    const url = await fetchTrailer(item);
    if (url == null){  // <-- if trailer not found, get image instead
      const image = await fetchImage(item);
      console.log('Anime trailer not found! ' + item + ' image: ' + image);
      setMedia(image);

    } else {
      setMedia(url);
    }
    setSelectedItem(item);
  };

  const handleDeleteClick = (item) => {
    // Lógica para deletar o item
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
    setSelectedItem(null); // Reinicia o vídeo quando o item é excluído
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
                  style={{ marginRight: '8px' }}
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
            {/* Substitua o src por um URL real do vídeo do YouTube */}
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
