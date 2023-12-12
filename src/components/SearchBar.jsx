import React, { useState } from 'react';
import { FiSearch, FiShuffle } from 'react-icons/fi';
import './style/SearchBar.css';
import useAuth from '../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { signed, signout } = useAuth();
  const navigate = useNavigate();


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlers = {
    submit1: handleSubmitSearch,
    submit2: handleSubmitShuffle,
  }
  
  const submitHandler = (e) => {
    const { id } = e.nativeEvent.submitter; // <-- access submitter id
    handlers[id](e); // <--proxy event to proper callback handler
  };

  function handleSubmitSearch(event) {
    event.preventDefault();
    onSearch(searchTerm);
    console.log("Search");
    event.target.reset();
  }
  
  function handleSubmitShuffle(event) {
    event.preventDefault();
    if (!signed) {
      console.log('Usuário não está logado');
      alert('User not logged in');
    } else {
      navigate('/search-result', { state: { searchTerm: 'random' } })
    }
    event.target.reset();
  };

    return (

        <form className="containerInput" onSubmit={submitHandler}>
            <input 
            type="text" 
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange} />

            <button className="buttonSearch" id='submit1'>
                <FiSearch size={20} color="#FFF"/>
            </button>

            <button className="buttonShuffle" id='submit2'>
                <FiShuffle size={20} color="#FFF"/>
            </button>
        </form>

        
    );
};

export default SearchBar;
