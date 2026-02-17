import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful!");
    window.location.href = "/";
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #003366, #0077b6)",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Resort Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={logo}
          alt="Ocean View Logo"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "2px solid white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
          }}
        />

        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>
          Ocean View Resort
        </h2>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Public Links */}
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/gallery" style={linkStyle}>
          Gallery
        </Link>

        <Link to="/help" style={linkStyle}>
          Help
        </Link>

        

        <Link to="/about-contact" style={linkStyle}>
          About
        </Link>

        {/* If Not Logged In */}
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              style={{
                ...linkStyle,
                backgroundColor: "#ffcc00",
                color: "#003366",
              }}
            >
              Register
            </Link>

            <Link
              to="/login"
              style={{
                ...linkStyle,
                backgroundColor: "#00b4d8",
              }}
            >
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
              style={{
                ...linkStyle,
                backgroundColor: "#38b000",
              }}
            >
              Book Room
            </Link>

            <Link to="/search-reservation" style={linkStyle}>
              Search
            </Link>

            {/* Admin Only Links */}
            {role === "ADMIN" && (
              <>
                <Link
                  to="/admin-dashboard"
                  style={{
                    ...linkStyle,
                    backgroundColor: "#7209b7",
                  }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/view-reservations"
                  style={{
                    ...linkStyle,
                    backgroundColor: "#d00000",
                  }}
                >
                  Reservations
                </Link>
              </>
            )}

            {/* Logged User Info */}
            <span
              style={{
                color: "#90ee90",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {username} ({role})
            </span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 14px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                fontWeight: "bold",
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
