import { useEffect, useState } from "react";
import {
  getRoutes,
  getSaferRoute
} from "../services/api";

function RoutePanel() {
  const [routes, setRoutes] = useState([]);
  const [saferRoute, setSaferRoute] = useState(null);

  async function loadRoutes() {
    try {
      const data = await getRoutes();
      setRoutes(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadRoutes();
  }, []);

  async function findSaferRoute() {
    try {
      const data = await getSaferRoute();
      setSaferRoute(data);
    } catch (error) {
      console.error(error);
      alert("Could not find safer route.");
    }
  }

  return (
    <div className="panel route-panel">

      <div className="panel-header">

        <div>
          <h2>Route Intelligence</h2>
          <p>Current road accessibility status</p>
        </div>

        <button
          className="primary-btn"
          onClick={findSaferRoute}
        >
          Find Safer Route
        </button>

      </div>

      {saferRoute && (
        <div className="safer-route">
          <strong>Recommended Route:</strong>

          <span>
            {saferRoute.name}
          </span>

          <small>
            Risk: {saferRoute.risk}% • ETA: {saferRoute.eta}
          </small>
        </div>
      )}

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Route</th>
              <th>Status</th>
              <th>Risk</th>
              <th>ETA</th>
              <th>Distance</th>
            </tr>
          </thead>

          <tbody>

            {routes.map(route => (
              <tr key={route.id}>

                <td>
                  <strong>{route.name}</strong>
                  <small>
                    {route.start} → {route.end}
                  </small>
                </td>

                <td>
                  <span className={`status ${route.status}`}>
                    {route.status}
                  </span>
                </td>

                <td>{route.risk}%</td>

                <td>{route.eta}</td>

                <td>{route.distance}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RoutePanel;
