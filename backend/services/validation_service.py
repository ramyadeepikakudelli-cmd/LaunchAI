from ai.quality_checker import audit_campaign_quality

def validate_campaign(brand_name: str, price: str, data_benefits: str, validity: str, disclaimer: str, dimensions: list):
    return audit_campaign_quality(brand_name, price, data_benefits, validity, disclaimer, dimensions)
