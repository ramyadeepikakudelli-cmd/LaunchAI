from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# --- Auth & User ---
class UserBase(BaseModel):
    email: str
    full_name: str
    role: str = "Designer"
    age: Optional[int] = 24
    phone: Optional[str] = "7013370889"
    dob: Optional[str] = "Aug 25"

class UserCreate(UserBase):
    password: str
    org_name: str = "Reliance Jio Infocomm"

class UserResponse(UserBase):
    id: int
    org_id: Optional[int] = None
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# --- Admin Messages to Designers ---
class MessageCreate(BaseModel):
    receiver_id: Optional[int] = None
    receiver_name: Optional[str] = "All Designers"
    subject: str
    content: str
    priority: str = "Directive"

class MessageResponse(BaseModel):
    id: int
    sender_name: str
    receiver_name: str
    subject: str
    content: str
    priority: str
    created_at: datetime
    class Config:
        from_attributes = True

# --- Brand ---
class BrandBase(BaseModel):
    name: str
    network_tag: str = "5G ULTRA"
    primary_color: str = "#0A2885"
    secondary_color: str = "#E31B23"
    badge_color: str = "#E31B23"
    typography: str = "Plus Jakarta Sans Bold"
    slogan: Optional[str] = None
    guidelines: Optional[str] = None

class BrandCreate(BrandBase):
    org_id: Optional[int] = 1

class BrandResponse(BrandBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# --- Telecom Plan ---
class PlanBase(BaseModel):
    name: str
    category: str = "5G Prepaid"
    price: str
    data_benefits: str
    validity: str
    calling_benefits: str = "Unlimited Any Net"
    sms_benefits: str = "100 SMS/Day"
    additional_benefits: Optional[str] = None

class PlanCreate(PlanBase):
    brand_id: int
    org_id: Optional[int] = 1

class PlanResponse(PlanBase):
    id: int
    brand_id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# --- Campaign ---
class CampaignBase(BaseModel):
    name: str
    objective: str
    target_audience: str
    campaign_type: str = "New plan launch"
    creative_style: str = "Futuristic 3D Tech"
    tone: str = "Exciting"
    aspect_ratio: str = "1:1 (Instagram Post)"

class CampaignCreate(CampaignBase):
    brand_id: int
    plan_id: int

class CampaignResponse(CampaignBase):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# --- AI & Generation ---
class CopilotRequest(BaseModel):
    query: str
    plan_name: str
    price: str
    brand_name: str

class GenerationRequest(BaseModel):
    campaign_id: int
    prompt: Optional[str] = None
    num_variations: int = 4

class QualityCheckRequest(BaseModel):
    brand_name: str
    price: str
    data_benefits: str
    validity: str
    disclaimer: str
    dimensions: List[int] = [1024, 1024]
