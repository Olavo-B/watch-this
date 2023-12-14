import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import HomeButton from '../components/HomeButton';
import LoadingBar from '../components/LoadingBar';

import useAuth from '../hooks/UseAuth';

import { getAnimeRecommendation } from '../api/searchEngine';
import { fetchTrailer, fetchImage } from '../api/animeData';
import { fetchCatalog } from '../api/userData';

const SearchResult = () => {
  const searchTerm = useLocation().state.searchTerm;
  const { user } = useAuth();
  const [anime, setAnime] = useState('');
  const [media, setMedia] = useState('');
  const [userCatalog, setUserCatalog] = useState([]);
  const [trailers, setTrailers] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCatalog = async () => {
      if (searchTerm === 'random' && user !== undefined) {
        try {
          // Use your existing fetchCatalog function
          const userResponse = await fetchCatalog(user.id);
          setUserCatalog(userResponse);
        } catch (error) {
          setError('Error fetching user catalog');
        }
      }
    };

    fetchUserCatalog();
  }, [searchTerm, user]);

  useEffect(() => {
    const fetchTrailerData = async () => {
      setIsLoading(true);

      try {
        let selectedAnime;
        let selectedAnimeOnCatalog;

        if (searchTerm === 'random' && userCatalog.length > 0) {
          // Select a random anime from the user's catalog
          selectedAnimeOnCatalog = userCatalog[Math.floor(Math.random()*userCatalog.length)];

        } else {
          // Use the provided search term
          selectedAnimeOnCatalog = searchTerm;
        }

        const animeRecommendation = await getAnimeRecommendation(selectedAnimeOnCatalog);
        selectedAnime = animeRecommendation[Math.floor(Math.random()*animeRecommendation.length)]; 
        setAnime(selectedAnime);

        const trailerUrl = await fetchTrailer(selectedAnime);
        setTrailers(trailerUrl);

        if (trailerUrl == null) {
          // If trailer not found, get an image instead
          const image = await fetchImage(selectedAnime);
          setMedia(image);
        }

      } catch (error) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch trailers only if userCatalog is not empty
    fetchTrailerData();
    
  }, [searchTerm, userCatalog]); // Include userCatalog as a dependency

  return (
    <div>
      <div className="icons">
        <HomeButton />
      </div>

      <div className="container">
        <div className="search-result__title"><h1 style={{ color: "#FFF", fontSize: '50px' }}>{anime}</h1></div>
        <div className="media">
          {isLoading ? (
            <LoadingBar />
          ) : error ? (
            <p>Error: {error}</p>
          ) : trailers ? (
            <iframe width="1280" height="720" title='trailer' src={trailers} frameBorder="0" style={{ borderRadius: '20px' }} allowFullScreen />
          ) : (
            <img src={media} alt='large_image' style={{ borderRadius: '30px' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
