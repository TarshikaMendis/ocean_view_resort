import React from "react";

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
        Beach Road, Galle, Sri Lanka |  +94 77 123 4567 |  oceanviewresort@gmail.com
      </p>

      <p style={{ margin: "10px 0" }}>
        Luxury Rooms • Beach View • Customer Friendly Service
      </p>

      <div style={{ marginTop: "15px" }}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            margin: "0 10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Facebook
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            margin: "0 10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Instagram
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "white",
            margin: "0 10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Twitter
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
