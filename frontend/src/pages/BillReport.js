import React, { useState } from "react";
import axios from "axios";

function BillReport() {
  const [reservationNumber, setReservationNumber] = useState("");
  const [reservation, setReservation] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearchBill = async (e) => {
    e.preventDefault();

    if (!reservationNumber) {
      alert("Please enter reservation number!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8081/api/reservations/number/${reservationNumber}`
      );

      setReservation(response.data);
      setMessage("");
    } catch (error) {
      setReservation(null);
      setMessage("Reservation Not Found! Please check reservation number.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f2f7ff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#003366" }}>
         Bill Report
      </h1>

      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Enter your Reservation Number to generate the bill report.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSearchBill}
        style={{
          maxWidth: "500px",
          margin: "30px auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Reservation Number</label>

        <input
          type="text"
          placeholder="Enter Reservation Number (ex: RES001)"
          value={reservationNumber}
          onChange={(e) => setReservationNumber(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          Generate Bill
        </button>
      </form>

      {/* Message */}
      {message && (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {/* Bill Output */}
      {reservation && (
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

          <p>
            <b>Reservation Number:</b> {reservation.reservationNumber}
          </p>
          <p>
            <b>Guest Name:</b> {reservation.guestName}
          </p>
          <p>
            <b>Address:</b> {reservation.address}
          </p>
          <p>
            <b>Contact Number:</b> {reservation.contactNumber}
          </p>
          <p>
            <b>Room Type:</b> {reservation.roomType}
          </p>
          <p>
            <b>Check-In Date:</b> {reservation.checkInDate}
          </p>
          <p>
            <b>Check-Out Date:</b> {reservation.checkOutDate}
          </p>

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
      )}
    </div>
  );
}

export default BillReport;
