import React from "react";

function Help() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d4f1c5, #fef9e7)", // soft green → sand
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#3b6b35", fontSize: "36px" }}>
            Ocean View Resort - Help Center
          </h1>
          <p style={{ color: "#555", fontSize: "18px", marginTop: "10px" }}>
            Welcome to the Ocean View Resort Reservation System Help Page.
          </p>
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "#fff7e6", // sand card
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            padding: "40px 30px",
          }}
        >
          {/* How to Use */}
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#3b6b35", marginBottom: "20px" }}>
               How to Use This System
            </h2>
            <ul style={{ fontSize: "16px", lineHeight: "28px" }}>
              <li><b>Register:</b> Create an account using your username and password.</li>
              <li><b>Login:</b> Login to the system to access booking features.</li>
              <li><b>Book Room:</b> Fill the reservation form and confirm your booking.</li>
              <li><b>Search Reservation:</b> Enter your reservation number to view booking details.</li>
              <li><b>Bill Report:</b> View your total bill amount and reservation details.</li>
            </ul>
          </section>

          <hr style={{ margin: "25px 0", borderColor: "#d0d0d0" }} />

          {/* Admin Features */}
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#3b6b35", marginBottom: "20px" }}>
               Admin Features
            </h2>
            <ul style={{ fontSize: "16px", lineHeight: "28px" }}>
              <li>Admin can access <b>Admin Dashboard</b>.</li>
              <li>Admin can view all customer reservations.</li>
              <li>Admin can delete reservation records.</li>
            </ul>
          </section>

          <hr style={{ margin: "25px 0", borderColor: "#d0d0d0" }} />

          {/* Contact Support */}
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#3b6b35", marginBottom: "20px" }}>
               Contact Support
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "28px" }}>
              If you face any issues while using the system, please contact our support team:
            </p>
            <ul style={{ fontSize: "16px", lineHeight: "28px", listStyle: "none", paddingLeft: "0" }}>
              <li> Email: <b>support@oceanviewresort.com</b></li>
              <li> Phone: <b>+94 77 123 4567</b></li>
              <li> Location: <b>Galle, Sri Lanka</b></li>
            </ul>
          </section>

          <hr style={{ margin: "25px 0", borderColor: "#d0d0d0" }} />

          {/* Common Problems */}
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ color: "#3b6b35", marginBottom: "20px" }}>
               Common Problems
            </h2>
            <ul style={{ fontSize: "16px", lineHeight: "28px" }}>
              <li><b>Cannot login:</b> Make sure your username and password are correct.</li>
              <li><b>Admin Dashboard not visible:</b> Only admin can access it (By giving correct username and password).</li>
              <li><b>Reservation not found:</b> Check your reservation number (example: RES001).</li>
            </ul>
          </section>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3 style={{ color: "#7cb342", fontSize: "22px" }}>
              Thank you for using Ocean View Resort!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
