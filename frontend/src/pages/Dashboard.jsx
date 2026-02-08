import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Building2, Filter, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { API_URL } from '../config';

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/companies`);
      const companiesArray = Object.values(response.data); // แสดงทั้งหมด 500 บริษัท
      setCompanies(companiesArray);
      setFilteredCompanies(companiesArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase();
    const filtered = companies.filter(company =>
      company.title?.toLowerCase().includes(searchTerm) ||
      company.ticker?.toLowerCase().includes(searchTerm)
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const handleCompanyClick = (cik) => {
    navigate(`/company/${cik}`);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <div className="text-xl font-semibold text-gray-700">กำลังโหลดข้อมูล...</div>
        <div className="text-sm text-gray-500 mt-2">กรุณารอสักครู่</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard - หุ้นอเมริกา</h1>
              <p className="text-gray-600">ข้อมูลบริษัทจดทะเบียนในตลาดหลักทรัพย์สหรัฐอเมริกา</p>
            </div>
            <div className="flex items-center bg-blue-50 px-4 py-3 rounded-lg">
              <Filter className="mr-2 text-blue-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">ทั้งหมด</div>
                <div className="text-2xl font-bold text-blue-600">{filteredCompanies.length}</div>
                <div className="text-xs text-gray-500">บริษัท</div>
              </div>
            </div>
          </div>
        </div>
      
      {/* ช่องค้นหา */}
      <div className="mb-6">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="ค้นหาชื่อบริษัทหรือสัญลักษณ์หุ้น..."
        />
      </div>

      {/* รายการบริษัท */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  สัญลักษณ์
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  ชื่อบริษัท
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  CIK
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCompanies.map((company, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="text-blue-600" size={20} />
                      </div>
                      <div className="ml-3">
                        <span className="font-bold text-blue-600 text-lg">{company.ticker}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{company.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {company.cik_str}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleCompanyClick(company.cik_str)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {filteredCompanies.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">ไม่พบบริษัทที่ค้นหา</h3>
            <p className="text-gray-500">ลองค้นหาด้วยคำอื่นหรือตรวจสอบการสะกดคำ</p>
          </div>
        )}

      {/* Pagination - Professional Style */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* แสดงข้อมูลหน้า */}
            <div className="text-sm text-gray-600">
              แสดง {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredCompanies.length)} จาก {filteredCompanies.length} บริษัท
            </div>

            {/* ปุ่ม Pagination */}
            <div className="flex items-center space-x-2">
              {/* ไปหน้าแรก */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                title="หน้าแรก"
              >
                <ChevronsLeft size={20} />
              </button>

              {/* หน้าก่อนหน้า */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                title="ก่อนหน้า"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* เลขหน้า */}
              <div className="flex space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[40px] px-3 py-2 rounded-lg transition font-medium ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* หน้าถัดไป */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                title="ถัดไป"
              >
                <ChevronRight size={20} />
              </button>

              {/* ไปหน้าสุดท้าย */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                title="หน้าสุดท้าย"
              >
                <ChevronsRight size={20} />
              </button>
            </div>

            {/* Jump to page */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">ไปหน้า:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Dashboard;
