from sqlalchemy.orm import Session
from models.models import GeneratedImage
from ai.image_generator import generate_variations

def create_image_variations(db: Session, campaign_id: int, prompt: str, num_variations: int = 4):
    variations = generate_variations(prompt, num_variations=num_variations)
    saved_records = []
    for var in variations:
        img_rec = GeneratedImage(
            campaign_id=campaign_id,
            image_url=var["image_url"],
            variation_index=var["variation_index"],
            seed=var["seed"]
        )
        db.add(img_rec)
        saved_records.append(img_rec)
    db.commit()
    return variations
