from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from schemas.schemas import PlanCreate, PlanResponse
from services.brand_service import get_plans, create_plan

router = APIRouter(prefix="/api/plans", tags=["Telecom Plans"])

@router.get("", response_model=List[PlanResponse])
def list_plans(org_id: int = 1, db: Session = Depends(get_db)):
    return get_plans(db, org_id)

@router.post("", response_model=PlanResponse)
def add_plan(data: PlanCreate, db: Session = Depends(get_db)):
    return create_plan(db, data.org_id, data.dict(exclude={"org_id"}))
