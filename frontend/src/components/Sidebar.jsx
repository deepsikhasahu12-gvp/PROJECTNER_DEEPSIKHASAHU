function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">🏔️</div>

        <div>
          <h2>PROJECT-NER</h2>
          <span>SMART LOGISTICS</span>
        </div>
      </div>

      <div className="ner-banner">
        <div className="mountains">▲ ▲ ▲</div>
        <p>North Eastern Region</p>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">MAIN MENU</p>

        <button
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${activePage === "routes" ? "active" : ""}`}
          onClick={() => setActivePage("routes")}
        >
          <span className="nav-icon">🗺️</span>
          <span>Route Intelligence</span>
        </button>

        <button
          className={`nav-item ${activePage === "deliveries" ? "active" : ""}`}
          onClick={() => setActivePage("deliveries")}
        >
          <span className="nav-icon">🚚</span>
          <span>Deliveries</span>
        </button>

        <button
          className={`nav-item ${activePage === "risk" ? "active" : ""}`}
          onClick={() => setActivePage("risk")}
        >
          <span className="nav-icon">⚠️</span>
          <span>Risk Monitoring</span>
        </button>


        <p className="nav-title second-title">
          FIELD OPERATIONS
        </p>

        <button
          className={`nav-item ${activePage === "alerts" ? "active" : ""}`}
          onClick={() => setActivePage("alerts")}
        >
          <span className="nav-icon">📡</span>
          <span>Live Alerts</span>
        </button>

        <button
          className={`nav-item ${activePage === "reports" ? "active" : ""}`}
          onClick={() => setActivePage("reports")}
        >
          <span className="nav-icon">📍</span>
          <span>Field Reports</span>
        </button>

        <button
          className={`nav-item ${activePage === "roads" ? "active" : ""}`}
          onClick={() => setActivePage("roads")}
        >
          <span className="nav-icon">🛣️</span>
          <span>Road Conditions</span>
        </button>

      </nav>


      <div className="sidebar-bottom">

        <div className="status-dot"></div>

        <div>
          <strong>System Online</strong>
          <small>AI monitoring active</small>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
