import { useEffect, useState } from 'react';

import { getSwaps } from '../../services/swapService';

import SwapCard from './SwapCard';

import './Swaps.css';

const SwapList = () => {
  const [swaps, setSwaps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSwaps = async () => {
      try {
        const data = await getSwaps();
        setSwaps(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadSwaps();
  }, []);

  return (
    <main className="swaps-page">
      <div className="swaps-header">
        <p className="swaps-eyebrow">YOUR ACTIVITY</p>
        <h1>My Swaps</h1>
        <p>
          Keep track of your skill exchanges and see the progress of your
          current swaps.
        </p>
      </div>

      {message && (
        <p className="swaps-message">{message}</p>
      )}

      {swaps.length === 0 ? (
        <div className="swaps-empty">
          <p>No swaps found.</p>
        </div>
      ) : (
        <ul className="swaps-grid">
          {swaps.map((swap) => (
            <SwapCard key={swap._id} swap={swap} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default SwapList;