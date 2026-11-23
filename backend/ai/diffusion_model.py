import io
import urllib.parse
import requests
from PIL import Image

def call_diffusion_api(prompt: str, width: int = 1024, height: int = 1024, seed: int = 42) -> Image.Image:
    """Pretrained FLUX.1 diffusion generation via serverless API."""
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&model=flux&nologo=true&seed={seed}"
    resp = requests.get(url, timeout=90)
    resp.raise_for_status()
    return Image.open(io.BytesIO(resp.content)).convert("RGBA")
