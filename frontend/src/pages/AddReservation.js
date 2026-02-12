import { useState, useEffect } from "react";

function AddReservation() {
  const [guestName, setGuestName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [roomType, setRoomType] = useState("SINGLE");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Login Protection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login to continue booking!");
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: check date format
    if (!checkInDate || !checkOutDate) {
      setIsSuccess(false);
      setMessage("❌ Please select valid check-in and check-out dates!");
      return;
    }

    const reservationData = {
      guestName,
      address,
      contactNumber,
      roomType,
      checkInDate,   // MUST BE yyyy-MM-dd
      checkOutDate,  // MUST BE yyyy-MM-dd
    };

    try {
      const response = await fetch("http://localhost:8081/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const text = await response.text(); // read raw response

      if (response.ok) {
        const result = JSON.parse(text);

        setIsSuccess(true);
        setMessage(
          "✅ Reservation Added Successfully!\n\nReservation Number: " +
            result.reservationNumber +
            "\nTotal Bill: Rs. " +
            result.totalBill
        );

        // Clear form
        setGuestName("");
        setAddress("");
        setContactNumber("");
        setRoomType("SINGLE");
        setCheckInDate("");
        setCheckOutDate("");
      } else {
        setIsSuccess(false);
        setMessage(
          "❌ Failed to add reservation.\n\nStatus Code: " +
            response.status +
            "\nBackend Message: " +
            text
        );
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("❌ Error connecting to backend! Please ensure backend is running.");
    }
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
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#2f5d2f",
            marginBottom: "10px",
          }}
        >
          🌊 Ocean View Resort
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#444",
            marginBottom: "40px",
          }}
        >
          Reservation Booking System
        </p>

        <div
          style={{
            background: "#fff7e6",
            padding: "35px 30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ color: "#2f5d2f", marginBottom: "25px" }}>
            🏨 Add New Reservation
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: "bold" }}>Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              placeholder="Enter guest full name"
              style={inputStyle}
            />

            <label style={{ fontWeight: "bold" }}>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter address"
              style={inputStyle}
            />

            <label style={{ fontWeight: "bold" }}>Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter contact number"
              style={inputStyle}
            />

            <label style={{ fontWeight: "bold" }}>Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              style={inputStyle}
            >
              <option value="SINGLE">Single Room</option>
              <option value="DOUBLE">Double Room</option>
              <option value="DELUXE">Deluxe Room</option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ fontWeight: "bold" }}>Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ flex: 1, minWidth: "200px" }}>
                <label style={{ fontWeight: "bold" }}>Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "25px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#7cb342",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✅ Add Reservation
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
                whiteSpace: "pre-line",
                backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                color: isSuccess ? "#155724" : "#721c24",
                border: isSuccess ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "15px",
};

export default AddReservation;
