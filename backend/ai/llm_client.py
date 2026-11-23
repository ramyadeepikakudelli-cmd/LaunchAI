import os
import json

def generate_copilot_response(query: str, plan_name: str, price: str, brand_name: str) -> dict:
    """Uses Gemini 1.5 Flash if GEMINI_API_KEY is configured, else algorithmic fallback."""
    api_key = os.getenv("GEMINI_API_KEY", "")
    if api_key and api_key.strip():
        try:
            from google import genai
            client = genai.Client(api_key=api_key.strip())
            prompt = f"""
            You are an Executive Telecom Creative Director for {brand_name}.
            Plan: {plan_name} (Price: {price})
            Brief: {query}
            
            Return JSON:
            {{
                "concept_name": "catchy campaign title",
                "headline": "4-8 word punchy headline",
                "slogan": "memorable brand slogan",
                "target_audience": "target demographic",
                "supporting_copy": "1-sentence value proposition",
                "visual_concept": "cinematic advertising scene description",
                "suggested_style": "Futuristic 3D Tech"
            }}
            """
            resp = client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
            clean_json = resp.text.strip().replace("```json", "").replace("```", "")
            return json.loads(clean_json)
        except Exception:
            pass

    # Built-in Copilot Engine
    return {
        "concept_name": f"{brand_name} Next-Gen Speed Revolution",
        "headline": "Experience Truly Unlimited 5G Speeds",
        "slogan": "No Buffering. No Limits. Pure Speed.",
        "target_audience": "Gen-Z Streamers & Urban Professionals",
        "supporting_copy": f"Enjoy uninterrupted high-speed connectivity with {plan_name} starting at only {price}.",
        "visual_concept": "A modern smartphone floating in glowing 5G connectivity waves with volumetric blue lighting and clean typography space.",
        "suggested_style": "Futuristic 3D Tech"
    }
