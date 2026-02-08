import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

function FinancialCharts({ financialData, availableYears, companyName }) {
  const [activeChart, setActiveChart] = useState('line');
  const [timeRange, setTimeRange] = useState('5Y');

  // เตรียมข้อมูลสำหรับกราฟ
  const prepareChartData = () => {
    const years = timeRange === '1Y' ? [availableYears[0]] :
                  timeRange === '3Y' ? availableYears.slice(0, 3) :
                  availableYears;

    return years.map(year => ({
      year: year.toString(),
      รายได้: (financialData[year]?.revenue / 1000000000).toFixed(2),
      กำไรสุทธิ: (financialData[year]?.netIncome / 1000000000).toFixed(2),
      สินทรัพย์: (financialData[year]?.assets / 1000000000).toFixed(2),
      กระแสเงินสด: (financialData[year]?.cashFlow / 1000000000).toFixed(2)
    })).reverse();
  };

  // ข้อมูลสำหรับ Pie Chart (ใช้ปีล่าสุด)
  const preparePieData = () => {
    const latestYear = availableYears[0];
    const data = financialData[latestYear];
    if (!data) return [];

    return [
      { name: 'ส่วนของผู้ถือหุ้น', value: parseFloat((data.equity / 1000000000).toFixed(2)) },
      { name: 'หนี้สิน', value: parseFloat((data.liabilities / 1000000000).toFixed(2)) }
    ];
  };

  const chartData = prepareChartData();
  const pieData = preparePieData();
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];
  const PIE_COLORS = ['#3B82F6', '#EF4444'];

  const chartTypes = [
    { id: 'line', name: 'กราฟเส้น', icon: Activity },
    { id: 'area', name: 'กราฟพื้นที่', icon: TrendingUp },
    { id: 'bar', name: 'กราฟแท่ง', icon: BarChart3 },
    { id: 'pie', name: 'กราฟวงกลม', icon: PieChartIcon }
  ];

  const timeRanges = ['1Y', '3Y', '5Y'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">การวิเคราะห์ทางการเงิน</h2>
          <p className="text-gray-600 text-sm mt-1">{companyName}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {chartTypes.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveChart(type.id)}
                  className={`flex items-center px-3 py-2 rounded-md transition ${
                    activeChart === type.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  title={type.name}
                >
                  <Icon size={18} />
                  <span className="ml-2 text-sm font-medium hidden sm:inline">{type.name}</span>
                </button>
              );
            })}
          </div>

          {/* Time Range Selector */}
          {activeChart !== 'pie' && (
            <div className="flex bg-gray-100 rounded-lg p-1">
              {timeRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    timeRange === range
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full" style={{ height: '400px' }}>
        {activeChart === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'พันล้านดอลลาร์', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `$${value}B`}
              />
              <Legend />
              <Line type="monotone" dataKey="รายได้" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="กำไรสุทธิ" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="สินทรัพย์" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'area' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'พันล้านดอลลาร์', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `$${value}B`}
              />
              <Legend />
              <Area type="monotone" dataKey="รายได้" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="กำไรสุทธิ" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'พันล้านดอลลาร์', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `$${value}B`}
              />
              <Legend />
              <Bar dataKey="รายได้" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="กำไรสุทธิ" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="กระแสเงินสด" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'pie' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: $${value}B (${(percent * 100).toFixed(1)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}B`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">หมายเหตุ:</span> ข้อมูลแสดงเป็นหน่วยพันล้านดอลลาร์สหรัฐ (Billions USD) 
          {activeChart === 'pie' && ` สำหรับปี ${availableYears[0]}`}
        </p>
      </div>
    </div>
  );
}

export default FinancialCharts;
