"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
      } catch (err) {
        setError('Failed to fetch crypto data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return { cryptoData, loading, error };
};

export default useCryptoData;
