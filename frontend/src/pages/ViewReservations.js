import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  // Admin Protection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "ADMIN") {
      alert("Access Denied! Admin only.");
      window.location.href = "/login";
    }
  }, []);

  // Fetch all reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/reservations");
        setReservations(response.data);
      } catch (error) {
        setMessage("Error fetching reservations! Please check backend.");
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#003366" }}> Reservation Report (Admin Only)</h2>

      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}

      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#003366", color: "white" }}>
            <tr>
              <th>Reservation No</th>
              <th>Guest Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Bill</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.reservationNumber}</td>
                <td>{res.guestName}</td>
                <td>{res.address}</td>
                <td>{res.contactNumber}</td>
                <td>{res.roomType}</td>
                <td>{res.checkInDate}</td>
                <td>{res.checkOutDate}</td>
                <td>Rs. {res.totalBill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewReservations;
