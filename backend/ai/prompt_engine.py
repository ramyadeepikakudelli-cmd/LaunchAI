def build_telecom_prompt(plan_name: str, audience: str, usp: str, style: str, brand_color: str) -> dict:
    """Creates a production diffusion prompt leaving safe zones for text overlay."""
    pos = (
        f"Award-winning telecommunications commercial advertising hero visual, {style.lower()}, "
        f"featuring {audience.lower()} enjoying ultra-fast connectivity, {usp}, "
        f"volumetric ambient light with vibrant {brand_color} reflections, clean negative space at top and bottom, "
        f"8k resolution, shot on 35mm lens, sharp focus, advertising masterpiece"
    )
    neg = "blurry, low quality, deformed, distorted, cartoonish, lowres, text, letters, watermark, signature"
    return {
        "positive": pos,
        "negative": neg,
        "model": "FLUX.1-schnell / SDXL"
    }
