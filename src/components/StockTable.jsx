import React from 'react';
import { Link } from 'react-router-dom';

const StockTable = ({ data, currentPage, perPage, isFavorites, addToFavorites, removeFromFavorites }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Símbolo</th>
          <th>Nombre</th>
          <th>Moneda</th>
          <th>Tipo</th>
          <th>{isFavorites ? 'Eliminar' : 'Agregar a favoritos'}</th>
        </tr>
      </thead>
      <tbody>
        {data
          .slice(currentPage * perPage, (currentPage + 1) * perPage)
          .map((stock, index) => (
            <tr key={index}>
              <td><Link to={`/details/${stock.symbol}`}>{stock.symbol}</Link></td>
              <td>{stock.name}</td>
              <td>{stock.currency}</td>
              <td>{stock.type}</td>
              <td>
                {isFavorites ? (
                  <button onClick={() => removeFromFavorites(stock.symbol)}>Eliminar</button>
                ) : (
                  <button onClick={() => addToFavorites(stock.symbol, stock.name, stock.currency, stock.type)}>Agregar</button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default StockTable;