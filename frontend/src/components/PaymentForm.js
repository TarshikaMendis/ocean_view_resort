import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./PaymentForm.css";

function PaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const reservation = location.state?.reservation;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleConfirmPayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/payment/confirm", {
        reservationId: reservation.id,
        cardName,
        cardNumber,
        expiryDate,
        cvv,
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: response.data.message,
      });

      navigate("/");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.response?.data || "Something went wrong!",
      });
    }
  };

  if (!reservation) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Reservation Found!</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Form</h2>

        <p><b>Reservation:</b> {reservation.reservationNumber}</p>
        <p><b>Total Amount:</b> Rs. {reservation.totalBill}</p>

        <form onSubmit={handleConfirmPayment}>
          <label>Card Holder Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />

          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <label>Expiry Date</label>
          <input
            type="month"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />

          <label>CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <button type="submit" className="btn-confirm">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
