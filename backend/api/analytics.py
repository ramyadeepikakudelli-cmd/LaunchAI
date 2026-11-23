from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.connection import get_db
from models.models import Campaign, Brand, TelecomPlan

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/dashboard")
def dashboard_stats(org_id: int = 1, db: Session = Depends(get_db)):
    total_campaigns = db.query(Campaign).filter(Campaign.org_id == org_id).count()
    approved = db.query(Campaign).filter(Campaign.org_id == org_id, Campaign.status == "Approved").count()
    pending = db.query(Campaign).filter(Campaign.org_id == org_id, Campaign.status == "Under Review").count()
    plans = db.query(TelecomPlan).filter(TelecomPlan.org_id == org_id).count()
    
    return {
        "total_campaigns": total_campaigns,
        "approved_campaigns": approved,
        "pending_campaigns": pending,
        "total_plans": plans,
        "avg_generation_seconds": 4.2
    }
