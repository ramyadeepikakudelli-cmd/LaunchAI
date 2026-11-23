import os
import uuid
import random
import urllib.request
import urllib.parse
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas.schemas import CopilotRequest, GenerationRequest, QualityCheckRequest
from ai.llm_client import generate_copilot_response
from services.image_service import create_image_variations
from services.validation_service import validate_campaign
from models.models import Campaign

router = APIRouter(prefix="/api/generation", tags=["AI Generation"])

class FreeGenRequest(BaseModel):
    prompt: str
    seed: int | None = None
    width: int = 768
    height: int = 768

@router.post("/copilot")
def copilot_assist(req: CopilotRequest):
    return generate_copilot_response(req.query, req.plan_name, req.price, req.brand_name)

@router.post("/variations")
def generate_images(req: GenerationRequest, db: Session = Depends(get_db)):
    camp = db.query(Campaign).filter(Campaign.id == req.campaign_id).first()
    prompt = req.prompt or f"Award-winning telecommunications advertising visual for {camp.name if camp else '5G campaign'}, 8k resolution"
    variations = create_image_variations(db, req.campaign_id, prompt, req.num_variations)
    return {"campaign_id": req.campaign_id, "variations": variations}

@router.post("/validate")
def run_quality_check(req: QualityCheckRequest):
    return validate_campaign(req.brand_name, req.price, req.data_benefits, req.validity, req.disclaimer, req.dimensions)

@router.post("/free")
def generate_free_ai_image(req: FreeGenRequest):
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    seed = req.seed or random.randint(10000, 999999)
    encoded = urllib.parse.quote(prompt)
    poll_url = f"https://image.pollinations.ai/prompt/{encoded}?model=turbo&width={req.width}&height={req.height}&nologo=true&seed={seed}"

    try:
        req_obj = urllib.request.Request(
            poll_url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        )
        with urllib.request.urlopen(req_obj, timeout=30) as resp:
            data = resp.read()

        os.makedirs("./storage/generated", exist_ok=True)
        filename = f"ai_{uuid.uuid4().hex[:8]}.jpg"
        save_path = os.path.join("./storage/generated", filename)
        with open(save_path, "wb") as f:
            f.write(data)

        return {
            "success": True,
            "image_url": f"http://localhost:8000/storage/generated/{filename}",
            "seed": seed,
            "filename": filename,
            "is_ai": True
        }
    except Exception as e:
        # High-res direct cloud fallback
        direct_url = f"https://image.pollinations.ai/prompt/{encoded}?model=turbo&width={req.width}&height={req.height}&nologo=true&seed={seed}"
        return {
            "success": True,
            "image_url": direct_url,
            "seed": seed,
            "filename": f"seed_{seed}.jpg",
            "is_ai": True,
            "notice": "Served via AI Cloud Stream"
        }
