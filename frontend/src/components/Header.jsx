function Header() {
  return (
    <header className="header">

      <div>
        <h1>Logistics Intelligence Dashboard</h1>
        <p>North Eastern Region • Real-time monitoring</p>
      </div>

      <div className="header-right">

        <div className="live-status">
          <span className="live-dot"></span>
          LIVE
        </div>

        <button className="icon-button">
          🔔
        </button>

        <div className="profile">
          <div className="profile-icon">
            A
          </div>

          <div>
            <strong>Admin</strong>
            <small>Operations</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;
