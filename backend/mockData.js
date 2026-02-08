// Mock data สำหรับ 500 บริษัทชั้นนำในตลาดหุ้นอเมริกา
export const mockCompanies = {
  0: { cik_str: '320193', ticker: 'AAPL', title: 'Apple Inc.' },
  1: { cik_str: '789019', ticker: 'MSFT', title: 'Microsoft Corp' },
  2: { cik_str: '1018724', ticker: 'AMZN', title: 'Amazon.com Inc' },
  3: { cik_str: '1652044', ticker: 'GOOGL', title: 'Alphabet Inc.' },
  4: { cik_str: '1326801', ticker: 'META', title: 'Meta Platforms Inc' },
  5: { cik_str: '1045810', ticker: 'NVDA', title: 'NVIDIA Corp' },
  6: { cik_str: '1318605', ticker: 'TSLA', title: 'Tesla Inc' },
  7: { cik_str: '1067983', ticker: 'BRK.B', title: 'Berkshire Hathaway Inc' },
  8: { cik_str: '1559720', ticker: 'V', title: 'Visa Inc.' },
  9: { cik_str: '19617', ticker: 'JPM', title: 'JPMorgan Chase & Co' },
  10: { cik_str: '1166559', ticker: 'JNJ', title: 'Johnson & Johnson' },
  11: { cik_str: '1534701', ticker: 'WMT', title: 'Walmart Inc' },
  12: { cik_str: '1090872', ticker: 'PG', title: 'Procter & Gamble Co' },
  13: { cik_str: '1800', ticker: 'XOM', title: 'Exxon Mobil Corp' },
  14: { cik_str: '1403161', ticker: 'MA', title: 'Mastercard Inc' },
  15: { cik_str: '1467373', ticker: 'UNH', title: 'UnitedHealth Group Inc' },
  16: { cik_str: '1364742', ticker: 'HD', title: 'Home Depot Inc' },
  17: { cik_str: '1108524', ticker: 'CVX', title: 'Chevron Corp' },
  18: { cik_str: '1065088', ticker: 'DIS', title: 'Walt Disney Co' },
  19: { cik_str: '1637459', ticker: 'NFLX', title: 'Netflix Inc' },
  20: { cik_str: '1341439', ticker: 'ADBE', title: 'Adobe Inc' },
  21: { cik_str: '1288776', ticker: 'CRM', title: 'Salesforce Inc' },
  22: { cik_str: '1326160', ticker: 'INTC', title: 'Intel Corp' },
  23: { cik_str: '1652044', ticker: 'GOOG', title: 'Alphabet Inc. Class C' },
  24: { cik_str: '1018840', ticker: 'CSCO', title: 'Cisco Systems Inc' },
  25: { cik_str: '1137774', ticker: 'PFE', title: 'Pfizer Inc' },
  26: { cik_str: '1113169', ticker: 'MRK', title: 'Merck & Co Inc' },
  27: { cik_str: '1800', ticker: 'ABT', title: 'Abbott Laboratories' },
  28: { cik_str: '1534675', ticker: 'TMO', title: 'Thermo Fisher Scientific Inc' },
  29: { cik_str: '1140536', ticker: 'DHR', title: 'Danaher Corp' },
  30: { cik_str: '1156375', ticker: 'COST', title: 'Costco Wholesale Corp' },
  31: { cik_str: '1043277', ticker: 'NKE', title: 'Nike Inc' },
  32: { cik_str: '1090727', ticker: 'MCD', title: "McDonald's Corp" },
  33: { cik_str: '1163165', ticker: 'PEP', title: 'PepsiCo Inc' },
  34: { cik_str: '1024725', ticker: 'KO', title: 'Coca-Cola Co' },
  35: { cik_str: '1067701', ticker: 'ORCL', title: 'Oracle Corp' },
  36: { cik_str: '1136893', ticker: 'ACN', title: 'Accenture PLC' },
  37: { cik_str: '1137411', ticker: 'TXN', title: 'Texas Instruments Inc' },
  38: { cik_str: '1141391', ticker: 'QCOM', title: 'Qualcomm Inc' },
  39: { cik_str: '1136869', ticker: 'AMD', title: 'Advanced Micro Devices Inc' },
  40: { cik_str: '1137789', ticker: 'AVGO', title: 'Broadcom Inc' },
  41: { cik_str: '1136200', ticker: 'AMAT', title: 'Applied Materials Inc' },
  42: { cik_str: '1137411', ticker: 'LRCX', title: 'Lam Research Corp' },
  43: { cik_str: '1136869', ticker: 'MU', title: 'Micron Technology Inc' },
  44: { cik_str: '1137789', ticker: 'KLAC', title: 'KLA Corp' },
  45: { cik_str: '1136200', ticker: 'NXPI', title: 'NXP Semiconductors NV' },
  46: { cik_str: '1137411', ticker: 'MRVL', title: 'Marvell Technology Inc' },
  47: { cik_str: '1136869', ticker: 'SNPS', title: 'Synopsys Inc' },
  48: { cik_str: '1137789', ticker: 'CDNS', title: 'Cadence Design Systems Inc' },
  49: { cik_str: '1136200', ticker: 'ADSK', title: 'Autodesk Inc' },
  50: { cik_str: '1137411', ticker: 'INTU', title: 'Intuit Inc' }
};

// สร้างข้อมูล 450 บริษัทเพิ่มเติม
const additionalCompanies = [];
const sectors = ['Technology', 'Healthcare', 'Financial', 'Consumer', 'Industrial', 'Energy', 'Materials', 'Utilities', 'Real Estate'];
const prefixes = ['Global', 'American', 'United', 'First', 'National', 'International', 'Advanced', 'Digital', 'Smart', 'Next'];
const suffixes = ['Corp', 'Inc', 'Group', 'Holdings', 'Systems', 'Solutions', 'Technologies', 'Industries', 'Enterprises', 'Partners'];

for (let i = 51; i < 500; i++) {
  const sector = sectors[i % sectors.length];
  const prefix = prefixes[Math.floor(i / 50) % prefixes.length];
  const suffix = suffixes[i % suffixes.length];
  const ticker = `${sector.substring(0, 2).toUpperCase()}${prefix.substring(0, 1)}${i}`.substring(0, 5);
  
  mockCompanies[i] = {
    cik_str: String(1000000 + i).padStart(7, '0'),
    ticker: ticker,
    title: `${prefix} ${sector} ${suffix}`
  };
}

export default mockCompanies;
