import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';

import useAuth from "../hooks/UseAuth";

import { Link, useNavigate } from "react-router-dom";
 




function Home() {

    const { signed, signout, signin } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (searchTerm) => {
        console.log(`Realizando pesquisa por: ${searchTerm}`); // For testing purposes only
        if (searchTerm == ''){
          alert('Pesquisa vazia')
        } else {
          navigate('/search-result', { state: { searchTerm } });
        }
      };
    
      const handleLogin = () => {
      if (signed) {
        console.log('Usuário já está logado');
      } else {
        signout(); 
      }
    }
      
    return (
        <div className="App">
        <div className="container">
            <div className="logo"></div>
            <SearchBar onSearch={handleSearch}/>
        </div>

        <div className="icons">
            <LoginButton onLogin={handleLogin}/>
        </div>
        </div>
  );
}

export default Home;