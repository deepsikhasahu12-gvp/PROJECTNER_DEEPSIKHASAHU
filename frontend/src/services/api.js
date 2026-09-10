const API = "http://127.0.0.1:8000";

export async function getRoutes() {
  const response = await fetch(`${API}/api/routes`);
  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API}/api/stats`);
  return response.json();
}

export async function predictRisk(data) {
  const response = await fetch(`${API}/api/predict-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export async function simulateRain() {
  const response = await fetch(`${API}/api/simulate-rain`, {
    method: "POST"
  });

  return response.json();
}

export async function getSaferRoute() {
  const response = await fetch(`${API}/api/safer-route`);

  return response.json();
}

export async function submitFieldReport(data) {
  const response = await fetch(`${API}/api/field-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export async function getDeliveries() {
  const response = await fetch(`${API}/api/deliveries`);

  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API}/api/alerts`);

  return response.json();
}

export async function createDisruption(data) {
  const response = await fetch(`${API}/api/disruption`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
