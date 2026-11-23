from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from schemas.schemas import BrandCreate, BrandResponse
from services.brand_service import get_brands, create_brand

router = APIRouter(prefix="/api/brands", tags=["Brands"])

@router.get("", response_model=List[BrandResponse])
def list_brands(org_id: int = 1, db: Session = Depends(get_db)):
    return get_brands(db, org_id)

@router.post("", response_model=BrandResponse)
def add_brand(data: BrandCreate, db: Session = Depends(get_db)):
    return create_brand(db, data.org_id, data.dict(exclude={"org_id"}))
