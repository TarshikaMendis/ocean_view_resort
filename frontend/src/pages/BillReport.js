import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BillReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const reservation = location.state?.reservation;

  const handlePrint = () => {
    window.print();
  };

  // If user comes directly without searching
  if (!reservation) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial" }}>
        <h2 style={{ color: "red" }}>No Reservation Data Found!</h2>
        <p>Please search reservation first.</p>

        <button
          onClick={() => navigate("/search-reservation")}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back to Search
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f2f7ff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "12px",
          border: "2px solid #003366",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#003366" }}>
          Ocean View Resort - Bill Receipt
        </h2>

        <hr style={{ margin: "20px 0" }} />

        <p><b>Reservation Number:</b> {reservation.reservationNumber}</p>
        <p><b>Guest Name:</b> {reservation.guestName}</p>
        <p><b>Address:</b> {reservation.address}</p>
        <p><b>Contact Number:</b> {reservation.contactNumber}</p>
        <p><b>Room Type:</b> {reservation.roomType}</p>
        <p><b>Check-In Date:</b> {reservation.checkInDate}</p>
        <p><b>Check-Out Date:</b> {reservation.checkOutDate}</p>

        <hr style={{ margin: "20px 0" }} />

        <h2 style={{ textAlign: "center", color: "green" }}>
          Total Bill: Rs. {reservation.totalBill}
        </h2>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Thank you for choosing Ocean View Resort 
        </p>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
           Print Bill Report
        </button>
      </div>
    </div>
  );
}

export default BillReport;
