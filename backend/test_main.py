from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online"}


def test_hi_post():
    """Test the hi endpoint with POST."""
    response = client.post("/", json={"name": "world"})
    assert response.status_code == 200
    assert response.text == '"hi world"'
