import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        {
          username,
          password,
        }
      );

      setMessage(response.data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("Registration failed!");
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      ></div>

      {/* Register Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "45px 35px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <h2 style={{ color: "white", fontSize: "28px", marginBottom: "8px" }}>
          🌅 Join OceanView Resort
        </h2>

        <p style={{ color: "#ddd", marginBottom: "30px", fontSize: "15px" }}>
          Create your new customer account
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              margin: "10px 0",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.85)",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              margin: "10px 0",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.85)",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "18px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #0072ff, #00c6ff)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #00c6ff, #0072ff)")
            }
          >
            Register
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: "yellow",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "25px", color: "#eee", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{
              color: "#90caf9",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => (window.location.href = "/login")}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
