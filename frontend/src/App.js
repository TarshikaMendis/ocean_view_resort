import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddReservation from "./pages/AddReservation";
import ViewReservations from "./pages/ViewReservations";
import AdminDashboard from "./pages/AdminDashboard";
import Gallery from "./pages/Gallery";

import Help from "./pages/Help";
import SearchReservation from "./pages/SearchReservation";
import AboutContact from "./pages/AboutContact";
import BillReport from "./pages/BillReport";

//  Payment Form from components folder
import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/search-reservation" element={<SearchReservation />} />
        <Route path="/about-contact" element={<AboutContact />} />

        {/* Bill + Payment Pages */}
        <Route path="/bill-report" element={<BillReport />} />
        <Route path="/payment" element={<PaymentForm />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Pages */}
        <Route path="/add-reservation" element={<AddReservation />} />

        {/* Admin Pages */}
        <Route path="/view-reservations" element={<ViewReservations />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
