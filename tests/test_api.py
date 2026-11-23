from fastapi.testclient import TestClient
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend")))
from main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "LAUNCH AI Backend API"

def test_analytics_dashboard():
    response = client.get("/api/analytics/dashboard?org_id=1")
    assert response.status_code == 200
    data = response.json()
    assert "total_campaigns" in data
    assert "avg_generation_seconds" in data

def test_brand_guardian_validation():
    payload = {
        "brand_name": "Jio True 5G",
        "price": "₹349",
        "data_benefits": "2.5 GB/Day",
        "validity": "28 Days",
        "disclaimer": "*Terms apply. 5G speeds vary by area.",
        "dimensions": [1024, 1024]
    }
    response = client.post("/api/generation/validate", json=payload)
    assert response.status_code == 200
    result = response.json()
    assert result["score"] >= 80
    assert result["status"] == "APPROVED FOR RELEASE"

if __name__ == "__main__":
    test_root_endpoint()
    test_analytics_dashboard()
    test_brand_guardian_validation()
    print("✅ All unit & integration tests passed successfully!")
