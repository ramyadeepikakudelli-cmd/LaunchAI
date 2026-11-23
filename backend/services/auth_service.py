import os
import hashlib
from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy.orm import Session
from models.models import User, Organization

SECRET_KEY = os.getenv("SECRET_KEY", "launch-ai-super-secret-key-1234")
ALGORITHM = "HS256"

def get_password_hash(password: str) -> str:
    salt = "launch_ai_salt_"
    return hashlib.sha256((salt + password).encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return get_password_hash(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=1440))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def register_user(db: Session, email: str, password: str, full_name: str, org_name: str, role: str = "Designer", age: int = 24, phone: str = "", dob: str = "Aug 25"):
    # Check or create org
    org = db.query(Organization).filter(Organization.name == org_name).first()
    if not org:
        org = Organization(name=org_name, slug=org_name.lower().replace(" ", "-"))
        db.add(org)
        db.commit()
        db.refresh(org)
        
    user = User(
        org_id=org.id,
        email=email,
        full_name=full_name,
        hashed_password=get_password_hash(password),
        role=role,
        age=age,
        phone=phone,
        dob=dob
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
