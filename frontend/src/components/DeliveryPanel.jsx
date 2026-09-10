import { useEffect, useState } from "react";

function DeliveryPanel() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/deliveries")
      .then((res) => res.json())
      .then((data) => setDeliveries(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="delivery-panel">

      <div className="panel-header">
        <div>
          <h2>🚚 Active Deliveries</h2>
          <p>Essential goods currently in transit</p>
        </div>

        <span className="delivery-count">
          {deliveries.length} Active
        </span>
      </div>

      <div className="delivery-list">

        {deliveries.map((delivery) => (

          <div className="delivery-card" key={delivery.id}>

            <div className="delivery-top">

              <div className="vehicle-icon">
                🚚
              </div>

              <div className="delivery-main">
                <h3>{delivery.vehicle}</h3>
                <span className="delivery-id">
                  {delivery.id}
                </span>
              </div>

              <span
                className={`delivery-status ${
                  delivery.status === "Ready"
                    ? "ready"
                    : "transit"
                }`}
              >
                {delivery.status}
              </span>

            </div>

            <div className="delivery-details">

              <div className="delivery-detail">
                <span>📦 Cargo</span>
                <strong>{delivery.cargo}</strong>
              </div>

              <div className="delivery-detail">
                <span>🛣️ Route</span>
                <strong>{delivery.route}</strong>
              </div>

              <div className="delivery-detail">
                <span>⏱️ ETA</span>
                <strong>{delivery.eta}</strong>
              </div>

            </div>

            <div className="progress-section">

              <div className="progress-info">
                <span>Delivery Progress</span>
                <strong>{delivery.progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${delivery.progress}%`
                  }}
                ></div>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DeliveryPanel;
