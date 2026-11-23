def audit_campaign_quality(brand_name: str, price: str, data_benefits: str, validity: str, disclaimer: str, dimensions: list) -> dict:
    """Brand Guardian deterministic legal and visual audit."""
    checks = []
    passed = 0
    
    # 1. Price check
    if price and ("₹" in price or "$" in price):
        checks.append({"name": "Price Currency Transparency", "status": "PASSED", "detail": f"Tariff verified: {price}"})
        passed += 1
    else:
        checks.append({"name": "Price Currency Transparency", "status": "WARNING", "detail": "Missing standard currency symbol (₹ or $)"})
        
    # 2. Data Quota
    if data_benefits and any(u in data_benefits.upper() for u in ["GB", "MB", "UNLIMITED"]):
        checks.append({"name": "Data Quota Transparency", "status": "PASSED", "detail": f"Quota verified: {data_benefits}"})
        passed += 1
    else:
        checks.append({"name": "Data Quota Transparency", "status": "FAILED", "detail": "Missing quota metrics"})
        
    # 3. Validity
    if validity and any(u in validity.lower() for u in ["day", "month", "year"]):
        checks.append({"name": "Billing Cycle Transparency", "status": "PASSED", "detail": f"Validity: {validity}"})
        passed += 1
    else:
        checks.append({"name": "Billing Cycle", "status": "WARNING", "detail": "Validity should specify days or months"})
        
    # 4. FTC Disclaimer
    if disclaimer and len(disclaimer) >= 20 and "*" in disclaimer:
        checks.append({"name": "FTC / TRAI Asterisk Disclaimer", "status": "PASSED", "detail": "Conspicuous asterisk disclaimer present"})
        passed += 1
    else:
        checks.append({"name": "FTC Disclaimer", "status": "FAILED", "detail": "Mandatory disclaimer asterisk required"})
        
    # 5. Canvas dimensions
    w, h = dimensions[0], dimensions[1]
    if (w, h) in [(1024, 1024), (720, 1280), (1280, 720), (1080, 1080)] or w == h:
        checks.append({"name": "IAB / Meta Aspect Ratio Standards", "status": "PASSED", "detail": f"Valid standard resolution: {w}x{h}"})
        passed += 1
    else:
        checks.append({"name": "Aspect Ratio Standards", "status": "WARNING", "detail": "Non-standard dimensions may clip on mobile"})
        
    score = int((passed / len(checks)) * 100)
    return {
        "score": score,
        "status": "APPROVED FOR RELEASE" if score >= 80 else "NEEDS REVISION",
        "checks": checks
    }
