import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

function Hotels() {
  const [city, setCity] = useState("India");
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({});

  const GOOGLE_API_KEY = "AIzaSyCzjDdpwYgR9p8AW5hvlg6ycdggwtV1fLQ"; 

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchDetails = async () => {
    try {
      if (!city.trim()) {
        setError("Please enter a valid city name.");
        return;
      }

      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:5000/api/hotels/${encodeURIComponent(city)}`
      );

      const parsedData = JSON.parse(response.data);
      setDetails(parsedData);
      console.log(details);
      console.log(parsedData[city]);
    } catch (error) {
      console.error("Error fetching details:", error);
      setError("Failed to fetch hotel details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchImage = async (name) => {
      try {
        const searchResponse = await axios.get(
          `http://localhost:5000/api/places`,
          {
            params: { query: name },
          }
        );

        if (searchResponse.data.results.length > 0) {
          const photoReference =
            searchResponse.data.results[0]?.photos?.[0]?.photo_reference;

          if (photoReference) {
            const imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
            setImages((prevImages) => ({ ...prevImages, [name]: imageURL }));
          } else {
            console.warn(`No photo reference found for ${name}`);
          }
        } else {
          console.warn(`No search results found for ${name}`);
        }
      } catch (error) {
        console.error(`Error fetching image for ${name}:`, error);
      }
    };

    if (details.hotels && Array.isArray(details.hotels)) {
      details.hotels.forEach((hotel) => {
        fetchImage(hotel.name);
      });
    }
  }, [details]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  return (
    <>
    <Nav/>
      <div className="search-container">
        <div className="navbar1">
          <div className="container-fluid">
            <form className="search-form" role="search" onSubmit={handleSubmit}>
              <input
                className="search-input"
                type="search"
                placeholder="Enter City Name"
                aria-label="Search"
                value={city}
                onChange={handleChange}
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          <p><div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div></p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <div className="details-container">
            <h1 className="page-title">Top Hotels in Our {city}</h1>
            <div className="hotel-list">
              <div className="hotel-grid">
                {details.hotels &&
                Array.isArray(details.hotels) &&
                details.hotels.length > 0 ? (
                  details.hotels.map((hotel, index) => (
                    <div key={index} className="hotel-card"><a 
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(hotel.name)}+${encodeURIComponent(hotel.address)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                      <a
                        href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                          hotel.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hotel-link"
                      >
                        <img
                          src={images[hotel.name] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfRG0hMc-Nynv7Ifliz3Y9MfzT3B6cpXSug&s"}
                          alt={hotel.name}
                          className="hotel-image"
                        />
                        <div className="hotel-info">
                          <h3>{hotel.name}</h3>
                          <p>
                            <strong>Location:</strong> {hotel.address}
                          </p>
                          <p>
                            <strong>Price Range:</strong> {hotel.price_range}
                          </p>
                          <p>
                            <strong>Rating:</strong> {hotel.rating}
                          </p>
                        </div>
                      </a></a>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .search-container {
            background-color: #f8f9fa;
            padding: 20px;
            border-bottom: 2px solid #e0e0e0;
          }
          
          .navbar1 {
            background-color:rgb(250, 251, 253);
            padding: 15px;
          }

          .search-form {
            display: flex;
            justify-content: space-between;
            max-width: 600px;
            margin: 0 auto;
          }

          .search-input {
            width: 80%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .search-button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .search-button:hover {
            background-color: #218838;
          }

          

          .page-title {
            text-align: center;
            font-size: 2em;
            margin-bottom: 20px;
            color: #333;
          }

          .hotel-list {
            margin-top: 30px;
          }

          .hotel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates 3 equal-width columns */
  gap: 60px;
  margin-top: 30px;
  margin-left: 40px;  /* Increased left margin */
  margin-right: 40px; /* Increased right margin */
}

.details-container {
  padding: 20px;
  margin-left: 40px;  /* Increased left margin */
  margin-right: 40px; /* Increased right margin */
}

.hotel-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.hotel-card:hover {
  transform: translateY(-2px);
}

          .hotel-link {
            text-decoration: none;
            color: inherit;
          }

          .hotel-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
          }

          .hotel-info {
            padding: 15px;
          }

          .hotel-info h3 {
            font-size: 1.2em;
            margin-bottom: 10px;
          }

          .hotel-info p {
            font-size: 1em;
            margin: 5px 0;
            color: #555;
          }

          .error-message {
            color: red;
            text-align: center;
            font-size: 1.2em;
          }
        `}
      </style>
      <Footer/>
    </>
  );
}

export default Hotels;
