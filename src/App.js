import { FiSearch, FiShuffle} from 'react-icons/fi'


function App() {
  return (

    <div className="container">
      <div className="logo"></div>

      <div className="containerInput">
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
      </main>

    </div>


  );
}

export default App;
