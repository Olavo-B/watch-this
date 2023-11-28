import Results from './pages/SearchResult';
import Login from './pages/LoginForm';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import { AuthProvider } from "./context/Auth";
import useAuth from "./hooks/UseAuth";
import { Routes, Route } from 'react-router-dom';


function App() {

  const Private = ({ Item }) => {
    const { signed } = useAuth();
  
    return signed > 0 ? <Item /> : <Login />;
  };

  return (

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/result' element={<Results />} />
          <Route path='/profile' element={<Private item={Profile} />} />
          <Route path='/catalog' element={<Private item={Catalog} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>

    
  );
}

export default App;
