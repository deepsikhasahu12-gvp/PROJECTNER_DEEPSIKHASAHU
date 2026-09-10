import { useEffect, useState } from "react";

function RiskPanel() {
  const [routeId, setRouteId] = useState(1);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Scanning route...",
    "Analyzing rainfall data...",
    "Checking road condition...",
    "AI calculating risk..."
  ];

  const analyzeRisk = async () => {
    setLoading(true);
    setRiskData(null);
    setAnalysisStep(0);

    // Animation steps
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/ai-risk?route_id=${routeId}`
      );

      const data = await response.json();

      setRiskData(data);
    } catch (error) {
      console.error("Risk analysis error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="risk-panel">

      <div className="panel-header">
        <div>
          <h2>⚠️ AI Risk Monitoring</h2>
          <p>Predictive route disruption analysis</p>
        </div>

        <span className="ai-badge">
          ● AI ACTIVE
        </span>
      </div>

      <div className="risk-controls">

        <label>Select Route</label>

        <select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          disabled={loading}
        >
          <option value="1">
            Guwahati - Shillong
          </option>

          <option value="2">
            Guwahati - Nongpoh
          </option>

          <option value="3">
            NH-10 Sikkim Corridor
          </option>

          <option value="4">
            Guwahati - Tezpur
          </option>
        </select>

        <button
          className="analyze-btn"
          onClick={analyzeRisk}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔍 Analyze Route Risk"}
        </button>

      </div>

      {/* ANIMATION */}

      {loading && (
        <div className="risk-analysis-animation">

          <div className="radar-circle">
            <div className="radar-sweep"></div>

            <div className="radar-dot dot-one"></div>
            <div className="radar-dot dot-two"></div>
            <div className="radar-dot dot-three"></div>

          </div>

          <h3>AI Risk Analysis</h3>

          <p className="analysis-text">
            {steps[analysisStep]}
          </p>

          <div className="analysis-progress">

            {steps.map((step, index) => (
              <div
                key={step}
                className={`analysis-step ${
                  index <= analysisStep ? "completed" : ""
                }`}
              >
                <span>
                  {index < analysisStep
                    ? "✓"
                    : index === analysisStep
                    ? "●"
                    : "○"}
                </span>

                {step}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* RESULT */}

      {!loading && riskData && (
        <div className="risk-result">

          <div className="risk-score-box">

            <div
              className="risk-score"
              style={{
                "--risk": `${riskData.risk_score}%`
              }}
            >
              <span>
                {riskData.risk_score}
              </span>

              <small>
                / 100
              </small>
            </div>

            <div>
              <h3>
                {riskData.level} Risk
              </h3>

              <p>
                {riskData.route}
              </p>
            </div>

          </div>

          <div className="risk-details">

            <div className="risk-detail">
              <span>🌧️ Rainfall</span>
              <strong>{riskData.rainfall}%</strong>
            </div>

            <div className="risk-detail">
              <span>🛣️ Road Condition</span>
              <strong>{riskData.road_condition}%</strong>
            </div>

            <div className="risk-detail">
              <span>📊 Historical Risk</span>
              <strong>{riskData.historical_risk}%</strong>
            </div>

          </div>

          <div className="recommendation-box">

            <span>🤖 AI Recommendation</span>

            <strong>
              {riskData.recommendation}
            </strong>

          </div>

        </div>
      )}

    </div>
  );
}

export default RiskPanel;
