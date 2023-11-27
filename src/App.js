import { FiHeart, FiLogIn , FiMoon} from 'react-icons/fi'
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm';


function App() {

  const handleSearch = (searchTerm) => {
    console.log(`Realizando pesquisa por: ${searchTerm}`);
    alert(`Realizando pesquisa por: ${searchTerm}`);
    // Lógica de pesquisa aqui...
  };




  return (

    <div className="App">
      <div className="container">
        <div className="logo"></div>


        <SearchBar onSearch={handleSearch}/>

      </div>

      {/* <div className="footer">
        <p>Created with <FiHeart size={10} color='black'/> by <a href="https://github.com/Olavo-B"
        target="_blank">Olavo-B </a></p>
      </div> */}

      <div className="icons">
        <LoginForm/>
      </div>
    </div>
  );
}

export default App;
