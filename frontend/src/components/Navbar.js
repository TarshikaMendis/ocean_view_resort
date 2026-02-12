import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful!");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        backgroundColor: "#003366",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}> Ocean View Resort</h2>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* Public Links */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/gallery" style={{ color: "white", textDecoration: "none" }}>
          Gallery
        </Link>


        <Link to="/help" style={{ color: "white", textDecoration: "none" }}>
          Help
        </Link>

        <Link
          to="/search-reservation"
          style={{ color: "white", textDecoration: "none" }}
        >
          Search Reservation
        </Link>

        <Link
          to="/about-contact"
          style={{ color: "white", textDecoration: "none" }}
        >
          About & Contact
        </Link>

        {/* If Not Logged In */}
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>

            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
          </>
        )}

        {/* If Logged In */}
        {isLoggedIn && (
          <>
            {/* Customer Link */}
            <Link
              to="/add-reservation"
              style={{ color: "white", textDecoration: "none" }}
            >
              Book Room
            </Link>

            <Link to="/bill-report" style={{ color: "white", textDecoration: "none" }}>
              Bill Report
            </Link>


            {/* Admin Only Links */}
            {role === "ADMIN" && (
              <>
                <Link
                  to="/admin-dashboard"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/view-reservations"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  View Reservations
                </Link>
              </>
            )}

            {/* Logged User Info */}
            <span style={{ color: "lightgreen", fontWeight: "bold" }}>
              {username} ({role})
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
