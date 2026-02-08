import express from 'express';
import cors from 'cors';
import axios from 'axios';
import NodeCache from 'node-cache';
import mockCompanies from './mockData.js';

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // Cache 5 นาที

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://dashboard-financial.vercel.app', // เปลี่ยนเป็น URL จริงของคุณ
  /\.vercel\.app$/ // อนุญาตทุก subdomain ของ vercel.app
];

app.use(cors({
  origin: function(origin, callback) {
    // อนุญาต requests ที่ไม่มี origin (เช่น mobile apps, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// SEC EDGAR API
const SEC_API = 'https://data.sec.gov';
const headers = {
  'User-Agent': 'XBRL Viewer contact@example.com'
};

// ดึงรายชื่อบริษัททั้งหมด
app.get('/api/companies', async (req, res) => {
  try {
    const cached = cache.get('companies');
    if (cached) return res.json(cached);

    // ลองดึงจาก SEC API
    try {
      const response = await axios.get(`${SEC_API}/files/company_tickers.json`, { headers });
      cache.set('companies', response.data);
      return res.json(response.data);
    } catch (apiError) {
      console.log('SEC API error, using mock data');
    }

    // ใช้ข้อมูล mock 500 บริษัท
    cache.set('companies', mockCompanies);
    res.json(mockCompanies);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลบริษัทได้' });
  }
});

// ดึงข้อมูล XBRL ของบริษัท
app.get('/api/company/:cik', async (req, res) => {
  try {
    const cik = req.params.cik.padStart(10, '0');
    const cached = cache.get(`company_${cik}`);
    if (cached) return res.json(cached);

    // ลองดึงจาก SEC API
    try {
      const response = await axios.get(
        `${SEC_API}/api/xbrl/companyfacts/CIK${cik}.json`,
        { headers }
      );
      cache.set(`company_${cik}`, response.data);
      return res.json(response.data);
    } catch (apiError) {
      console.log('SEC API error for company, using mock data');
    }

    // ใช้ข้อมูล mock
    const mockData = {
      cik: parseInt(cik),
      entityName: 'Sample Company Inc.',
      facts: {
        'us-gaap': {
          Assets: { units: { USD: [{ val: 1000000000, fy: 2023 }] } },
          Revenue: { units: { USD: [{ val: 500000000, fy: 2023 }] } }
        }
      }
    };
    cache.set(`company_${cik}`, mockData);
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูล XBRL ได้' });
  }
});

// ข้อมูลราคาทอง (Mock data - ใช้ API จริงในการพัฒนาจริง)
app.get('/api/gold-price', (req, res) => {
  res.json({
    price: 2045.50,
    change: 12.30,
    changePercent: 0.60,
    unit: 'USD/oz'
  });
});

// ข้อมูลราคาน้ำมัน
app.get('/api/oil-price', (req, res) => {
  res.json({
    wti: 78.45,
    brent: 82.30,
    change: -0.85,
    changePercent: -1.07
  });
});

// อัตราแลกเปลี่ยน
app.get('/api/exchange-rates', (req, res) => {
  res.json({
    USDTHB: 35.42,
    EURUSD: 1.0856,
    GBPUSD: 1.2634,
    JPYUSD: 0.0067
  });
});

// ข่าวสาร (Mock data)
app.get('/api/news', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Fed คงอัตราดอกเบี้ยไว้ที่ระดับเดิม',
      summary: 'ธนาคารกลางสหรัฐฯ ประกาศคงอัตราดอกเบี้ยนโยบาย...',
      date: '2026-02-07',
      source: 'Reuters'
    },
    {
      id: 2,
      title: 'ตลาดหุ้นสหรัฐฯ ปิดบวกตามแรงซื้อหุ้นเทค',
      summary: 'ดัชนี S&P 500 ปิดเพิ่มขึ้น 0.8% หลังผลประกอบการดี...',
      date: '2026-02-07',
      source: 'Bloomberg'
    }
  ]);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
