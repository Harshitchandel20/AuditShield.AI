# Deployment Guide - AuditShield AI

## 🚀 Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **MongoDB Atlas Account** (free tier works)
- **Google Gemini API Key**

## 📦 Backend Deployment

### 1. Environment Setup

Create `.env` in `/backend`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auditshield?retryWrites=true&w=majority
DATABASE_NAME=auditshield
COLLECTION_NAME=compliance_chunks
VECTOR_INDEX_NAME=vector_index
```

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. MongoDB Atlas Vector Search Index

In MongoDB Atlas, create a vector search index on the `compliance_chunks` collection:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "cosine"
    }
  ]
}
```

### 4. Run Backend

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🎨 Frontend Deployment

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Frontend

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## ☁️ Production Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

**Backend (Railway):**
1. Create new project in Railway
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Option 2: Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - MONGODB_URI=${MONGODB_URI}
  
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
```

Run with:
```bash
docker-compose up -d
```

## 🔒 Security Considerations

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Use MongoDB IP whitelist** - Restrict database access
3. **Enable CORS properly** - Only allow trusted origins in production
4. **Rate limiting** - Add rate limits to API endpoints
5. **Input validation** - Validate all user inputs

## 📊 Monitoring

- **Backend logs:** Check FastAPI logs for errors
- **MongoDB Atlas:** Monitor query performance
- **Gemini API:** Track API usage and quotas

## 🐛 Troubleshooting

**Issue:** MongoDB connection fails  
**Solution:** Check IP whitelist in MongoDB Atlas, verify connection string

**Issue:** Gemini API errors  
**Solution:** Verify API key, check quota limits

**Issue:** CORS errors  
**Solution:** Update CORS middleware in `main.py` with frontend URL
