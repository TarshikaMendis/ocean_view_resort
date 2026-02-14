import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div
      style={{
        marginTop: "50px",
        backgroundColor: "#003366",
        color: "white",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}> Ocean View Resort</h2>

      <p style={{ margin: "5px 0" }}>
        Beach Road, Galle, Sri Lanka | +94 77 123 4567 | oceanviewresort@gmail.com
      </p>

      <p style={{ margin: "10px 0" }}>
        Luxury Rooms • Beach View • Customer Friendly Service
      </p>

      {/* Social Media Icons */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          <FaFacebookF />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          <FaInstagram />
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          <FaTwitter />
        </a>
      </div>

      <hr style={{ margin: "20px auto", width: "80%", borderColor: "white" }} />

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        © {new Date().getFullYear()} Ocean View Resort Reservation System. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
