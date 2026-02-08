import React from 'react';
import { BarChart3 } from 'lucide-react';

function FinancialChart({ data, title }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <BarChart3 className="mr-2 text-blue-500" />
          {title}
        </h3>
        <p className="text-gray-500">ไม่มีข้อมูล</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => Math.abs(d.value)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <BarChart3 className="mr-2 text-blue-500" />
        {title}
      </h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold">
                ${(item.value / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.value >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${(Math.abs(item.value) / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialChart;
