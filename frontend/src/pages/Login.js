import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin Login
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "admin");
      localStorage.setItem("role", "ADMIN");
      alert("Admin Login Successful!");
      window.location.href = "/admin-dashboard";
      return;
    }

    // Customer Login
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        username,
        password,
      });

      if (response.data.message === "Login Successful!") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", "CUSTOMER");

        alert("Customer Login Successful!");
        window.location.href = "/";
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Login Failed! Check username/password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
        }}
      ></div>

      {/* Login Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          padding: "40px 35px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "5px", fontSize: "28px" }}>
          🌊 Ocean View Resort
        </h1>

        <p style={{ marginBottom: "30px", fontSize: "15px", color: "#f1f1f1" }}>
          Login to continue your booking journey
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(255,0,0,0.2)",
              padding: "10px",
              borderRadius: "10px",
              fontWeight: "bold",
              color: "#ffdddd",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "25px", fontSize: "14px", color: "#f1f1f1" }}>
          Don’t have an account?{" "}
          <span
            style={{
              color: "#ffcc80",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => (window.location.href = "/register")}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
}

/* Styles */
const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  backgroundColor: "rgba(255,255,255,0.85)",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(to right, #ff9800, #ff5722)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};

export default Login;
