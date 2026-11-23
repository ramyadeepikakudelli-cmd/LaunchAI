from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database.connection import Base

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="organization")
    brands = relationship("Brand", back_populates="organization")
    campaigns = relationship("Campaign", back_populates="organization")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="Designer") # Admin, Marketing Manager, Designer, Viewer
    age = Column(Integer, nullable=True, default=24)
    phone = Column(String(50), nullable=True, default="7013370889")
    dob = Column(String(50), nullable=True, default="Aug 25")
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="users")

class AdminMessage(Base):
    __tablename__ = "admin_messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String(255), default="Ramya Deepika Kudelli (Admin)")
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=True) # None = All Designers
    receiver_name = Column(String(255), default="All Designers")
    subject = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    priority = Column(String(50), default="Directive") # Urgent, Directive, Notice, Info
    created_at = Column(DateTime, default=datetime.utcnow)

class Brand(Base):
    __tablename__ = "brands"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    name = Column(String(255), nullable=False)
    network_tag = Column(String(100), default="5G ULTRA")
    primary_color = Column(String(20), default="#0A2885")
    secondary_color = Column(String(20), default="#E31B23")
    badge_color = Column(String(20), default="#E31B23")
    typography = Column(String(100), default="Plus Jakarta Sans Bold")
    slogan = Column(String(255))
    guidelines = Column(Text)
    logo_path = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="brands")
    plans = relationship("TelecomPlan", back_populates="brand")

class TelecomPlan(Base):
    __tablename__ = "telecom_plans"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    brand_id = Column(Integer, ForeignKey("brands.id"))
    name = Column(String(255), nullable=False)
    category = Column(String(100), default="5G Prepaid")
    price = Column(String(50), nullable=False) # e.g. ₹349
    data_benefits = Column(String(100), nullable=False) # e.g. 2.5 GB/Day
    validity = Column(String(50), nullable=False) # e.g. 28 Days
    calling_benefits = Column(String(100), default="Unlimited Any Net")
    sms_benefits = Column(String(100), default="100 SMS/Day")
    additional_benefits = Column(Text)
    status = Column(String(50), default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

    brand = relationship("Brand", back_populates="plans")

class Campaign(Base):
    __tablename__ = "campaigns"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    brand_id = Column(Integer, ForeignKey("brands.id"))
    plan_id = Column(Integer, ForeignKey("telecom_plans.id"))
    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(255), nullable=False)
    objective = Column(String(255), nullable=False)
    target_audience = Column(String(255), nullable=False)
    campaign_type = Column(String(100), default="New plan launch")
    creative_style = Column(String(100), default="Futuristic 3D Tech")
    tone = Column(String(100), default="Exciting")
    aspect_ratio = Column(String(50), default="1:1 (Instagram Post)")
    status = Column(String(50), default="Draft") # Draft, Under Review, Approved, Rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="campaigns")
    prompts = relationship("CampaignPrompt", back_populates="campaign")
    images = relationship("GeneratedImage", back_populates="campaign")
    versions = relationship("DesignVersion", back_populates="campaign")

class CampaignPrompt(Base):
    __tablename__ = "campaign_prompts"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    positive_prompt = Column(Text, nullable=False)
    negative_prompt = Column(Text)
    model_name = Column(String(100), default="FLUX.1-schnell")
    seed = Column(Integer, default=101)
    created_at = Column(DateTime, default=datetime.utcnow)

    campaign = relationship("Campaign", back_populates="prompts")

class GeneratedImage(Base):
    __tablename__ = "generated_images"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    image_url = Column(String(500), nullable=False)
    variation_index = Column(Integer, default=1)
    seed = Column(Integer)
    is_selected = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    campaign = relationship("Campaign", back_populates="images")

class DesignVersion(Base):
    __tablename__ = "design_versions"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    version_number = Column(Integer, default=1)
    design_json = Column(Text, nullable=False)
    preview_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

    campaign = relationship("Campaign", back_populates="versions")

class Approval(Base):
    __tablename__ = "approvals"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    reviewer_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String(50), default="Pending") # Pending, Approved, Changes Requested, Rejected
    comments = Column(Text)
    reviewed_at = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    org_id = Column(Integer)
    user_name = Column(String(255))
    action = Column(String(100))
    resource_type = Column(String(100))
    details = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
