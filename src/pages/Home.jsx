import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';



function Home() {

    const handleSearch = (searchTerm) => {
        console.log(`Realizando pesquisa por: ${searchTerm}`);
        alert(`Realizando pesquisa por: ${searchTerm}`);
        // Lógica de pesquisa aqui...
      };
    
      const handleLogin = (email, password) => {
        // Lógica de login aqui...
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