from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from schemas.schemas import CampaignCreate, CampaignResponse
from services.campaign_service import get_campaigns, create_campaign, submit_campaign_for_approval

router = APIRouter(prefix="/api/campaigns", tags=["Campaigns"])

@router.get("", response_model=List[CampaignResponse])
def list_campaigns(org_id: int = 1, db: Session = Depends(get_db)):
    return get_campaigns(db, org_id)

@router.post("", response_model=CampaignResponse)
def add_campaign(data: CampaignCreate, user_id: int = 1, org_id: int = 1, db: Session = Depends(get_db)):
    return create_campaign(db, org_id, user_id, data.dict())

@router.post("/{campaign_id}/submit")
def submit_for_review(campaign_id: int, db: Session = Depends(get_db)):
    camp = submit_campaign_for_approval(db, campaign_id)
    return {"message": "Campaign submitted for approval", "status": camp.status}
