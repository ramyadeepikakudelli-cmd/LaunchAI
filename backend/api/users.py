from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from models.models import User
from schemas.schemas import UserResponse

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    """Admin endpoint: lists all registered users, designers, and managers with age and phone."""
    return db.query(User).order_by(User.id.desc()).all()

@router.get("/me", response_model=UserResponse)
def get_current_user(db: Session = Depends(get_db)):
    user = db.query(User).first()
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Admin endpoint: Permanently removes a user or designer from the platform."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.email in ["ramyadeepikakudelli@gmail.com", "admin@launchai.com"]:
        raise HTTPException(status_code=400, detail="Cannot delete master administrator account Ramya Deepika Kudelli")
    db.delete(user)
    db.commit()
    return {"status": "deleted", "user_id": user_id, "email": user.email}
