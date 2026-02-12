import React, { useState } from "react";

function AboutContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d4f1c5, #fef9e7)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >
        {/* Left Image */}
        <div
          style={{
            flex: "1 1 200px",
            backgroundImage:
              "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/84738858.jpg?k=489d49455539b0707f1f06e8e60e8cdb688e171281023c7c57a493cba4eea3cc&o=')",

            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            minHeight: "100px",
          }}
        ></div>

        {/* Right Content */}
        <div
          style={{
            flex: "1 1 500px",
          }}
        >
          {/* About Section */}
          <div
            style={{
              background: "#fff7e6",
              padding: "30px 25px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              marginBottom: "40px",
            }}
          >
            <h1 style={{ color: "#3b6b35", marginBottom: "15px" }}>
              About Ocean View Resort
            </h1>
            <p style={{ fontSize: "17px", lineHeight: "28px" }}>
              Welcome to <b>Ocean View Resort</b>! We provide luxury
              accommodation, beautiful sea views, delicious meals, and
              relaxing experiences for our guests.
            </p>

            <h2 style={{ color: "#3b6b35", marginTop: "25px", marginBottom: "10px" }}>
              Our Mission
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "26px" }}>
              Our mission is to provide a comfortable and memorable holiday
              experience for all guests with friendly service and high-quality
              facilities.
            </p>

            <h2 style={{ color: "#3b6b35", marginTop: "25px", marginBottom: "10px" }}>
              Our Facilities
            </h2>
            <ul style={{ fontSize: "16px", lineHeight: "26px" }}>
              <li>Luxury Single / Double / Deluxe Rooms</li>
              <li>Swimming Pool</li>
              <li>Beach Side Restaurant</li>
              <li>Free WiFi</li>
              <li>24/7 Customer Support</li>
            </ul>

            <h2 style={{ color: "#3b6b35", marginTop: "25px", marginBottom: "10px" }}>
               Location
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "26px" }}>
              Ocean View Resort is located near the beach with easy access to
              tourist attractions and transport facilities.
            </p>
          </div>

          {/* Contact Section */}
          <div
            style={{
              background: "#fff7e6",
              padding: "30px 25px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <h1 style={{ color: "#3b6b35", marginBottom: "15px" }}>Contact Us</h1>
            <p style={{ fontSize: "16px", lineHeight: "26px" }}>
              If you have any questions or need help, please contact Ocean View Resort.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
              <label style={{ fontWeight: "bold" }}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0 15px 0",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7cb342")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />

              <label style={{ fontWeight: "bold" }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0 15px 0",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7cb342")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />

              <label style={{ fontWeight: "bold" }}>Message</label>
              <textarea
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px",
                  margin: "8px 0 15px 0",
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
                  backgroundColor: "#7cb342",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#689f38")}
                onMouseOut={(e) => (e.target.style.background = "#7cb342")}
              >
                Send Message
              </button>
            </form>

            <div style={{ marginTop: "30px", fontSize: "16px" }}>
              <h3 style={{ color: "#3b6b35", marginBottom: "10px" }}>
                Resort Contact Details
              </h3>
              <p><b>Address:</b> Ocean View Resort, Beach Road, Galle, Sri Lanka</p>
              <p><b>Phone:</b> +94 77 123 4567</p>
              <p><b>Email:</b> oceanviewresort@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutContact;
