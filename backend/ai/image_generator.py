import os
from .diffusion_model import call_diffusion_api

def generate_variations(prompt: str, width: int = 1024, height: int = 1024, base_seed: int = 101, num_variations: int = 4) -> list:
    """Generates 4 distinct variations with varying seeds."""
    os.makedirs("./storage/generated", exist_ok=True)
    results = []
    seeds = [base_seed, base_seed + 111, base_seed + 222, base_seed + 333][:num_variations]
    
    for idx, s in enumerate(seeds):
        try:
            img = call_diffusion_api(prompt, width, height, seed=s)
            filename = f"gen_seed_{s}.jpg"
            filepath = os.path.join("./storage/generated", filename)
            img.convert("RGB").save(filepath, format="JPEG", quality=95)
            results.append({
                "variation_index": idx + 1,
                "seed": s,
                "image_url": f"/storage/generated/{filename}"
            })
        except Exception:
            continue
            
    return results
