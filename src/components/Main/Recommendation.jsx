import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function Recommendation() {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({}); // State to hold images for hotels and places
  const [itineraryImages, setItineraryImages] = useState({}); // State to hold images for itinerary
  const location = useLocation();

  const GOOGLE_API_KEY = "AIzaSyCzjDdpwYgR9p8AW5hvlg6ycdggwtV1fLQ";

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (data) {
        try {
          const result = await axios.post("http://localhost:5000/api/trip", data);
          const resultData = JSON.parse(result.data);
          setResponse(resultData);
        } catch (err) {
          setError("Failed to fetch trip details. Please try again later.");
        }
      }
    };
    fetchDetails();
  }, [data]);

  useEffect(() => {
    const fetchImage = async (name, key, setImageFn) => {
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
            setImageFn((prevImages) => ({ ...prevImages, [key]: imageURL }));
          }
        }
      } catch (error) {
        console.error(`Error fetching image for ${name}:`, error);
      }
    };

    if (response) {
      if (response.trip_summary?.destination) {
        fetchImage(response.trip_summary.destination, "destination", setImages);
      }

      if (response.accommodation?.hotel_list) {
        response.accommodation.hotel_list.forEach((hotel) =>
          fetchImage(hotel.name, hotel.name, setImages)
        );
      }
      if (response.accommodation?.campsites) {
        response.accommodation.campsites.forEach((hotel) =>
          fetchImage(hotel.name, hotel.name, setImages)
        );
      }
      if (response.accommodation?.campsite_list) {
        response.accommodation.campsite_list.forEach((hotel) =>
          fetchImage(hotel.name, hotel.name, setImages)
        );
      }
      if (response.accommodation?.camping_sites) {
        response.accommodation.camping_sites.forEach((hotel) =>
          fetchImage(hotel.name, hotel.name, setImages)
        );
      }

      if (response.itinerary) {
        Object.keys(response.itinerary).forEach((day) => {
          const activity = response.itinerary[day]?.theme || `Day ${day}`;
          fetchImage(activity, day, setItineraryImages);
        });
      }
    }
  }, [response]);

  const renderValue = (value, fallback = "N/A") => (value ? value : fallback);

  return (
    <>
    <Nav/>
    <div style={styles.container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response ? (
        <div>
          <h1 style={styles.header}>Trip Recommendation</h1>

          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Trip Summary</h2>
            <img
              src={images["destination"] || "https://via.placeholder.com/400" }
              alt="Destination"
              style={styles.image}
            />
            <p><strong>Destination:</strong> {renderValue(response.trip_summary?.destination)}</p>
            <p><strong>Overview:</strong> {renderValue(response.trip_summary?.overview)}</p>
          </section>

          
<section style={styles.section}>
  <h2 style={styles.sectionHeader}>Itinerary</h2>
  {response.itinerary &&
    Object.keys(response.itinerary).map((day) => (
      <div key={day} style={styles.card}>
        <h3 style={styles.subHeader}>{day.toUpperCase()}</h3>
        <img
          src={itineraryImages[day] || images["destination"]}
          alt={`Image for ${day}`}
          style={styles.image}
        />
        <p style={styles.paragraph}>
          <strong>Date:</strong> {renderValue(response.itinerary[day]?.date)}
        </p>
        <p style={styles.paragraph}>
          <strong>Theme:</strong> {renderValue(response.itinerary[day]?.theme)}
        </p>
        <p style={styles.paragraph}>
          <strong>Morning:</strong>
          <ul style={{ margin: '0' }}>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.morning?.activity)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.morning?.notes)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.midday?.activity)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.midday?.notes)}</li>
          </ul>
        </p>
        <p style={styles.paragraph}>
          <strong>Afternoon:</strong>
          <ul style={{ margin: '0' }}>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.afternoon?.activity)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.late_afternoon?.activity)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.late_afternoon?.notes)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.afternoon?.notes)}</li>
          </ul>
        </p>
        <p style={styles.paragraph}>
          <strong>Night:</strong>
          <ul style={{ margin: '0' }}>
          <li style={styles.listItem}>{renderValue(response.itinerary[day]?.evening?.activity)}</li>
          <li style={styles.listItem}>{renderValue(response.itinerary[day]?.evening?.notes)}</li>
          <li style={styles.listItem}>{renderValue(response.itinerary[day]?.night?.activity)}</li>
            <li style={styles.listItem}>{renderValue(response.itinerary[day]?.night?.notes)}</li>
          </ul>
        </p>
      </div>
    ))}
</section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Accommodation</h2>
            {response.accommodation?.campsites?.map((hotel, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={images[hotel.name] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXiaiMaOD5jFOS9cI2oYQ04so58uKU6zVeQ&s"}
                  alt={hotel.name}
                  style={styles.image}
                />
                <p><strong>Hotel Name:</strong> {renderValue(hotel.name)}</p>
                <p><strong>Address:</strong> {renderValue(hotel.address)}</p>
                <p><strong>Cuisine:</strong> {renderValue(hotel.cuisine)}</p>
                <p><strong>Estimated Budget:</strong> {renderValue(hotel.estimated_budget_inr)}</p>
                <p><strong>Famous For:</strong> {renderValue(hotel.famous_for)}</p>
              </div>
            ))}
            {response.accommodation?.camping_sites?.map((hotel, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={images[hotel.name] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXiaiMaOD5jFOS9cI2oYQ04so58uKU6zVeQ&s"}
                  alt={hotel.name}
                  style={styles.image}
                />
                <p><strong>Hotel Name:</strong> {renderValue(hotel.name)}</p>
                <p><strong>Address:</strong> {renderValue(hotel.address)}</p>
                <p><strong>Cuisine:</strong> {renderValue(hotel.cuisine)}</p>
                <p><strong>Estimated Budget:</strong> {renderValue(hotel.estimated_budget_inr)}</p>
                <p><strong>Famous For:</strong> {renderValue(hotel.famous_for)}</p>
              </div>
            ))}
            {response.accommodation?.campsite_list?.map((hotel, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={images[hotel.name] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXiaiMaOD5jFOS9cI2oYQ04so58uKU6zVeQ&s"}
                  alt={hotel.name}
                  style={styles.image}
                />
                <p><strong>Hotel Name:</strong> {renderValue(hotel.name)}</p>
                <p><strong>Address:</strong> {renderValue(hotel.address)}</p>
                <p><strong>Cuisine:</strong> {renderValue(hotel.cuisine)}</p>
                <p><strong>Estimated Budget:</strong> {renderValue(hotel.estimated_budget_inr)}</p>
                <p><strong>Famous For:</strong> {renderValue(hotel.famous_for)}</p>
              </div>
            ))}
            {response.accommodation?.hotel_list?.map((hotel, index) => (
              <div key={index} style={styles.card}>
                <img
                  src={images[hotel.name] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXiaiMaOD5jFOS9cI2oYQ04so58uKU6zVeQ&s"}
                  alt={hotel.name}
                  style={styles.image}
                />
                <p><strong>Hotel Name:</strong> {renderValue(hotel.name)}</p>
                <p><strong>Address:</strong> {renderValue(hotel.address)}</p>
                <p><strong>Cuisine:</strong> {renderValue(hotel.cuisine)}</p>
                <p><strong>Estimated Budget:</strong> {renderValue(hotel.estimated_budget_inr)}</p>
                <p><strong>Famous For:</strong> {renderValue(hotel.famous_for)}</p>
              </div>
            ))}
          </section>
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Transportation</h2>
            <p><strong>Recommendation:</strong> {renderValue(response.transportation?.recommendation)}</p>
            <p><strong>Notes:</strong> {renderValue(response.transportation?.notes)}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Travel Dates</h2>
            <p><strong>Note:</strong> {renderValue(response.travel_dates?.note)}</p>
            <p><strong>Recommendation:</strong> {renderValue(response.travel_dates?.recommendation)}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Cuisine</h2>
            <p><strong>Recommendation:</strong> {renderValue(response.cuisine?.recommendation)}</p>
            <p><strong>Notes:</strong> {renderValue(response.cuisine?.notes)}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>Additional Recommendations</h2>
            <p><strong>Packing Tips:</strong></p>
            <ul>
              {response.additional_recommendations?.packing_tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <p><strong>Cultural Insights:</strong></p>
            <ul>
              {response.additional_recommendations?.cultural_insights?.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
            <p><strong>Local Festivals:</strong> {renderValue(response.additional_recommendations?.local_festivals?.note)}</p>
            <p><strong>Safety Precautions:</strong></p>
            <ul>
              {response.additional_recommendations?.safety_precautions?.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        !error && <p><div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div></p>
      )}
    </div>
    <Footer/>
    </>
  );
  
}


const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f8f9fa',
      color: '#333',
    },
    h1: {
      color: '#007bff',
      textAlign: 'center',
    },
    h2: {
      color: '#007bff',
      textAlign: 'center',
    },
    h3: {
      color: '#6c757d',
    },
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: 'auto',
    },
    section: {
      marginBottom: '40px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    sectionHeader: {
      fontSize: '1.8rem',
      marginBottom: '10px',
    },
    card: {
      display: 'inline-block',
      width: 'calc(50% - 20px)',
      margin: '10px',
      verticalAlign: 'top',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '15px',
      boxSizing: 'border-box',
    },
    image: {
      width: '100%',
      height: '300px',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#555',
    },
    listItem: {
      marginLeft: '20px',
      color: '#333',
    },
    ul: {
      listStyleType: 'disc',
      paddingLeft: '20px',
    },
    strong: {
      color: '#495057',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      padding: '10px 15px',
      fontSize: '1rem',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px 0',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#6c757d',
    },
  };


  

export default Recommendation;
