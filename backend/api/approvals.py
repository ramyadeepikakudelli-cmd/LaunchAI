from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.connection import get_db
from models.models import Approval, Campaign

router = APIRouter(prefix="/api/approvals", tags=["Approvals"])

@router.get("")
def list_approvals(db: Session = Depends(get_db)):
    return db.query(Approval).all()

@router.post("/{approval_id}/decision")
def record_decision(approval_id: int, decision: str, comments: str = "", db: Session = Depends(get_db)):
    app = db.query(Approval).filter(Approval.id == approval_id).first()
    if app:
        app.status = decision
        app.comments = comments
        camp = db.query(Campaign).filter(Campaign.id == app.campaign_id).first()
        if camp:
            camp.status = decision
        db.commit()
    return {"approval_id": approval_id, "status": decision}
