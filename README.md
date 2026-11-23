# 📡 LAUNCH AI
## Advanced Generative AI-Based Telecom Marketing and Campaign Visual Generation Platform

LAUNCH AI automates the creation of customized, on-brand promotional visuals and marketing campaigns for telecommunications companies (Jio, Airtel, Vi) using pretrained diffusion models, LLMs, and deterministic Brand Guardian compliance checking.

---

## 📁 Repository Structure

```text
LAUNCH_AI/
│
├── frontend/                     # Next.js 14 App Router, React & Tailwind CSS
│   ├── app/
│   │   ├── page.tsx              # Landing Page
│   │   ├── login/                # Sign In
│   │   ├── signup/               # Organization Registration
│   │   ├── onboarding/           # Workspace Onboarding
│   │   ├── dashboard/            # Executive Overview & Live KPIs
│   │   ├── campaigns/            # 8-Step Campaign Creation Wizard
│   │   ├── brands/               # Brand Identity Studio & Guidelines
│   │   ├── plans/                # Verified Telecom Recharge Plan Catalog
│   │   ├── editor/               # Interactive Canvas & Layer Compositor
│   │   ├── approvals/            # Multi-User Review & Governance
│   │   ├── analytics/            # Marketing Velocity & Production Metrics
│   │   └── admin/                # System Oversight & Tamper-Evident Audit Logs
│   ├── components/               # Navbar, Sidebar, StatCard
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API client services
│   └── public/                   # Static assets
│
├── backend/                      # FastAPI Python Application
│   ├── main.py                   # App entrypoint, CORS, route registration
│   ├── api/                      # Modular REST API endpoints
│   ├── models/                   # SQLAlchemy ORM models
│   ├── schemas/                  # Pydantic request & response schemas
│   ├── services/                 # Business logic layer
│   ├── ai/                       # LLM Copilot, FLUX.1 Diffusion, Quality Checker
│   ├── workers/                  # Async job runners
│   └── database/                 # SQLAlchemy connection & session manager
│
├── storage/                      # Static assets & generated media
│   ├── logos/
│   ├── generated/
│   └── exports/
│
├── tests/                        # Integration and unit test suite
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment configuration
├── docker-compose.yml            # Multi-container orchestration
└── README.md
```

---

## 🚀 How to Run in VS Code

### 1. Run the Backend (FastAPI)

1. Open VS Code and open the `LAUNCH_AI` folder.
2. Open the terminal (`Ctrl` + `~`).
3. Navigate to `backend`:
   ```bash
   cd backend
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
5. The API is now live at:
   - **API Docs (Swagger UI):** `http://localhost:8000/docs`
   - **Healthcheck:** `http://localhost:8000/`

---

### 2. Run the Frontend (Next.js)

1. Open a second terminal window in VS Code (`Terminal` > `New Terminal`).
2. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:3000`.

---

## 🎨 Zero-Cost Architecture Details

- **Visual Diffusion Model:** Pretrained FLUX.1 serverless endpoint ($0 cost, no GPU billing required).
- **AI Campaign Copilot:** Google Gemini 1.5 Flash API (100% free tier via Google AI Studio).
- **Database:** SQLite for lightweight local dev; supports PostgreSQL for production deployment via `DATABASE_URL`.
- **Brand Guardian:** Deterministic compliance engine checking price currency, 5G quota transparency, and FTC fine print.
