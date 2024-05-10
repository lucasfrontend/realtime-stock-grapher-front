import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import CustomNavigation from '../components/CustomNavigation';
import CustomSearchInput from '../components/CustomSearchInput';
import CustomButton from '../components/CustomButton';
import CustomAlert from '../components/CustomAlert';
import CustomPaginator from '../components/CustomPaginator';
import StockTable from '../components/StockTable';

const Home = ({ onLogout }) => {
  const [userId, setUserId] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermSymbol, setSearchTermSymbol] = useState('');

  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);

  // llama a la api para traer las acciones y busca en el localStorage el id del usuario, si hay usuario trae sus favoritos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStocks = await axios.get(`${process.env.REACT_APP_STOCK_API}`, {
          params: {
            source: 'docs',
          }
        });
        setStocks(responseStocks.data.data);

        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);

        if (storedUserId) {
          const responseFavorites = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${storedUserId}/favorites`);
          setFavorites(responseFavorites.data);
        }

      } catch (error) {
        showAlertWithError('Error al conectarse con el servidor');
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  // Si se modifican las acciones actualiza las filtradas
  useEffect(() => {
    setFilteredStocks(stocks);
  }, [stocks]);

  // Encapsula funciones para mostrar errores customizados en el Alert
  const showAlertWithError = errorMessage => {
    setAlertMessage(errorMessage);
    setShowAlert(true);
  };
  
  // búsqueda por nombre
  const handleSearchByName = () => {
    const filtered = stocks.filter((stock) => {
      return stock.name.toLowerCase().includes(searchTermName.toLowerCase());
    });
    
    if (filtered.length === 0) {
      showAlertWithError("No se encontraron resultados.");
    } else {
      setShowAlert(false);
      setFilteredStocks(filtered);
    }  
    setSearchTermSymbol('');
  };

    // búsqueda por símbolo
  const handleSearchBySymbol = () => {
    const filtered = stocks.filter((stock) => {
      return stock.symbol.toLowerCase().includes(searchTermSymbol.toLowerCase());
    });

    if(filtered.length === 0){
      showAlertWithError("No se encontraron resultados.");
    } else {
      setShowAlert(false);
      setFilteredStocks(filtered);
    }
    setSearchTermName('');
  };
  
  // seteo de la paginación
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Se crea el objeto UserFavorite con los datos necesarios a enviar al endpoint para agregar ffs. 
  // si la petición fue exitosa actualiza la lista de favoritos con la nueva acción agregada
  const addToFavorites = async (symbol, name, currency, type) => {
    try {
      setShowAlert(false)
      setLoading(true);
    
      const favorite = {
        userId: userId,
        symbol: symbol,
        name: name,
        currency: currency,
        type: type
      };

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/${userId}/favorites`, favorite);
      response.status === 200 ? setFavorites([...favorites, favorite]) : setShowAlert(true)

    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      showAlertWithError("Error al agregar a favoritos.")
    } finally {
      setLoading(false);
    }
  };

  // eliminación de favoritos
  const removeFromFavorites = async (symbol) => {
    try {
      setShowAlert(false)
      setLoading(true);
      
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/${userId}/favorites/${symbol}`);
      if (response.status === 200) {
        const updatedFavorites = favorites.filter(favorite => favorite.symbol !== symbol);
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      showAlertWithError("Error al eliminar de favoritos.")
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <CustomNavigation 
        onLogout={onLogout}
      />

      <div className="container mt-4">
        <div className="pb-4">
          <h2>Favoritos</h2>
          <StockTable
            data={favorites}
            currentPage={0}
            perPage={perPage}
            removeFromFavorites={removeFromFavorites}
            isFavorites
          />
        </div>

        <div className="row pt-4">
          <h2>Lista de Acciones</h2>
          <div className="col-sm-10">
            <CustomSearchInput
              placeholder='Buscar por Nombre, ej Netflix'
              value={searchTermName}
              onChange={(e) => setSearchTermName(e.target.value)}
              onKeyPress={handleSearchByName}
            />
          </div>
      
          <div className="col-sm-2 pb-4">
            <CustomButton 
              label="Buscar Nombre"
              onClick={handleSearchByName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-10">
            <CustomSearchInput
              placeholder='Buscar por Símbolo, ej NFLX'
              value={searchTermSymbol}
              onChange={(e) => setSearchTermSymbol(e.target.value)}
              onKeyPress={handleSearchBySymbol}
            />
          </div>
      
          <div className="col-sm-2 pb-4">
            <CustomButton 
              label="Buscar Símbolo"
              onClick={handleSearchBySymbol}
            />
          </div>
        </div>
      
        <CustomAlert 
          show={showAlert} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)}
        />

        <StockTable
          data={filteredStocks}
          currentPage={currentPage}
          perPage={perPage}
          handlePageClick={handlePageClick}
          addToFavorites={addToFavorites}
        />

        <CustomPaginator 
          pageCount={Math.ceil(filteredStocks.length / perPage)} 
          handlePageClick={handlePageClick} 
        />
      </div>
    </>
  );
};

export default Home;