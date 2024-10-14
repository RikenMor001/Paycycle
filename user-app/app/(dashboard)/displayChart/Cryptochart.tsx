'use client'; 

import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import useCryptoData from '../chart/route';

Chart.register(...registerables);

const CryptoChart = () => {
  const { cryptoData, loading, error } = useCryptoData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const bitcoin = cryptoData[0]; 

  if (!bitcoin) {
    return <p>Error: Invalid data structure</p>;
  }

  const data = {
    labels: cryptoData.map(crypto => crypto.name), 
    datasets: [
      {
        label: 'Current Prices in USD',
        data: cryptoData.map(crypto => crypto.current_price), 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default CryptoChart;
