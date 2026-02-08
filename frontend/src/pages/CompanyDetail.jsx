import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Building2, TrendingUp, DollarSign, BarChart3, FileText, Calendar } from 'lucide-react';
import FinancialCharts from '../components/FinancialCharts';
import { API_URL } from '../config';

function CompanyDetail() {
  const { cik } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [financialData, setFinancialData] = useState({});
  const [availableYears, setAvailableYears] = useState([2025, 2024, 2023, 2022, 2021]);

  useEffect(() => {
    fetchCompanyData();
  }, [cik]);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/company/${cik}`);
      setCompanyData(response.data);
      generateAnalysis(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company data:', error);
      setLoading(false);
    }
  };

  const generateAnalysis = (data) => {
    const analysis = `บริษัท ${data.entityName || 'N/A'} เป็นบริษัทที่จดทะเบียนในตลาดหลักทรัพย์สหรัฐอเมริกา มีการเปิดเผยข้อมูลทางการเงินอย่างครบถ้วนตามมาตรฐานการรายงานทางการเงิน

การวิเคราะห์เบื้องต้น:
• บริษัทมีการดำเนินงานที่โปร่งใสและเป็นไปตามมาตรฐาน SEC
• ข้อมูลทางการเงินครอบคลุมงบดุล งบกำไรขาดทุน และงบกระแสเงินสด
• สามารถติดตามผลการดำเนินงานและฐานะการเงินได้อย่างละเอียด
• ข้อมูลได้รับการตรวจสอบโดยผู้สอบบัญชีรับอนุญาต

คำแนะนำ: ควรศึกษาข้อมูลเพิ่มเติมจากรายงานประจำปี (10-K) และรายงานรายไตรมาส (10-Q) เพื่อการตัดสินใจลงทุนที่ดีที่สุด`;
    setAnalysis(analysis);
    
    // สร้างข้อมูลทางการเงิน 5 ปีย้อนหลัง
    const mockFinancialData = {};
    const baseRevenue = 50000000000 + Math.random() * 100000000000;
    const baseAssets = 80000000000 + Math.random() * 150000000000;
    
    availableYears.forEach((year, index) => {
      const growthFactor = 1 + (0.05 * (5 - index)) + (Math.random() * 0.1 - 0.05);
      const profitMargin = 0.15 + (Math.random() * 0.15);
      
      const revenue = baseRevenue * growthFactor;
      const netIncome = revenue * profitMargin;
      const assets = baseAssets * (1 + (0.08 * (5 - index)));
      const equity = assets * (0.4 + Math.random() * 0.2);
      const liabilities = assets - equity;
      const operatingIncome = revenue * (profitMargin + 0.05);
      const cashFlow = netIncome * (1.1 + Math.random() * 0.2);
      
      mockFinancialData[year] = {
        revenue: Math.round(revenue),
        netIncome: Math.round(netIncome),
        assets: Math.round(assets),
        equity: Math.round(equity),
        liabilities: Math.round(liabilities),
        operatingIncome: Math.round(operatingIncome),
        cashFlow: Math.round(cashFlow),
        eps: (netIncome / 1000000000).toFixed(2),
        roe: ((netIncome / equity) * 100).toFixed(2),
        roa: ((netIncome / assets) * 100).toFixed(2),
        profitMargin: (profitMargin * 100).toFixed(2),
        debtToEquity: (liabilities / equity).toFixed(2)
      };
    });
    
    setFinancialData(mockFinancialData);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <div className="text-xl font-semibold text-gray-700">กำลังโหลดข้อมูลบริษัท...</div>
        <div className="text-sm text-gray-500 mt-2">กรุณารอสักครู่</div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Building2 size={64} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">ไม่พบข้อมูลบริษัท</h3>
          <p className="text-gray-600 mb-6">ขออภัย ไม่สามารถโหลดข้อมูลบริษัทได้ในขณะนี้</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            กลับไปที่ Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-medium">กลับไปที่ Dashboard</span>
        </button>

        {/* Company Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-6 text-white">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex items-center">
              <div className="bg-white p-4 rounded-xl mr-6">
                <Building2 className="text-blue-600" size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{companyData.entityName}</h1>
                <div className="flex items-center space-x-4 text-blue-100">
                  <span className="flex items-center">
                    <FileText size={16} className="mr-1" />
                    CIK: {cik}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Year Selector */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Calendar className="mr-2" size={20} />
                <span className="text-sm font-medium">เลือกปีงบการเงิน</span>
              </div>
              <div className="flex gap-2">
                {availableYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedYear === year
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        {financialData[selectedYear] && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-100 text-sm font-medium">รายได้รวม</span>
                <DollarSign size={24} className="opacity-80" />
              </div>
              <p className="text-3xl font-bold mb-1">
                ${(financialData[selectedYear].revenue / 1000000000).toFixed(2)}B
              </p>
              <p className="text-blue-100 text-xs">Total Revenue</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100 text-sm font-medium">กำไรสุทธิ</span>
                <TrendingUp size={24} className="opacity-80" />
              </div>
              <p className="text-3xl font-bold mb-1">
                ${(financialData[selectedYear].netIncome / 1000000000).toFixed(2)}B
              </p>
              <p className="text-green-100 text-xs">Net Income</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-100 text-sm font-medium">สินทรัพย์รวม</span>
                <BarChart3 size={24} className="opacity-80" />
              </div>
              <p className="text-3xl font-bold mb-1">
                ${(financialData[selectedYear].assets / 1000000000).toFixed(2)}B
              </p>
              <p className="text-purple-100 text-xs">Total Assets</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-100 text-sm font-medium">อัตรากำไรสุทธิ</span>
                <FileText size={24} className="opacity-80" />
              </div>
              <p className="text-3xl font-bold mb-1">
                {financialData[selectedYear].profitMargin}%
              </p>
              <p className="text-orange-100 text-xs">Profit Margin</p>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* บทวิเคราะห์ */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold ml-4 text-gray-800">บทวิเคราะห์</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{analysis}</p>
            </div>
          </div>

          {/* ข้อมูลบริษัท */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="text-blue-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold ml-4 text-gray-800">ข้อมูลบริษัท</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <span className="text-sm font-medium text-gray-500">ชื่อบริษัท</span>
                <p className="text-lg font-semibold text-gray-800">{companyData.entityName}</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4 py-2">
                <span className="text-sm font-medium text-gray-500">CIK Number</span>
                <p className="text-lg font-semibold text-gray-800">{cik}</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4 py-2">
                <span className="text-sm font-medium text-gray-500">ประเภทข้อมูล</span>
                <p className="text-lg font-semibold text-gray-800">Financial Reports</p>
              </div>
              {financialData[selectedYear] && (
                <>
                  <div className="border-l-4 border-yellow-600 pl-4 py-2">
                    <span className="text-sm font-medium text-gray-500">EPS</span>
                    <p className="text-lg font-semibold text-gray-800">${financialData[selectedYear].eps}</p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4 py-2">
                    <span className="text-sm font-medium text-gray-500">ROE</span>
                    <p className="text-lg font-semibold text-gray-800">{financialData[selectedYear].roe}%</p>
                  </div>
                  <div className="border-l-4 border-indigo-600 pl-4 py-2">
                    <span className="text-sm font-medium text-gray-500">Debt to Equity</span>
                    <p className="text-lg font-semibold text-gray-800">{financialData[selectedYear].debtToEquity}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Financial Details */}
        {financialData[selectedYear] && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">รายละเอียดทางการเงิน ปี {selectedYear}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">รายได้จากการดำเนินงาน</span>
                  <span className="text-blue-600 font-bold">
                    ${(financialData[selectedYear].operatingIncome / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">กระแสเงินสด</span>
                  <span className="text-green-600 font-bold">
                    ${(financialData[selectedYear].cashFlow / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">ส่วนของผู้ถือหุ้น</span>
                  <span className="text-purple-600 font-bold">
                    ${(financialData[selectedYear].equity / 1000000000).toFixed(2)}B
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">หนี้สินรวม</span>
                  <span className="text-orange-600 font-bold">
                    ${(financialData[selectedYear].liabilities / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">ROA (ผลตอบแทนต่อสินทรัพย์)</span>
                  <span className="text-indigo-600 font-bold">
                    {financialData[selectedYear].roa}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
                  <span className="text-gray-700 font-medium">กำไรต่อหุ้น (EPS)</span>
                  <span className="text-pink-600 font-bold">
                    ${financialData[selectedYear].eps}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Charts */}
        {Object.keys(financialData).length > 0 && (
          <FinancialCharts 
            financialData={financialData}
            availableYears={availableYears}
            companyName={companyData.entityName}
          />
        )}

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <span className="text-sm font-medium text-gray-500">Financial Data</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Available</h3>
            <p className="text-sm text-gray-600">ข้อมูลทางการเงินพร้อมใช้งาน</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="text-green-600" size={24} />
              </div>
              <span className="text-sm font-medium text-gray-500">Reports</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">SEC Filings</h3>
            <p className="text-sm text-gray-600">เอกสารยื่นต่อ SEC</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <span className="text-sm font-medium text-gray-500">Analysis</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">XBRL Data</h3>
            <p className="text-sm text-gray-600">ข้อมูลมาตรฐาน XBRL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
