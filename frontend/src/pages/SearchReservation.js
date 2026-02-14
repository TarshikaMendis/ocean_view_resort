import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchReservation() {
  const [reservationNumber, setReservationNumber] = useState("");
  const [reservation, setReservation] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
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

  const handleGetBillReport = () => {
    navigate("/bill-report", { state: { reservation } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d4f1c5, #fef9e7)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "50px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#3b6b35", textAlign: "center", marginBottom: "40px" }}>
          Search Reservation
        </h2>

        {/* Search Form */}
        <div
          style={{
            background: "#fff7e6",
            padding: "30px 25px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            marginBottom: "40px",
          }}
        >
          <form onSubmit={handleSearch}>
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
                marginBottom: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7cb342")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#7cb342",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#689f38")}
              onMouseOut={(e) => (e.target.style.background = "#7cb342")}
            >
              Search
            </button>
          </form>

          {message && (
            <p style={{ marginTop: "20px", fontWeight: "bold", color: "red", textAlign: "center" }}>
              {message}
            </p>
          )}
        </div>

        {/* Reservation Result */}
        {reservation && (
          <div
            style={{
              background: "#fff7e6",
              padding: "30px 25px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ color: "#3b6b35", marginBottom: "20px" }}>
              ✅ Reservation Found
            </h3>

            <p><b>Reservation No:</b> {reservation.reservationNumber}</p>
            <p><b>Guest Name:</b> {reservation.guestName}</p>
            <p><b>Address:</b> {reservation.address}</p>
            <p><b>Contact:</b> {reservation.contactNumber}</p>
            <p><b>Room Type:</b> {reservation.roomType}</p>
            <p><b>Check-In:</b> {reservation.checkInDate}</p>
            <p><b>Check-Out:</b> {reservation.checkOutDate}</p>

            <p style={{ fontSize: "18px", color: "#3b6b35", marginTop: "15px" }}>
              <b>Total Bill:</b> Rs. {reservation.totalBill}
            </p>

            {/* Get Bill Report Button */}
            <button
              onClick={handleGetBillReport}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "25px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#003366",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
               Get Bill Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchReservation;
