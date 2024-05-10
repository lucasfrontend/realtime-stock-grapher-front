import { useState } from 'react';
import CustomSearchInput from '../components/CustomSearchInput';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import CustomButton from '../components/CustomButton';
import Spinner from '../components/Spinner';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // llamado al endpoint para logearse, si la respuesta es correcta y contiene token se desestructuran sus datos de la respuesta
  // y se guardan en localStorage antes de redirigir al usuario al home
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_URL, {
        username, 
        password
      });
      
      if (response.status === 200 && response.data.token) {
        const { userId, username, token } = response.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        onLoginSuccess();
      } else {
        setError('Error al iniciar sesión. Inténtalo nuevamente más tarde');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Validación adicional ya que el endpoint está configurado para devolver 401 si username o password son inválidos
        setError('Usuario o contraseña inválidos');
      } else {
        console.error('Error al iniciar sesión:', error);
        setError('Error al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto col-md-6 col-sm-8 p-4">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className='pt-4'>
            <CustomSearchInput
              placeholder="Usuario"
              value={username}
              onChange={handleUsernameChange}
            />
            
            <CustomSearchInput
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            
            <CustomButton 
              label="Iniciar sesión" 
              onClick={handleSubmit}
            />
            {error && <div className='mt-4'><CustomAlert message={error} /></div>}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
