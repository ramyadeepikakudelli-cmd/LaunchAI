from sqlalchemy.orm import Session
from models.models import Campaign, CampaignPrompt, Approval

def get_campaigns(db: Session, org_id: int):
    return db.query(Campaign).filter(Campaign.org_id == org_id).order_by(Campaign.created_at.desc()).all()

def create_campaign(db: Session, org_id: int, user_id: int, data: dict):
    camp = Campaign(org_id=org_id, created_by_user_id=user_id, **data)
    db.add(camp)
    db.commit()
    db.refresh(camp)
    return camp

def submit_campaign_for_approval(db: Session, campaign_id: int):
    camp = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if camp:
        camp.status = "Under Review"
        app = Approval(campaign_id=campaign_id, status="Pending", comments="Submitted for review")
        db.add(app)
        db.commit()
        db.refresh(camp)
    return camp
