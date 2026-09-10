import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

function MapView() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/routes")
      .then((response) => response.json())
      .then((data) => {
        setRoutes(data);
      })
      .catch((error) => {
        console.error("Error loading routes:", error);
      });
  }, []);

  // Important NER locations
  const locations = {
    guwahati: [26.1445, 91.7362],
    shillong: [25.5788, 91.8933],
    nongpoh: [25.8630, 91.9060],
    tezpur: [26.6528, 92.7926],
    gangtok: [27.3389, 88.6065]
  };

  // Route paths
  const routePaths = {
    shillong: [
      locations.guwahati,
      [25.95, 91.80],
      [25.75, 91.86],
      locations.shillong
    ],

    nongpoh: [
      locations.guwahati,
      [26.05, 91.80],
      locations.nongpoh
    ],

    tezpur: [
      locations.guwahati,
      [26.35, 92.20],
      locations.tezpur
    ],

    gangtok: [
      locations.gangtok,
      [27.10, 88.70],
      [26.80, 88.90],
      [26.55, 89.20]
    ]
  };

  const getRouteColor = (routeName) => {
    if (routeName.includes("Shillong")) {
      return "#f59e0b";
    }

    if (routeName.includes("Sikkim")) {
      return "#ef4444";
    }

    return "#22c55e";
  };

  return (
    <div className="map-card">

      {/* MAP HEADER */}
      <div className="map-header">
        <div>
          <h2>📍 NER Road Network</h2>
          <p>
            Real-time route monitoring & AI risk analysis
          </p>
        </div>

        <span className="live-badge">
          <span className="live-dot"></span>
          LIVE
        </span>
      </div>

      {/* REAL MAP */}
      <div className="real-map-container">

        <MapContainer
          center={[26.2, 91.7]}
          zoom={6}
          scrollWheelZoom={true}
          zoomControl={false}
          className="real-map"
        >

          {/* OpenStreetMap */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomleft" />

          {/* GUWAHATI */}
          <Marker position={locations.guwahati}>
            <Popup>
              <div className="map-popup">
                <h3>📍 Guwahati</h3>
                <p>Main logistics hub</p>
                <strong>NER Gateway</strong>
              </div>
            </Popup>
          </Marker>

          {/* SHILLONG */}
          <Marker position={locations.shillong}>
            <Popup>
              <div className="map-popup">
                <h3>⚠️ Shillong</h3>
                <p>Guwahati → Shillong</p>
                <strong>High Risk</strong>
              </div>
            </Popup>
          </Marker>

          {/* NONGPOH */}
          <Marker position={locations.nongpoh}>
            <Popup>
              <div className="map-popup">
                <h3>🟢 Nongpoh</h3>
                <p>Guwahati → Nongpoh</p>
                <strong>Safe Route</strong>
              </div>
            </Popup>
          </Marker>

          {/* TEZPUR */}
          <Marker position={locations.tezpur}>
            <Popup>
              <div className="map-popup">
                <h3>🟢 Tezpur</h3>
                <p>Guwahati → Tezpur</p>
                <strong>Safe Route</strong>
              </div>
            </Popup>
          </Marker>

          {/* GANGTOK */}
          <Marker position={locations.gangtok}>
            <Popup>
              <div className="map-popup">
                <h3>🔴 Gangtok</h3>
                <p>NH-10 Sikkim Corridor</p>
                <strong>BLOCKED</strong>
              </div>
            </Popup>
          </Marker>

          {/* SHILLONG ROUTE */}
          <Polyline
            positions={routePaths.shillong}
            pathOptions={{
              color: "#f59e0b",
              weight: 6,
              opacity: 0.9
            }}
          />

          {/* NONGPOH ROUTE */}
          <Polyline
            positions={routePaths.nongpoh}
            pathOptions={{
              color: "#22c55e",
              weight: 6,
              opacity: 0.9
            }}
          />

          {/* TEZPUR ROUTE */}
          <Polyline
            positions={routePaths.tezpur}
            pathOptions={{
              color: "#22c55e",
              weight: 6,
              opacity: 0.9
            }}
          />

          {/* SIKKIM ROUTE */}
          <Polyline
            positions={routePaths.gangtok}
            pathOptions={{
              color: "#ef4444",
              weight: 7,
              opacity: 0.9,
              dashArray: "12 8"
            }}
          />

        </MapContainer>

        {/* MAP TITLE */}
        <div className="map-overlay-title">
          <span>🇮🇳</span>
          <div>
            <strong>North Eastern Region</strong>
            <small>Live Logistics Map</small>
          </div>
        </div>

        {/* LEGEND */}
        <div className="map-legend-new">

          <div className="legend-title">
            Route Status
          </div>

          <div className="legend-row">
            <span className="legend-line safe-line"></span>
            Safe
          </div>

          <div className="legend-row">
            <span className="legend-line warning-line"></span>
            High Risk
          </div>

          <div className="legend-row">
            <span className="legend-line danger-line"></span>
            Blocked
          </div>

        </div>

        {/* LIVE STATUS */}
        <div className="map-live-status">
          <span className="status-pulse"></span>
          AI Monitoring Active
        </div>

      </div>

      {/* ROUTE INFORMATION */}
      <div className="map-route-info">

        {routes.map((route) => (

          <div className="route-item" key={route.id}>

            <div>
              <strong>{route.name}</strong>

              <small>
                {route.start} → {route.end}
              </small>
            </div>

            <div className="route-right">

              <span
                className={
                  route.status === "blocked"
                    ? "status blocked"
                    : route.status === "high-risk"
                    ? "status risk"
                    : "status open"
                }
              >
                {route.status}
              </span>

              <strong className="route-risk">
                {route.risk}%
              </strong>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MapView;
