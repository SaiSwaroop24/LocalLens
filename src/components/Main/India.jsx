import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function India() {
  const destinations = [
    {
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      description: "An iconic symbol of love and one of the Seven Wonders of the World.",
      image: "https://images.pexels.com/photos/28749618/pexels-photo-28749618/free-photo-of-majestic-view-of-the-taj-mahal-in-agra.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Jaipur",
      location: "Rajasthan",
      description: "The Pink City, known for its palaces and vibrant culture.",
      image: "https://images.pexels.com/photos/1588032/pexels-photo-1588032.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Goa Beaches",
      location: "Goa",
      description: "Famous for its beaches, nightlife, and Portuguese heritage.",
      image: "https://images.pexels.com/photos/740808/pexels-photo-740808.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Kerala Backwaters",
      location: "Kerala",
      description: "A network of lagoons, rivers, and lakes offering serene houseboat experiences.",
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Leh-Ladakh",
      location: "Jammu and Kashmir",
      description: "Known for its stunning landscapes, monasteries, and adventurous roads.",
      image: "https://images.pexels.com/photos/879444/pexels-photo-879444.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Varanasi",
      location: "Uttar Pradesh",
      description: "The spiritual capital of India, located on the banks of the Ganges.",
      image: "https://images.pexels.com/photos/18283145/pexels-photo-18283145/free-photo-of-men-with-incense-in-hindu-ritual.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    }, 
    {
        name: "Hampi",
        location: "Karnataka",
        description: "A UNESCO World Heritage site, known for its ancient temples and ruins.",
        image: "https://images.pexels.com/photos/29485855/pexels-photo-29485855/free-photo-of-ancient-temples-in-pattadakal-karnataka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://upload.wikimedia.org/wikipedia/commons/a/a0/Hampi_temple.jpg",
      },
      {
        name: "Darjeeling",
        location: "West Bengal",
        description: "Famous for its tea gardens and scenic Himalayan views.",
        image: "https://images.pexels.com/photos/14025668/pexels-photo-14025668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Amritsar",
        location: "Punjab",
        description: "Home to the Golden Temple and rich Sikh culture.",
        image: "https://images.pexels.com/photos/12656946/pexels-photo-12656946.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      {
        name: "Rann of Kutch",
        location: "Gujarat",
        description: "A vast white salt desert, famous for the Rann Utsav.",
        image: "https://images.pexels.com/photos/5578391/pexels-photo-5578391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Mysore",
        location: "Karnataka",
        description: "Known for the Mysore Palace and Dasara celebrations.",
        image: "https://images.pexels.com/photos/5480518/pexels-photo-5480518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Meghalaya",
        location: "Northeast India",
        description: "Known for its living root bridges and natural beauty.",
        image: "https://images.pexels.com/photos/1403036/pexels-photo-1403036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
  ];

  const navigate = useNavigate();

  const handleCardClick = (placeName) => {
    const noSpace=placeName.replace(/\s+/g, '');
    navigate(`/details/${encodeURIComponent(noSpace)}`);
  };

  return (
    <>
  
    <div style={{ padding: "100px", fontFamily: "'Arial', sans-serif",marginLeft:'50px',marginRight:'50px' }}>
      <h1 style={{ textAlign: "center", marginBottom: "60px" }}>
        Top Tourist Destinations in India
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {destinations.map((place, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(place.name)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              cursor: "pointer",
              background: "#fff",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={place.image}
              alt={place.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "10px 0", color: "#333" }}>{place.name}</h3>
              <p style={{ margin: "5px 0", color: "#666" }}>
                <strong>Location:</strong> {place.location}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </>
  );
}

export default India;
