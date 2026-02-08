# XBRL Stock Viewer

เว็บแอปพลิเคชันสำหรับดึงและแสดงข้อมูล XBRL ของหุ้นอเมริกา

## คุณสมบัติ

- 📰 หน้าแรก: ข่าวอัพเดต ราคาทอง น้ำมัน อัตราแลกเปลี่ยน และราคาหุ้นแบบ ticker
- 📊 Dashboard: ค้นหาและดูข้อมูลหุ้นทั้งหมด
- 📈 บทวิเคราะห์และข้อมูลบริษัท
- 🔍 ระบบค้นหาหุ้น

## เทคโนโลยี

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- API: SEC EDGAR API สำหรับข้อมูล XBRL

## การติดตั้ง

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## การใช้งาน

1. เปิด backend ที่ http://localhost:3001
2. เปิด frontend ที่ http://localhost:5173
