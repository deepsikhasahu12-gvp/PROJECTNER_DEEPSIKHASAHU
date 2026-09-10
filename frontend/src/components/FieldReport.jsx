import { useState } from "react";

function FieldReport() {
  const [form, setForm] = useState({
    reporter: "",
    location: "",
    issue: "Road Damage",
    severity: "High",
    description: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitReport = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/field-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);

        setForm({
          reporter: "",
          location: "",
          issue: "Road Damage",
          severity: "High",
          description: ""
        });
      }
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  return (
    <div className="field-report-panel">

      {/* HEADER */}

      <div className="field-report-header">

        <div>
          <h2>📍 Field Reports</h2>
          <p>
            Report road conditions and disruptions from the field
          </p>
        </div>

        <div className="field-status">
          <span className="online-dot"></span>
          FIELD NETWORK ONLINE
        </div>

      </div>

      <div className="field-report-content">

        {/* FORM */}

        <form
          className="field-report-form"
          onSubmit={submitReport}
        >

          <div className="form-section-title">
            <span>📝</span>
            <div>
              <h3>Submit New Report</h3>
              <p>Provide information about the current road situation</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Reporter Name</label>

              <input
                type="text"
                name="reporter"
                value={form.reporter}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>📍 Location</label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. NH-10, Sikkim"
                required
              />
            </div>

            <div className="form-group">
              <label>Issue Type</label>

              <select
                name="issue"
                value={form.issue}
                onChange={handleChange}
              >
                <option>Road Damage</option>
                <option>Landslide</option>
                <option>Flood</option>
                <option>Road Blockage</option>
                <option>Accident</option>
                <option>Bridge Damage</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Severity</label>

              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

          </div>

          <div className="form-group description-group">

            <label>📝 Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the road condition, blockage, damage or other issue..."
              rows="4"
              required
            ></textarea>

          </div>

          {/* GPS / OFFLINE */}

          <div className="field-info-row">

            <div className="field-info-card">
              <span className="info-icon">📡</span>

              <div>
                <strong>Network Status</strong>
                <small>Connected</small>
              </div>
            </div>

            <div className="field-info-card">
              <span className="info-icon">🛰️</span>

              <div>
                <strong>Location Ready</strong>
                <small>Field reporting enabled</small>
              </div>
            </div>

            <div className="field-info-card">
              <span className="info-icon">🤖</span>

              <div>
                <strong>AI Priority</strong>
                <small>Automatic assessment</small>
              </div>
            </div>

          </div>

          {/* SUBMIT */}

          <button
            className="field-submit-btn"
            type="submit"
            disabled={submitting}
          >

            {submitting ? (
              <>
                <span className="submit-spinner"></span>
                Processing Report...
              </>
            ) : (
              <>
                📤 Submit Field Report
              </>
            )}

          </button>

          {success && (
            <div className="report-success">

              <div className="success-check">
                ✓
              </div>

              <div>
                <strong>Report Submitted Successfully</strong>
                <p>
                  Field report has been synced with the control system.
                </p>
              </div>

              <span className="synced-badge">
                SYNCED
              </span>

            </div>
          )}

        </form>

        {/* RIGHT INFORMATION CARD */}

        <div className="field-report-info">

          <div className="info-card-header">
            <span>🚨</span>

            <div>
              <h3>Why Field Reports?</h3>
              <p>Real-time ground intelligence</p>
            </div>
          </div>

          <div className="report-flow">

            <div className="flow-item">
              <div className="flow-icon">📍</div>

              <div>
                <strong>1. Field Detection</strong>
                <p>
                  Driver or field officer detects a road problem.
                </p>
              </div>
            </div>

            <div className="flow-line"></div>

            <div className="flow-item">
              <div className="flow-icon">📤</div>

              <div>
                <strong>2. Report Submitted</strong>
                <p>
                  Location and issue details are sent to the platform.
                </p>
              </div>
            </div>

            <div className="flow-line"></div>

            <div className="flow-item">
              <div className="flow-icon">🤖</div>

              <div>
                <strong>3. AI Assessment</strong>
                <p>
                  The system evaluates the disruption severity.
                </p>
              </div>
            </div>

            <div className="flow-line"></div>

            <div className="flow-item">
              <div className="flow-icon">🚚</div>

              <div>
                <strong>4. Logistics Response</strong>
                <p>
                  Authorities can respond and adjust routes.
                </p>
              </div>
            </div>

          </div>

          <div className="offline-box">
            <span>📡</span>

            <div>
              <strong>Offline Reporting Ready</strong>
              <p>
                Reports can be queued when network connectivity is unavailable.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FieldReport;
