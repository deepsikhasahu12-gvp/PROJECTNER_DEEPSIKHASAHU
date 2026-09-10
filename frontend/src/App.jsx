import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import MapView from "./components/MapView";
import RiskPanel from "./components/RiskPanel";
import RoutePanel from "./components/RoutePanel";
import DeliveryPanel from "./components/DeliveryPanel";
import FieldReport from "./components/FieldReport";


function App() {

  const [activePage, setActivePage] = useState("dashboard");


  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />


      <main className="main-content">

        <Header />


        <div className="dashboard-content">


          {/* ================= DASHBOARD ================= */}

          {activePage === "dashboard" && (

            <>
              <Stats />

              <div className="dashboard-row">

                <div className="map-section">
                  <MapView />
                </div>

                <div className="risk-section">
                  <RiskPanel />
                </div>

              </div>


              <div className="dashboard-row">

                <div className="panel-section">
                  <RoutePanel />
                </div>

                <div className="panel-section">
                  <DeliveryPanel />
                </div>

              </div>


              <div className="full-width-section">
                <FieldReport />
              </div>

            </>

          )}



          {/* ================= ROUTE INTELLIGENCE ================= */}

          {activePage === "routes" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>🗺️ Route Intelligence</h1>

                  <p>
                    AI-powered route analysis for the North Eastern Region
                  </p>
                </div>

              </div>


              <div className="full-map-page">
                <MapView />
              </div>


              <div className="route-page-panel">
                <RoutePanel />
              </div>

            </div>

          )}



          {/* ================= DELIVERIES ================= */}

          {activePage === "deliveries" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>🚚 Active Deliveries</h1>

                  <p>
                    Monitor essential goods and logistics vehicles
                  </p>
                </div>

              </div>


              <div className="delivery-page">

                <DeliveryPanel />

              </div>

            </div>

          )}



          {/* ================= RISK MONITORING ================= */}

          {activePage === "risk" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>⚠️ Risk Monitoring</h1>

                  <p>
                    AI-based road disruption and accessibility analysis
                  </p>
                </div>

              </div>


              <div className="risk-page">

                <RiskPanel />

              </div>

            </div>

          )}



          {/* ================= LIVE ALERTS ================= */}

          {activePage === "alerts" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>📡 Live Alerts</h1>

                  <p>
                    Real-time route disruption alerts
                  </p>
                </div>

              </div>


              <div className="alert-page">

                <div className="empty-alert">

                  <div className="big-icon">📡</div>

                  <h2>AI Monitoring Active</h2>

                  <p>
                    The system is continuously monitoring
                    road conditions and disruption risks.
                  </p>

                </div>

              </div>

            </div>

          )}



          {/* ================= FIELD REPORTS ================= */}

          {activePage === "reports" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>📍 Field Reports</h1>

                  <p>
                    Submit and monitor reports from field teams
                  </p>
                </div>

              </div>


              <div className="report-page">

                <FieldReport />

              </div>

            </div>

          )}



          {/* ================= ROAD CONDITIONS ================= */}

          {activePage === "roads" && (

            <div className="page-container">

              <div className="page-title">

                <div>
                  <h1>🛣️ Road Conditions</h1>

                  <p>
                    Current accessibility status across NER
                  </p>
                </div>

              </div>


              <div className="road-condition-page">

                <MapView />

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default App;
