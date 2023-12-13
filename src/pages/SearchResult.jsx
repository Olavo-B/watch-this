import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
// import { getAnimeRecommendation } from '../api/searchEgine';
import { fetchTrailer, fetchImage } from '../api/animeData';

const SearchResult = () => {
  const searchTerm = useLocation().state.searchTerm; // <-- get search term from location state
  const [media, setMedia] = useState(''); // <-- state for trailer URL
  const [trailers, setTrailers] = useState(''); // <-- state for trailer URL

  useEffect(() => { 
    const fetchTrailerData = async () => {

      if(searchTerm === 'random') {
        try {
          // const anime = await getAnimeRecommendation('Naruto'); // <-- get anime recommendation based on user catalog
          const anime = 'Durarara'
          const url = await fetchTrailer(anime);
          setTrailers(url);
        } catch (error) {
          console.error('Can not access trailer: ', error);
        }
      } else {
        try {
          // const anime = await getAnimeRecommendation(searchTerm); // <-- get anime recommendation
          const anime = searchTerm
          const url = await fetchTrailer(anime);
          setTrailers(url);
          
          if (url == null){  // <-- if trailer not found, get image instead
            const image = await fetchImage(searchTerm);
            console.log('Anime trailer not found! ' + searchTerm + ' image: ' + image);
            setMedia(image);

          }

        } catch (error) {
          console.error('Can not access trailer: ', error);
        }
      }
    };

    fetchTrailerData();
    
  }, [searchTerm]);



  


  return (
    <div>
      <div className="icons">
        <HomeButton />
      </div>

      <div className="container">

        <div className="search-result__title"><h1 style={{color:"#FFF", fontSize:'50px'}}>{searchTerm}</h1></div>
        <div className="media">


          {trailers ? 
                <iframe width="1280" height="720" title='trailer' src={trailers} frameborder="0" style={{borderRadius:'20px'}} allowfullscreen/> :
                <img src={media} alt='large_image' style={{ borderRadius:'30px'}}/>}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
