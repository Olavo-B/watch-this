import { FiSearch, FiShuffle, FiHeart} from 'react-icons/fi'
import SearchBar from './components/SearchBar';


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

        {/* <div className="containerInput">
          <input 
          type="text" 
          placeholder="Search" />

          <button className="buttonSearch">
            <FiSearch size={20} color="#FFF"/>
          </button>

          <button className="buttonShuffle">
            <FiShuffle size={20} color="#FFF"/>
          </button>
        </div>

        <main className="main">
            <div className="card"></div>
        </main> */}

        <SearchBar onSearch={handleSearch}/>

      </div>

      <div className="footer">
        <p>Created with <FiHeart size={10} color='black'/> by <a href="https://github.com/Olavo-B"
        target="_blank">Olavo-B </a></p>
      </div>
    </div>
  );
}

export default App;
