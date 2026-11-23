from sqlalchemy.orm import Session
from models.models import Brand, TelecomPlan

def get_brands(db: Session, org_id: int):
    return db.query(Brand).filter(Brand.org_id == org_id).all()

def create_brand(db: Session, org_id: int, data: dict):
    b = Brand(org_id=org_id, **data)
    db.add(b)
    db.commit()
    db.refresh(b)
    return b

def get_plans(db: Session, org_id: int):
    return db.query(TelecomPlan).filter(TelecomPlan.org_id == org_id).all()

def create_plan(db: Session, org_id: int, data: dict):
    p = TelecomPlan(org_id=org_id, **data)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p
