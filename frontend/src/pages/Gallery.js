import React, { useState } from "react";

function Gallery() {
  const galleryItems = [
    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BpntVSv2p-tKiMurjHYk1uWCsLZs-OAqpA&s",
    },

    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://assets.builderassets.com/site-media/536/hotel-kymata-luxury-room-4.jpg?format=jpg&quality=80&mode=crop&crop=0,143,1700,1099&width=1920&height=956",
    },

    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://www.h501luxuryrooms.com/en/img/home/junior_1_l.jpg",
    },

    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://cf.bstatic.com/xdata/images/hotel/max300/519998638.jpg?k=535a9517097c53259db3fdcefee04311149bffd59149a66361a50cfea6f30f45&o=",
    },

    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },

    {
      title: "Luxury Room",
      category: "Rooms",
      url: "https://www.solanohotels.com/wp-content/uploads/2021/06/solano-deluxe-gallery-2.jpg",
    },

    {
      title: "Ocean View",
      category: "Beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      title: "Ocean View",
      category: "Beach",
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    },

    {
      title: "Ocean View",
      category: "Beach",
      url: "https://media.istockphoto.com/id/511367374/photo/beautiful-cloudscape-over-the-sea.jpg?s=612x612&w=0&k=20&c=9o5kwt9emxiKCLd-bmsLLHzoY6Bwz3F18DEkZJh3MBI=",
    },

    {
      title: "Ocean View",
      category: "Beach",
      url: "https://www.princehotels.com/ginowan/wp-content/uploads/sites/68/2023/12/theclubsuite8_2023_1920_900.jpg",
    },

    {
      title: "Ocean View",
      category: "Beach",
      url: "https://images.stockcake.com/public/5/5/5/55535d01-37cf-4d2d-b11b-8f78f7e62b66_large/sunset-ocean-view-stockcake.jpg",
    },

    {
      title: "Ocean View",
      category: "Beach",
      url: "https://images.unsplash.com/photo-1743592323413-2ab3987e47b7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      title: "Pool View",
      category: "Pool",
      url: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/547916501.jpg?k=3c1c29dd149239e10f2c0942d0c6ae7aec2fc5215b3e07590948e2f1b63e753e&o=",
    },
    {
      title: "Pool View",
      category: "Pool",
      url: "https://thumbs.dreamstime.com/b/nighttime-swimming-pool-view-view-large-swimming-pool-night-lights-illuminating-area-shown-elevated-363228167.jpg",
    },

    {
      title: "Pool View",
      category: "Pool",
      url: "https://media.istockphoto.com/id/2093784213/photo/young-woman-relaxes-on-edge-of-swimming-pool.jpg?s=612x612&w=0&k=20&c=sBz4YVqJZbK6SPwqXvcXhRjwzCRUkPWsysaF7TgOWFY=",
    },

    {
      title: "Pool View",
      category: "Pool",
      url: "https://photos.travelmyth.com/hotels/480/20/m1-2070207.jpg?crop=550,480&width=550",
    },

    {
      title: "Delicious Seafood",
      category: "Foods",
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    },
    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://media.istockphoto.com/id/502840530/photo/luxury-restaurant-table-on-sunset.jpg?s=612x612&w=0&k=20&c=KMVfVojQ0UmscMmj1S-Hd2trPlw2xEXpOyn9OyWT0Mw=",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOtiad8T1szMgsApFzOOMsROmEH1lr6on0A&s",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/ca/7d/be/bar-35-food-drinks.jpg?w=900&h=500&s=1",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8LHPsZY9HuVDtSuFOjJSxEclzzEHeSkhYw&s",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI-SN97Wuh5a_9EWp_hI2ZWO1xs0a7rGb0UQ&s",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://i.pinimg.com/236x/db/0e/ab/db0eab6fd2de3bca1d7a2000ec6adfce.jpg",
    },

    {
      title: "Food and Drinks",
      category: "Foods",
      url: "https://media.tacdn.com/media/attractions-splice-spp-360x240/15/e9/cd/db.jpg",
    },


  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter items
  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#003366" }}>
         Ocean View Resort Gallery
      </h1>

      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
        Explore our rooms, beach view, swimming pool, and delicious foods.
      </p>

      {/* Filter Buttons */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        {["All", "Rooms", "Beach", "Pool", "Foods"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 18px",
              margin: "8px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: selectedCategory === cat ? "#003366" : "#e0f7fa",
              color: selectedCategory === cat ? "white" : "#003366",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              transition: "0.3s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(item)}
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "white",
              boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
              transition: "0.3s",
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                transition: "0.3s",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#003366", marginBottom: "5px" }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: "gray" }}>
                Category: {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Popup */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "15px",
              maxWidth: "800px",
              width: "100%",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h2 style={{ color: "#003366" }}>{selectedImage.title}</h2>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{
                width: "100%",
                maxHeight: "450px",
                objectFit: "cover",
                borderRadius: "12px",
                marginTop: "15px",
              }}
            />

            <p style={{ marginTop: "15px", fontWeight: "bold" }}>
              Category: {selectedImage.category}
            </p>
          </div>
        </div>
      )}

      
        </div>
  );
}

export default Gallery;
