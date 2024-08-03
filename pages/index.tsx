import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setSymbol, setPrices } from '../redux/priceSlice';
import axios from 'axios';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { symbol, prices } = useSelector((state: RootState) => state.prices);
  const [showModal, setShowModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState(symbol);

  useEffect(() => { 
    const fetchAndUpdatePrices = async () => {
      const response = await axios.get(`/api/updateAndFetchPrices?symbol=${symbol}`);
      dispatch(setPrices(response.data));
    };

    fetchAndUpdatePrices();
    const interval = setInterval(fetchAndUpdatePrices, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [symbol, dispatch]);

  const handleSymbolChange = () => {
    dispatch(setSymbol(newSymbol));
    setShowModal(false);
  };

  return (
    <div>
      <h1>Real-Time Price Tracker</h1>
      <button onClick={() => setShowModal(true)}>Change Symbol</button>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.timestamp}>
              <td>{price.symbol}</td>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Symbol</h2>
            <input 
              type="text" 
              value={newSymbol} 
              onChange={(e) => setNewSymbol(e.target.value.toUpperCase())} 
            />
            <button onClick={handleSymbolChange}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
