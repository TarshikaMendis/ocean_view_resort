import React from "react";

import banner from "../images/banner.jpg";
import single from "../images/single.jpg";
import double from "../images/double.jpg";
import deluxe from "../images/deluxe.jpg";

function Home() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* Banner Section */}
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "450px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "30px",
            borderRadius: "15px",
            width: "80%",
          }}
        >
          <h1 style={{ fontSize: "45px", marginBottom: "10px" }}>
             Welcome to Ocean View Resort
          </h1>

          <p style={{ fontSize: "20px" }}>
            Enjoy luxury rooms, sea breeze, and unforgettable holidays in Galle.
          </p>

          <button
            onClick={() => (window.location.href = "/add-reservation")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              backgroundColor: "#ffcc00",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Book Your Room Now
          </button>
        </div>
      </div>

      {/* About Section */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#003366", fontSize: "32px" }}>
           About Our Resort
        </h2>

        <p style={{ fontSize: "18px", maxWidth: "900px", margin: "20px auto" }}>
          Ocean View Resort is a beautiful beachside hotel located in Galle,
          Sri Lanka. We provide a calm and relaxing environment for families,
          couples, and travelers. Our resort includes luxury rooms, restaurant
          facilities, swimming pool, and friendly customer service.
        </p>
      </div>

      {/* Room Cards Section */}
      <div style={{ padding: "40px", backgroundColor: "#f2f9ff" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#003366",
            fontSize: "32px",
            marginBottom: "30px",
          }}
        >
           Our Room Types
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {/* Single Room Card */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <img src={single} alt="Single Room" style={{ width: "100%" }} />

            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#003366" }}>Single Room</h3>
              <p>
                Perfect for solo travelers. Includes free WiFi, AC, and sea view.
              </p>
              <p style={{ fontWeight: "bold", color: "green" }}>
                Rs. 5000 per night
              </p>

              <button
                onClick={() => (window.location.href = "/add-reservation")}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#003366",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Double Room Card */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <img src={double} alt="Double Room" style={{ width: "100%" }} />

            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#003366" }}>Double Room</h3>
              <p>
                Best for couples and families. Includes free breakfast and AC.
              </p>
              <p style={{ fontWeight: "bold", color: "green" }}>
                Rs. 8000 per night
              </p>

              <button
                onClick={() => (window.location.href = "/add-reservation")}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#003366",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Deluxe Room Card */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <img src={deluxe} alt="Deluxe Room" style={{ width: "100%" }} />

            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#003366" }}>Deluxe Room</h3>
              <p>
                Luxury experience with balcony view, pool access, and free meals.
              </p>
              <p style={{ fontWeight: "bold", color: "green" }}>
                Rs. 12000 per night
              </p>

              <button
                onClick={() => (window.location.href = "/add-reservation")}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#003366",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#003366", fontSize: "32px" }}>
           Our Services
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              width: "250px",
              padding: "20px",
              backgroundColor: "#f2f9ff",
              borderRadius: "12px",
              border: "2px solid #003366",
            }}
          >
            <h3> Swimming Pool</h3>
            <p>Enjoy a relaxing swim with beautiful ocean view.</p>
          </div>

          <div
            style={{
              width: "250px",
              padding: "20px",
              backgroundColor: "#f2f9ff",
              borderRadius: "12px",
              border: "2px solid #003366",
            }}
          >
            <h3> Restaurant</h3>
            <p>Delicious seafood and Sri Lankan meals available.</p>
          </div>

          <div
            style={{
              width: "250px",
              padding: "20px",
              backgroundColor: "#f2f9ff",
              borderRadius: "12px",
              border: "2px solid #003366",
            }}
          >
            <h3> Free WiFi</h3>
            <p>High speed internet access for all guests.</p>
          </div>

        </div>
      </div>

      {/* Call To Action Section */}
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          backgroundColor: "#003366",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "35px" }}>
          Ready to Experience the Best Beach Holiday?
        </h2>

        <p style={{ fontSize: "18px", marginTop: "15px" }}>
          Book your room today and enjoy the luxury of Ocean View Resort.
        </p>

        <button
          onClick={() => (window.location.href = "/register")}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            backgroundColor: "#ffcc00",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Home;
