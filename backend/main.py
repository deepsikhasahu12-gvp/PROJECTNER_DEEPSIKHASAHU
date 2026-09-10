from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import json
import random
from datetime import datetime

app = FastAPI(
    title="PROJECT-NER API",
    description="AI-Based Smart Logistics and Accessibility Intelligence Platform",
    version="2.0"
)

# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------------------------------------------------------
# LOAD ROUTE DATA
# ---------------------------------------------------------

DATA_FILE = Path(__file__).parent / "data" / "routes.json"

with open(DATA_FILE, "r", encoding="utf-8") as file:
    routes = json.load(file)

reports = []

# ---------------------------------------------------------
# DELIVERY DATA
# ---------------------------------------------------------

deliveries = [
    {
        "id": "DLV-001",
        "vehicle": "Medical Van",
        "cargo": "Medicines",
        "route": "Guwahati → Shillong",
        "status": "In Transit",
        "progress": 64,
        "eta": "2h 05m"
    },
    {
        "id": "DLV-002",
        "vehicle": "Truck",
        "cargo": "Food Supplies",
        "route": "Guwahati → Tezpur",
        "status": "In Transit",
        "progress": 42,
        "eta": "1h 45m"
    },
    {
        "id": "DLV-003",
        "vehicle": "Relief Vehicle",
        "cargo": "Emergency Supplies",
        "route": "Guwahati → Nongpoh",
        "status": "Ready",
        "progress": 0,
        "eta": "2h 10m"
    }
]

# ---------------------------------------------------------
# REQUEST MODELS
# ---------------------------------------------------------

class FieldReportRequest(BaseModel):
    reporter: str
    location: str
    issue: str
    severity: str
    description: str


class DisruptionRequest(BaseModel):
    route_id: int
    disruption: str


# ---------------------------------------------------------
# AI RISK CALCULATION
# ---------------------------------------------------------

def calculate_ai_risk(route):
    """
    AI-style weighted risk calculation.

    Rainfall       = 45%
    Road Condition = 30%
    Historical Risk = 25%
    """

    rainfall = route.get("rainfall", 0)
    road_condition = route.get("road_condition", 0)
    historical_risk = route.get("historical_risk", 0)

    risk_score = (
        rainfall * 0.45
        + road_condition * 0.30
        + historical_risk * 0.25
    )

    risk_score = round(risk_score)

    if risk_score >= 80:
        level = "Critical"
        recommendation = "Avoid route immediately"
        message = "Very high disruption risk detected."

    elif risk_score >= 60:
        level = "High"
        recommendation = "Use alternate route"
        message = "High disruption risk detected."

    elif risk_score >= 35:
        level = "Moderate"
        recommendation = "Monitor route"
        message = "Moderate disruption risk detected."

    else:
        level = "Low"
        recommendation = "Route is currently safe"
        message = "Low disruption risk."

    return {
        "risk": risk_score,
        "risk_score": risk_score,
        "level": level,
        "recommendation": recommendation,
        "message": message,
        "rainfall": rainfall,
        "road_condition": road_condition,
        "historical_risk": historical_risk,
        "road_status": route.get("road_status", "Unknown")
    }


# ---------------------------------------------------------
# HOME
# ---------------------------------------------------------

@app.get("/")
def home():
    return {
        "project": "PROJECT-NER",
        "message": "Smart Logistics and Accessibility Intelligence Platform",
        "status": "online"
    }


# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------

@app.get("/api/routes")
def get_routes():
    return routes


# ---------------------------------------------------------
# STATISTICS
# ---------------------------------------------------------

@app.get("/api/stats")
def get_stats():

    total_routes = len(routes)

    open_routes = len([
        r for r in routes
        if r["status"] == "open"
    ])

    high_risk_routes = len([
        r for r in routes
        if r["status"] == "high-risk"
    ])

    blocked_routes = len([
        r for r in routes
        if r["status"] == "blocked"
    ])

    critical_routes = len([
        r for r in routes
        if r["status"] == "critical"
    ])

    return {
        "total_routes": total_routes,
        "open_routes": open_routes,
        "high_risk_routes": high_risk_routes,
        "blocked_routes": blocked_routes,
        "critical_routes": critical_routes,
        "active_deliveries": len(deliveries)
    }


# ---------------------------------------------------------
# AUTOMATIC AI RISK PREDICTION
# ---------------------------------------------------------

@app.get("/api/ai-risk")
def ai_risk(route_id: int = 1):

    selected_route = None

    for route in routes:
        if route["id"] == route_id:
            selected_route = route
            break

    if selected_route is None:
        return {
            "success": False,
            "message": "Route not found"
        }

    result = calculate_ai_risk(selected_route)

    return {
        "success": True,
        "route": selected_route["name"],
        "route_id": selected_route["id"],
        **result
    }


# ---------------------------------------------------------
# AUTOMATIC RISK FOR ALL ROUTES
# ---------------------------------------------------------

@app.get("/api/all-ai-risks")
def all_ai_risks():

    results = []

    for route in routes:

        result = calculate_ai_risk(route)

        results.append({
            "route_id": route["id"],
            "route": route["name"],
            **result
        })

    return results


# ---------------------------------------------------------
# RAIN SIMULATION
# ---------------------------------------------------------

@app.post("/api/simulate-rain")
def simulate_rain():

    rainfall = random.randint(60, 100)

    results = []

    for route in routes:

        simulated_route = route.copy()

        simulated_route["rainfall"] = rainfall

        result = calculate_ai_risk(simulated_route)

        results.append({
            "route_id": route["id"],
            "route": route["name"],
            **result
        })

    highest = max(
        results,
        key=lambda item: item["risk_score"]
    )

    return {
        "success": True,
        "rainfall": rainfall,
        "highest_risk": highest["risk_score"],
        "risk": highest["risk_score"],
        "risk_score": highest["risk_score"],
        "level": highest["level"],
        "route": highest["route"],
        "affected_routes": [
            item["route"]
            for item in results
            if item["risk_score"] >= 60
        ],
        "message": (
            f"Rainfall simulation completed. "
            f"{highest['route']} has the highest disruption risk."
        )
    }


# ---------------------------------------------------------
# SAFER ROUTE
# ---------------------------------------------------------

@app.get("/api/safer-route")
def safer_route():

    safe_routes = []

    for route in routes:

        result = calculate_ai_risk(route)

        if result["risk_score"] < 60:

            safe_routes.append({
                **route,
                "ai_risk": result["risk_score"]
            })

    if not safe_routes:

        return {
            "success": False,
            "message": "No safer route available"
        }

    best = min(
        safe_routes,
        key=lambda route: route["ai_risk"]
    )

    return {
        "success": True,
        "route": best,
        "message": "Safer route found using AI risk analysis"
    }


# ---------------------------------------------------------
# DISRUPTION REPORT
# ---------------------------------------------------------

@app.post("/api/disruption")
def create_disruption(data: DisruptionRequest):

    for route in routes:

        if route["id"] == data.route_id:

            route["status"] = "blocked"
            route["risk"] = 98
            route["road_condition"] = 98
            route["eta"] = "Unavailable"
            route["road_status"] = "Blocked"

            return {
                "success": True,
                "message": f"{data.disruption} detected",
                "route": route
            }

    return {
        "success": False,
        "message": "Route not found"
    }


# ---------------------------------------------------------
# FIELD REPORT
# ---------------------------------------------------------

@app.post("/api/field-report")
def submit_report(data: FieldReportRequest):

    report = {
    "id": f"RPT-{len(reports) + 1:03d}",
    "reporter": data.reporter,
    "location": data.location,
    "issue": data.issue,
    "severity": data.severity,
    "description": data.description,
    "timestamp": datetime.now().isoformat(),
    "sync_status": "Synced"
}

    reports.append(report)

    return {
        "success": True,
        "message": "Field report submitted successfully",
        "report": report
    }


# ---------------------------------------------------------
# GET FIELD REPORTS
# ---------------------------------------------------------

@app.get("/api/reports")
def get_reports():
    return reports


# ---------------------------------------------------------
# DELIVERIES
# ---------------------------------------------------------

@app.get("/api/deliveries")
def get_deliveries():
    return deliveries


# ---------------------------------------------------------
# ALERTS
# ---------------------------------------------------------

@app.get("/api/alerts")
def get_alerts():

    alerts = []

    for route in routes:

        result = calculate_ai_risk(route)

        risk = result["risk_score"]

        if risk >= 85:

            alerts.append({
                "type": "critical",
                "title": "Critical Road Risk",
                "route": route["name"],
                "risk": risk,
                "message": "Immediate route assessment required."
            })

        elif risk >= 60:

            alerts.append({
                "type": "warning",
                "title": "High Road Risk",
                "route": route["name"],
                "risk": risk,
                "message": "Consider using an alternate route."
            })

    return alerts
