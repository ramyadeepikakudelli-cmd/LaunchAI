import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database.connection import Base, engine, SessionLocal
from models.models import Organization, Brand, TelecomPlan, User
from services.auth_service import get_password_hash

from api.auth import router as auth_router
from api.users import router as users_router
from api.brands import router as brands_router
from api.plans import router as plans_router
from api.campaigns import router as campaigns_router
from api.generation import router as generation_router
from api.approvals import router as approvals_router
from api.analytics import router as analytics_router
from api.messages import router as messages_router

# Initialize Tables
Base.metadata.create_all(bind=engine)

# Seed default data if empty
def seed_initial():
    db = SessionLocal()
    if db.query(Organization).count() == 0:
        org = Organization(name="Reliance Jio Infocomm", slug="jio")
        db.add(org)
        db.commit()
        db.refresh(org)

        admin = User(
            org_id=org.id,
            full_name="Ramya Deepika Kudelli",
            email="ramyadeepikakudelli@gmail.com",
            hashed_password=get_password_hash("admin123"),
            role="Admin",
            age=24,
            phone="7013370889",
            dob="Aug 25"
        )
        designer = User(
            org_id=org.id,
            full_name="Aryan Verma",
            email="designer@jio.com",
            hashed_password=get_password_hash("designer123"),
            role="Designer",
            age=24,
            phone="+91 98111 22233",
            dob="Jan 15"
        )
        db.add(admin)
        db.add(designer)

        # Seed initial admin directive to designers
        msg = AdminMessage(
            sender_name="Ramya Deepika Kudelli (Admin)",
            receiver_name="All Designers",
            subject="Diwali 5G SuperSpeed Launch Directives",
            content="Welcome designers! Please ensure all synthesized campaign backgrounds follow the new Jio True 5G guidelines: high-contrast blue (#0A2885) and crimson badge (#E31B23). Submit for brand review when ready.",
            priority="Directive"
        )
        db.add(msg)

        brand = Brand(
            org_id=org.id,
            name="Jio True 5G",
            network_tag="TRUE 5G",
            primary_color="#0A2885",
            secondary_color="#E31B23",
            badge_color="#E31B23",
            typography="Plus Jakarta Sans Bold",
            slogan="For a Digital Life",
            guidelines="High-contrast digital blue with crimson red accents."
        )
        db.add(brand)
        db.commit()
        db.refresh(brand)

        plan = TelecomPlan(
            org_id=org.id,
            brand_id=brand.id,
            name="Jio 5G Unlimited Gamer",
            category="5G Prepaid",
            price="₹349",
            data_benefits="2.5 GB/Day + Unlimited 5G",
            validity="28 Days",
            calling_benefits="Unlimited Local & STD",
            sms_benefits="100 SMS/Day",
            additional_benefits="Free JioCinema Premium + JioCloud"
        )
        db.add(plan)
        db.commit()
    db.close()

seed_initial()

app = FastAPI(
    title="LAUNCH AI : Telecom Campaign API",
    description="Backend API for Generative AI-powered telecom marketing and campaign visual generation.",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure storage directories
os.makedirs("./storage/logos", exist_ok=True)
os.makedirs("./storage/generated", exist_ok=True)
os.makedirs("./storage/exports", exist_ok=True)

app.mount("/storage", StaticFiles(directory="./storage"), name="storage")

# Include Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(brands_router)
app.include_router(plans_router)
app.include_router(campaigns_router)
app.include_router(generation_router)
app.include_router(approvals_router)
app.include_router(analytics_router)
app.include_router(messages_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "LAUNCH AI Backend API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
