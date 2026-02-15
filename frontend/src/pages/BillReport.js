import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./BillReport.css";

function BillReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  // Print Bill
  const handlePrint = () => window.print();

  // Online Payment
  const handlePayment = async () => {
    if (!reservation) return;

    try {
      //  Create order on backend
      const orderResponse = await axios.post("http://localhost:8081/api/payment/create-order", {
        reservationId: reservation.id,
        amount: reservation.totalBill, // Razorpay expects smallest unit automatically handled in backend
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      //  Razorpay payment
      const options = {
        key,
        amount,
        currency,
        name: "Ocean View Resort",
        description: `Payment for reservation ${reservation.reservationNumber}`,
        order_id: orderId,
        handler: async function (response) {
          //  Confirm payment on backend
          await axios.post("http://localhost:8081/api/payment/confirm", {
            reservationId: reservation.id,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });

          //  Success alert
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: `Rs. ${reservation.totalBill} paid successfully.`,
          });
        },
        theme: { color: "#003366" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // If no reservation
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
        <h2 style={{ textAlign: "center", color: "green" }}>Total Bill: Rs. {reservation.totalBill}</h2>
        <p style={{ textAlign: "center", marginTop: "20px" }}>Thank you for choosing Ocean View Resort</p>

        <button className="btn btn-print" onClick={handlePrint}>Print Bill Report</button>
        <button className="btn btn-pay" onClick={handlePayment}>Pay Bill</button>
      </div>
    </div>
  );
}

export default BillReport;
