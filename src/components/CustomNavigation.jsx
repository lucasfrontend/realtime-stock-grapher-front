import { useEffect, useState } from 'react';
import Logout from './Logout';

const CustomNavigation = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState('');

  // Obteniene nombre de usuario del localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setCurrentUser(storedUsername);
  }, []);

  // asegura la primera letra en mayúscula
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {currentUser && (
          <span>
            ¡Bienvenido {capitalizeFirstLetter(currentUser)}!
          </span>
        )}
        <Logout onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default CustomNavigation;
