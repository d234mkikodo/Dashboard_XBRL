import React, { useEffect, useState } from 'react';

function Ticker() {
  const [prices, setPrices] = useState([
    { symbol: 'AAPL', price: 185.50, change: 2.30 },
    { symbol: 'MSFT', price: 420.15, change: -1.25 },
    { symbol: 'GOOGL', price: 142.80, change: 3.45 },
    { symbol: 'AMZN', price: 178.25, change: 1.80 },
    { symbol: 'TSLA', price: 195.40, change: -4.20 },
    { symbol: 'META', price: 485.30, change: 5.60 },
    { symbol: 'NVDA', price: 725.50, change: 12.30 }
  ]);

  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="flex animate-scroll">
        {[...prices, ...prices].map((stock, idx) => (
          <div key={idx} className="flex items-center mx-8 whitespace-nowrap">
            <span className="font-bold mr-2">{stock.symbol}</span>
            <span className="mr-2">${stock.price.toFixed(2)}</span>
            <span className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ticker;
