import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // Reservation Data
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  // Contact Messages
  const [contactMessages, setContactMessages] = useState([]);

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

  // Fetch Reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/reservations/all"); // Make sure backend returns paymentStatus
      const data = response.data;
      setReservations(data);
      setTotalReservations(data.length);

      let revenue = 0, single = 0, doubleCount = 0, deluxe = 0;
      data.forEach((res) => {
        revenue += res.totalBill;
        if (res.roomType === "SINGLE") single++;
        else if (res.roomType === "DOUBLE") doubleCount++;
        else if (res.roomType === "DELUXE") deluxe++;
      });

      setTotalRevenue(revenue);
      setSingleCount(single);
      setDoubleCount(doubleCount);
      setDeluxeCount(deluxe);
    } catch (error) {
      setMessage("Error fetching reservations!");
    }
  };

  // Fetch Contact Messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/messages/all");
      setContactMessages(response.data);
    } catch (error) {
      setMessage("Error fetching contact messages!");
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchMessages();
  }, []);

  // Delete Reservation
  const handleDelete = async (reservation) => {
    if (!window.confirm(`Are you sure you want to delete reservation ${reservation.reservationNumber}?`)) return;
    try {
      await axios.delete(`http://localhost:8081/api/reservations/${reservation.id}`);
      setMessage("Reservation Deleted Successfully!");
      fetchReservations();
    } catch (error) {
      setMessage("Delete Failed!");
    }
  };

  // Update Reservation
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/reservations/${editReservation.id}`, editReservation);
      setMessage("Reservation Updated Successfully!");
      setEditReservation(null);
      fetchReservations();
    } catch (error) {
      setMessage("Update Failed!");
    }
  };

  // Delete Contact Message
  const handleDeleteMessage = async (msg) => {
    if (!window.confirm(`Delete this message from ${msg.name}?`)) return;
    try {
      await axios.delete(`http://localhost:8081/api/messages/delete/${msg.id}`);
      setMessage("Message Deleted Successfully!");
      fetchMessages();
    } catch (error) {
      setMessage("Message Delete Failed!");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ color: "#1a1a2e", fontWeight: "700", fontSize: "28px", marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "25px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h2 style={{ fontSize: "18px", color: "#555555", marginBottom: "10px" }}>Total Reservations</h2>
          <p style={{ fontSize: "26px", fontWeight: "700", color: "#1a1a2e" }}>{totalReservations}</p>
        </div>
        <div style={{ padding: "25px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h2 style={{ fontSize: "18px", color: "#555555", marginBottom: "10px" }}>Total Revenue</h2>
          <p style={{ fontSize: "26px", fontWeight: "700", color: "#1a1a2e" }}>Rs. {totalRevenue}</p>
        </div>
        <div style={{ padding: "25px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", color: "#555555", marginBottom: "10px" }}>Room Type Summary</h2>
          <p>🛏 Single Rooms: <strong>{singleCount}</strong></p>
          <p>🛏 Double Rooms: <strong>{doubleCount}</strong></p>
          <p>🛏 Deluxe Rooms: <strong>{deluxeCount}</strong></p>
        </div>
        <div style={{ padding: "25px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => navigate("/view-reservations")}
            style={{ padding: "12px", backgroundColor: "#1a1a2e", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
          >
            View All Reservations
          </button>
          <button
            onClick={() => navigate("/add-reservation")}
            style={{ padding: "12px", backgroundColor: "#0fbcf9", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
          >
            Add New Reservation
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && <p style={{ fontWeight: "600", color: "#27ae60", marginBottom: "20px" }}>{message}</p>}

      {/* Update Form */}
      {editReservation && (
        <div style={{ backgroundColor: "#ffffff", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "30px", maxWidth: "500px" }}>
          <h3 style={{ color: "#1a1a2e", marginBottom: "15px" }}>✏ Update Reservation</h3>
          <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input type="text" value={editReservation.guestName} onChange={(e) => setEditReservation({...editReservation, guestName: e.target.value})} required placeholder="Guest Name" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}/>
            <input type="text" value={editReservation.address} onChange={(e) => setEditReservation({...editReservation, address: e.target.value})} required placeholder="Address" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}/>
            <input type="text" value={editReservation.contactNumber} onChange={(e) => setEditReservation({...editReservation, contactNumber: e.target.value})} required placeholder="Contact Number" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}/>
            <select value={editReservation.roomType} onChange={(e) => setEditReservation({...editReservation, roomType: e.target.value})} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
              <option value="SINGLE">Single</option>
              <option value="DOUBLE">Double</option>
              <option value="DELUXE">Deluxe</option>
            </select>
            <input type="date" value={editReservation.checkInDate} onChange={(e) => setEditReservation({...editReservation, checkInDate: e.target.value})} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}/>
            <input type="date" value={editReservation.checkOutDate} onChange={(e) => setEditReservation({...editReservation, checkOutDate: e.target.value})} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}/>
            <button type="submit" style={{ padding: "12px", backgroundColor: "#1a1a2e", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}>Update Reservation</button>
            <button type="button" onClick={() => setEditReservation(null)} style={{ padding: "12px", backgroundColor: "#e74c3c", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
          </form>
        </div>
      )}

      {/* Reservation Table */}
      <h3 style={{ marginBottom: "15px", color: "#1a1a2e" }}>All Reservations</h3>
      {reservations.length === 0 ? <p>No reservations found.</p> :
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <thead style={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}>
            <tr>
              <th style={{ padding: "12px" }}>Reservation No</th>
              <th>Guest Name</th>
              <th>Contact</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Bill</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, i) => (
              <tr key={res.id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={{ padding: "10px" }}>{res.reservationNumber}</td>
                <td>{res.guestName}</td>
                <td>{res.contactNumber}</td>
                <td>{res.roomType}</td>
                <td>{res.checkInDate}</td>
                <td>{res.checkOutDate}</td>
                <td>Rs. {res.totalBill}</td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    color: "#fff",
                    backgroundColor: res.paymentStatus === "Paid" ? "#27ae60" : "#f39c12",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}>
                    {res.paymentStatus}
                  </span>
                </td>
                <td style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                  <button onClick={() => setEditReservation(res)} style={{ backgroundColor: "#f39c12", color: "#fff", borderRadius: "5px", border: "none", padding: "6px 10px", cursor: "pointer" }}>Update</button>
                  <button onClick={() => handleDelete(res)} style={{ backgroundColor: "#e74c3c", color: "#fff", borderRadius: "5px", border: "none", padding: "6px 10px", cursor: "pointer" }}>Delete</button>
                  <button onClick={() => navigate("/payment", { state: { reservation: res }})}
                    disabled={res.paymentStatus === "Paid"}
                    style={{
                      backgroundColor: res.paymentStatus === "Paid" ? "#95a5a6" : "#1abc9c",
                      color: "#fff",
                      borderRadius: "5px",
                      border: "none",
                      padding: "6px 10px",
                      cursor: res.paymentStatus === "Paid" ? "not-allowed" : "pointer"
                    }}
                  >
                    {res.paymentStatus === "Paid" ? "Paid" : "Pay Now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {/* Contact Messages Table */}
      <h3 style={{ marginTop: "40px", marginBottom: "15px", color: "#1a1a2e" }}>Contact Messages</h3>
      {contactMessages.length === 0 ? <p>No messages found.</p> :
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <thead style={{ backgroundColor: "#1a1a2e", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px" }}>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((msg, i) => (
              <tr key={msg.id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={{ padding: "10px" }}>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => handleDeleteMessage(msg)} style={{ backgroundColor: "#e74c3c", color: "#fff", borderRadius: "5px", border: "none", padding: "6px 10px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default AdminDashboard;
