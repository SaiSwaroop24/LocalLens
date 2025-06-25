import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './DetailsPage.css';
import Nav from "./Nav";
import Footer from "./Footer";

function DetailsPage() {
  const { placeName } = useParams();
  const noSpace = placeName.replace(/\s+/g, '');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({}); // State to store images

  const GOOGLE_API_KEY = "AIzaSyCzjDdpwYgR9p8AW5hvlg6ycdggwtV1fLQ"; // Replace with your actual API key

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/details/${encodeURIComponent(noSpace)}`
        );
        const parsedData = JSON.parse(response.data);
        console.log(parsedData);
        setDetails(parsedData[placeName]);

        await Promise.all([
          fetchImage(placeName),
          ...parsedData[placeName].hotels.map((hotel) => fetchImage(hotel.name)),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to fetch details. Please try again.");
        setLoading(false);
      }
    };

    const fetchImage = async (name) => {
      try {
        const searchResponse = await axios.get(`http://localhost:5000/api/places`, {
            params: { query: name },
        });

        if (searchResponse.data.results.length > 0) {
          const photoReference = searchResponse.data.results[0]?.photos?.[0]?.photo_reference;

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

    fetchDetails();
  }, [placeName, noSpace]);

  return (
    <>
    <Nav/>
    <div className="details-container1">
      <h1 className="page-title1">Details for {placeName}</h1>

      {loading ? (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : error ? (
        <div className="error-message1">{error}</div>
      ) : details ? (
        <div className="details-content1">
          {/* Description */}
          <div className="section1">
            <h2>Description</h2>
            <img src={images[placeName]} alt={placeName} className="place-image1" />
            <p>{details.description}</p>
            
          </div>
          <div className="section1">
            <h2>Estimated Budget</h2>
            <p>Low: ₹{details.estimated_budget.low}</p>
            <p>Mid: ₹{details.estimated_budget.mid}</p>
            <p>High: ₹{details.estimated_budget.high}</p>
          </div>
          <div className="section1">
            <h2>Best Time to Visit</h2>
            <p>{details.best_time_to_visit}</p>
          </div>
          <div className="section1">
            <h2>Places to Visit Around</h2>
            <ul>
              {details.places_to_visit_around.map((place, index) => (
                 <a 
                 href={`https://www.google.com/maps/search/?q=${encodeURIComponent(place)}`}
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ textDecoration: 'none' }}
               ><li key={index}>{place}</li></a>
              ))}
            </ul>
          </div>
          <div className="section1">
            <h2>Transport</h2>
            <p><a 
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(details.transport.railway_station.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  ><b>Railway Station:</b> {details.transport.railway_station.name} ({details.transport.railway_station.distance})</a></p>
            <p><a 
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(details.transport.railway_station.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  ><b>Bus Station:</b> {details.transport.bus_station.name} ({details.transport.bus_station.distance})</a></p>
            <p><a 
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(details.transport.railway_station.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  ><b>Airport:</b> {details.transport.airport.name} ({details.transport.airport.distance})</a></p>
          </div>

          {/* Hotels */}
          <div className="section1">
            <h2>Hotels</h2>
            <div className="hotel-grid1">
              {details.hotels.map((hotel, index) => (
                <div key={index} className="hotel-block1">
                  {/* Link to Google Maps for the hotel location */}
                  <a 
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(hotel.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      src={images[hotel.name]}
                      alt={hotel.name}
                      className="hotel-image1"
                    />
                    <div className="hotel-info1">
                      <h3>{hotel.name}</h3>
                      <p><b>Location:</b> {hotel.location}</p>
                      <p><b>Cost per Night:</b> ₹{hotel.cost_per_night*80}</p>
                      <p><b>Rating:</b> {hotel.rating}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
    <Footer/>
    </>
  );

}

export default DetailsPage;
