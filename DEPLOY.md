# การ Deploy ไป Vercel

## ขั้นตอนที่ 1: เตรียม GitHub Repository

```bash
# Initialize git (ถ้ายังไม่ได้ทำ)
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit: XBRL Stock Viewer"

# สร้าง repository ใหม่บน GitHub แล้วเชื่อมต่อ
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## ขั้นตอนที่ 2: Deploy Frontend ไป Vercel

### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)

1. ไปที่ https://vercel.com
2. Sign up / Login ด้วย GitHub
3. คลิก "Add New Project"
4. เลือก repository ของคุณ
5. ตั้งค่า:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. คลิก "Deploy"

### วิธีที่ 2: ผ่าน Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel

# ตอบคำถาม:
# - Set up and deploy? Y
# - Which scope? (เลือก account ของคุณ)
# - Link to existing project? N
# - Project name? (ใส่ชื่อโปรเจกต์)
# - Directory? ./
# - Override settings? N

# Deploy production
vercel --prod
```

## ขั้นตอนที่ 3: Deploy Backend ไป Vercel

```bash
# Deploy backend แยกต่างหาก
cd backend
vercel

# หรือใช้ Vercel Dashboard:
# 1. สร้าง New Project
# 2. Root Directory: backend
# 3. Build Command: (ไม่ต้องใส่)
# 4. Output Directory: (ไม่ต้องใส่)
```

## ขั้นตอนที่ 4: เชื่อมต่อ Frontend กับ Backend

1. หลังจาก deploy backend แล้ว จะได้ URL เช่น: `https://your-backend.vercel.app`
2. ไปที่ Vercel Dashboard ของ Frontend
3. Settings → Environment Variables
4. เพิ่ม:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.vercel.app`
5. Redeploy frontend

## ขั้นตอนที่ 5: อัพเดทโค้ด Frontend

แก้ไขไฟล์ที่เรียก API ให้ใช้ environment variable:

```javascript
// แทนที่ http://localhost:3001 ด้วย
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ตัวอย่าง:
const response = await axios.get(`${API_URL}/api/companies`);
```

## ขั้นตอนที่ 6: ตั้งค่า CORS ใน Backend

แก้ไข `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app'
  ]
}));
```

## การอัพเดทโปรเจกต์

```bash
# แก้ไขโค้ด
git add .
git commit -m "Update: description"
git push

# Vercel จะ auto-deploy อัตโนมัติ
```

## ตรวจสอบ Deployment

- Frontend: https://your-project.vercel.app
- Backend: https://your-backend.vercel.app
- Logs: ดูได้ใน Vercel Dashboard

## หมายเหตุ

- Vercel ฟรี tier มีข้อจำกัด:
  - 100 GB Bandwidth/เดือน
  - Serverless Functions: 100 GB-Hours
  - Build time: 6000 นาที/เดือน
- Backend บน Vercel จะเป็น Serverless Functions (cold start อาจช้า)
- สำหรับ production ควรใช้ database จริง แทน mock data
