from ai.prompt_engine import build_telecom_prompt

def generate_campaign_prompt(plan_name: str, audience: str, usp: str, style: str, brand_color: str):
    return build_telecom_prompt(plan_name, audience, usp, style, brand_color)
