import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BillReport.css";

function BillReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  const handlePrint = () => window.print();

  const handlePayment = () => {
    navigate("/payment", { state: { reservation } });
  };

  if (!reservation) {
    return (
      <div className="no-data">
        <h2>No Reservation Data Found!</h2>
        <p>Please search reservation first.</p>
        <button onClick={() => navigate("/search-reservation")}>Go Back to Search</button>
      </div>
    );
  }

  return (
    <div className="bill-container">
      <div className="bill-card">
        <h2>Ocean View Resort - Bill Receipt</h2>
        <hr />
        <p><b>Reservation Number:</b> {reservation.reservationNumber}</p>
        <p><b>Guest Name:</b> {reservation.guestName}</p>
        <p><b>Address:</b> {reservation.address}</p>
        <p><b>Contact Number:</b> {reservation.contactNumber}</p>
        <p><b>Room Type:</b> {reservation.roomType}</p>
        <p><b>Check-In Date:</b> {reservation.checkInDate}</p>
        <p><b>Check-Out Date:</b> {reservation.checkOutDate}</p>
        <hr />
        <h2 style={{ textAlign: "center", color: "green" }}>
          Total Bill: Rs. {reservation.totalBill}
        </h2>

        <button className="btn btn-print" onClick={handlePrint}>
          Print Bill Report
        </button>

        <button className="btn btn-pay" onClick={handlePayment}>
          Pay Bill
        </button>
      </div>
    </div>
  );
}

export default BillReport;
