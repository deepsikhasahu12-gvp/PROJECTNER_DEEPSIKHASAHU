import { useEffect, useState } from "react";

function Stats() {
  const [stats, setStats] = useState({
    total_routes: 4,
    open_routes: 2,
    high_risk_routes: 1,
    blocked_routes: 1
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stats")
      .then((response) => response.json())
      .then((data) => {
        console.log("BACKEND DATA:", data);

        setStats({
          total_routes: data.total_routes || 4,
          open_routes: data.open_routes || 2,
          high_risk_routes: data.high_risk_routes || 1,
          blocked_routes: data.blocked_routes || 1
        });
      })
      .catch((error) => {
        console.error("ERROR:", error);
      });
  }, []);

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <div className="stat-icon">🛣️</div>
        <div>
          <span>Total Routes</span>
          <h2>{stats.total_routes}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🟢</div>
        <div>
          <span>Open Routes</span>
          <h2>{stats.open_routes}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⚠️</div>
        <div>
          <span>High Risk</span>
          <h2>{stats.high_risk_routes}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔴</div>
        <div>
          <span>Blocked Routes</span>
          <h2>{stats.blocked_routes}</h2>
        </div>
      </div>

    </div>
  );
}

export default Stats;
