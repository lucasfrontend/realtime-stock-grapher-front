import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Details from './routes/Details';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificación de token almacenado en localstorage para manejar el estado de la sesión y la renderización condicional según isLoggedIn
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  // Manejo del inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Manejo del cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/details/:symbol' element={isLoggedIn ? <Details onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
