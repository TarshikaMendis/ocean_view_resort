import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  // Reservation Data
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  // Dashboard Stats
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [singleCount, setSingleCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [deluxeCount, setDeluxeCount] = useState(0);

  // Update Form
  const [editReservation, setEditReservation] = useState(null);

  // Admin Protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || role !== "ADMIN") {
      alert("Access Denied! Admin only.");
      window.location.href = "/login";
    }
  }, []);

  // Fetch Reservations & Stats
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/reservations");
      const data = response.data;

      setReservations(data);
      setTotalReservations(data.length);

      let revenue = 0,
        single = 0,
        double = 0,
        deluxe = 0;

      data.forEach((res) => {
        revenue += res.totalBill;

        if (res.roomType === "SINGLE") single++;
        else if (res.roomType === "DOUBLE") double++;
        else if (res.roomType === "DELUXE") deluxe++;
      });

      setTotalRevenue(revenue);
      setSingleCount(single);
      setDoubleCount(double);
      setDeluxeCount(deluxe);
    } catch (error) {
      setMessage("Error fetching reservations!");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Delete Reservation
  const handleDelete = async (reservation) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete reservation " + reservation.reservationNumber + "?"
    );
    if (!confirmDelete) return;

    try {
      // Use ID here (adjust if backend uses reservationNumber instead)
      await axios.delete(`http://localhost:8081/api/reservations/${reservation.id}`);

      setMessage("Reservation Deleted Successfully!");
      fetchReservations();
    } catch (error) {
      console.error("Delete Error:", error.response || error);
      setMessage("Delete Failed! Check console for details.");
    }
  };

  // Update Reservation
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/api/reservations/${editReservation.id}`,
        editReservation
      );
      setMessage("Reservation Updated Successfully!");
      setEditReservation(null);
      fetchReservations();
    } catch (error) {
      console.error("Update Error:", error.response || error);
      setMessage("Update Failed! Check console for details.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#003366" }}> Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f0f8ff",
            borderRadius: "10px",
            border: "2px solid #003366",
          }}
        >
          <h2>Total Reservations</h2>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{totalReservations}</p>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff0f5",
            borderRadius: "10px",
            border: "2px solid #003366",
          }}
        >
          <h2>Total Revenue</h2>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>Rs. {totalRevenue}</p>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#f5fffa",
            borderRadius: "10px",
            border: "2px solid #003366",
          }}
        >
          <h2>Room Type Summary</h2>
          <p>🛏 Single Rooms: {singleCount}</p>
          <p>🛏 Double Rooms: {doubleCount}</p>
          <p>🛏 Deluxe Rooms: {deluxeCount}</p>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffffe0",
            borderRadius: "10px",
            border: "2px solid #003366",
          }}
        >
          <h2>Admin Actions</h2>
          <button
            onClick={() => (window.location.href = "/view-reservations")}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#003366",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            View All Reservations
          </button>
          <button
            onClick={() => (window.location.href = "/add-reservation")}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Add New Reservation
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <p style={{ fontWeight: "bold", color: "green", marginTop: "20px" }}>{message}</p>
      )}

      {/* Update Form */}
      {editReservation && (
        <div
          style={{
            border: "2px solid #003366",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#f0f8ff",
            maxWidth: "500px",
          }}
        >
          <h3 style={{ color: "#003366" }}>✏ Update Reservation</h3>

          <form onSubmit={handleUpdate}>
            <label>Guest Name</label>
            <input
              type="text"
              value={editReservation.guestName}
              onChange={(e) =>
                setEditReservation({ ...editReservation, guestName: e.target.value })
              }
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <label>Address</label>
            <input
              type="text"
              value={editReservation.address}
              onChange={(e) =>
                setEditReservation({ ...editReservation, address: e.target.value })
              }
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <label>Contact Number</label>
            <input
              type="text"
              value={editReservation.contactNumber}
              onChange={(e) =>
                setEditReservation({
                  ...editReservation,
                  contactNumber: e.target.value,
                })
              }
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <label>Room Type</label>
            <select
              value={editReservation.roomType}
              onChange={(e) =>
                setEditReservation({ ...editReservation, roomType: e.target.value })
              }
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            >
              <option value="SINGLE">Single</option>
              <option value="DOUBLE">Double</option>
              <option value="DELUXE">Deluxe</option>
            </select>

            <label>Check-in Date</label>
            <input
              type="date"
              value={editReservation.checkInDate}
              onChange={(e) =>
                setEditReservation({ ...editReservation, checkInDate: e.target.value })
              }
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <label>Check-out Date</label>
            <input
              type="date"
              value={editReservation.checkOutDate}
              onChange={(e) =>
                setEditReservation({ ...editReservation, checkOutDate: e.target.value })
              }
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Update Reservation
            </button>

            <button
              type="button"
              onClick={() => setEditReservation(null)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Reservation Table */}
      <h3 style={{ marginTop: "30px" }}> All Reservations</h3>

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
              <th>Contact</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Bill</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.reservationNumber}</td>
                <td>{res.guestName}</td>
                <td>{res.contactNumber}</td>
                <td>{res.roomType}</td>
                <td>{res.checkInDate}</td>
                <td>{res.checkOutDate}</td>
                <td>Rs. {res.totalBill}</td>

                <td>
                  <button
                    onClick={() => setEditReservation(res)}
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(res)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
