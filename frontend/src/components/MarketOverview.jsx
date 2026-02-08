import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function MarketOverview() {
  const indices = [
    { name: 'S&P 500', value: 5234.18, change: 45.23, changePercent: 0.87 },
    { name: 'Dow Jones', value: 38654.42, change: -123.45, changePercent: -0.32 },
    { name: 'NASDAQ', value: 16420.58, change: 98.76, changePercent: 0.61 },
    { name: 'Russell 2000', value: 2045.67, change: 12.34, changePercent: 0.61 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ภาพรวมตลาด</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {indices.map((index, idx) => (
          <div key={idx} className="border rounded-lg p-4 hover:shadow-lg transition">
            <h3 className="text-sm text-gray-600 mb-1">{index.name}</h3>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {index.value.toLocaleString()}
            </p>
            <div className={`flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {index.change >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              <span className="font-semibold">
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketOverview;
