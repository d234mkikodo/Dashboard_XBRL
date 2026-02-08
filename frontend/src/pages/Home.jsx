import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticker from '../components/Ticker';
import { TrendingUp, TrendingDown, DollarSign, Droplet, Coins } from 'lucide-react';
import { API_URL } from '../config';

function Home() {
  const [news, setNews] = useState([]);
  const [goldPrice, setGoldPrice] = useState(null);
  const [oilPrice, setOilPrice] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, goldRes, oilRes, exchangeRes] = await Promise.all([
        axios.get(`${API_URL}/api/news`),
        axios.get(`${API_URL}/api/gold-price`),
        axios.get(`${API_URL}/api/oil-price`),
        axios.get(`${API_URL}/api/exchange-rates`)
      ]);
      setNews(newsRes.data);
      setGoldPrice(goldRes.data);
      setOilPrice(oilRes.data);
      setExchangeRates(exchangeRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Ticker />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-3">ยินดีต้อนรับสู่ XBRL Stock Viewer</h1>
          <p className="text-blue-100 text-lg">ศูนย์รวมข้อมูลหุ้นอเมริกาและข่าวสารตลาดการเงินแบบเรียลไทม์</p>
        </div>

        {/* ราคาสินค้าโภคภัณฑ์และอัตราแลกเปลี่ยน */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* ราคาทอง */}
          {goldPrice && (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Coins className="text-yellow-600" size={32} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">ราคาทอง</h3>
                    <p className="text-3xl font-bold text-gray-800">${goldPrice.price}</p>
                    <p className="text-xs text-gray-400">{goldPrice.unit}</p>
                  </div>
                </div>
                <div className={`text-right ${goldPrice.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {goldPrice.change >= 0 ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
                  <p className="font-bold text-lg">{goldPrice.changePercent}%</p>
                  <p className="text-sm">{goldPrice.change >= 0 ? '+' : ''}{goldPrice.change}</p>
                </div>
              </div>
            </div>
          )}

          {/* ราคาน้ำมัน */}
          {oilPrice && (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Droplet className="text-blue-600" size={32} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">น้ำมัน WTI</h3>
                    <p className="text-3xl font-bold text-gray-800">${oilPrice.wti}</p>
                    <p className="text-xs text-gray-400">Brent: ${oilPrice.brent}</p>
                  </div>
                </div>
                <div className={`text-right ${oilPrice.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {oilPrice.change >= 0 ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
                  <p className="font-bold text-lg">{oilPrice.changePercent}%</p>
                  <p className="text-sm">{oilPrice.change >= 0 ? '+' : ''}{oilPrice.change}</p>
                </div>
              </div>
            </div>
          )}

          {/* อัตราแลกเปลี่ยน */}
          {exchangeRates && (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="text-green-600" size={32} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm font-medium">อัตราแลกเปลี่ยน</h3>
                  <p className="text-xs text-gray-400">Real-time rates</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">USD/THB</span>
                  <span className="font-bold text-gray-800">{exchangeRates.USDTHB}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">EUR/USD</span>
                  <span className="font-bold text-gray-800">{exchangeRates.EURUSD}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">GBP/USD</span>
                  <span className="font-bold text-gray-800">{exchangeRates.GBPUSD}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ข่าวสาร */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">ข่าวอัพเดต</h2>
            <span className="text-sm text-gray-500">อัพเดตล่าสุด</span>
          </div>
          <div className="space-y-6">
            {news.map(item => (
              <div key={item.id} className="border-l-4 border-blue-600 pl-6 pb-6 last:pb-0 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{item.summary}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                    {item.source}
                  </span>
                  <span className="text-gray-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
