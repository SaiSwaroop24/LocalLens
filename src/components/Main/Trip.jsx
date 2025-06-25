import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function Trip() {
  const [formData, setFormData] = useState({
    experience: "",
    activityPreferences: [],
    companions: "",
    duration: "",
    travelDates: { start: "", end: "" },
    flexibleDates: false,
    budget: "",
    region: "",
    accommodation: "",
    climate: "",
    transport: "",
    fitnessLevel: "",
  });

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      activityPreferences: checked
        ? [...prev.activityPreferences, value]
        : prev.activityPreferences.filter((item) => item !== value),
    }));
  };

  // Handle other input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "date"
          ? { ...prev.travelDates, [e.target.id]: value }
          : value,
    }));
  };
   
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/recommendation',{state:formData})
    alert("Trip preferences submitted! Check the console for details.");
  };

  return (
    <>
    <Nav/>
    <div style={styles.container}>
      <h1 style={styles.heading}>Fill The Details for Special Trip Recommendation</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Experience */}
        <label>Type of Experience</label>
        <select name="experience" onChange={handleChange} style={styles.input} required> 
          <option value="">Select</option>
          <option value="Adventure">Adventure</option>
          <option value="Relaxation">Relaxation</option>
          <option value="Cultural">Cultural</option>
          <option value="Nature">Nature</option>
          <option value="Luxury">Luxury</option>
          <option value="Budget-Friendly">Budget-Friendly</option>
        </select>

        {/* Activity Preferences */}
        <label>Activity Preferences</label>
        <div style={styles.checkboxGroup}>
          {["Trekking", "Water Sports", "Cultural Tours", "Nightlife", "Safari", "Beaches"].map(
            (activity) => (
              <label key={activity} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={activity}
                  onChange={handleCheckboxChange}

                />
                {activity}
              </label>
            )
          )}
        </div>

        {/* Companions */}
        <label>Travel Companions</label>
        <select name="companions" onChange={handleChange} style={styles.input} required>
          <option value="">Select</option>
          <option value="Solo">Solo</option>
          <option value="Couple">Couple</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Business">Business</option>
        </select>

        {/* Duration */}
        <label>Trip Duration</label>
        <select name="duration" onChange={handleChange} style={styles.input} required>
          <option value="">Select</option>
          <option value="Weekend">Weekend (2-3 Days)</option>
          <option value="Short Trip">Short Trip (4-7 Days)</option>
          <option value="Extended Trip">Extended Trip (8+ Days)</option>
        </select>

        {/* Travel Dates */}
        <label>Travel Dates</label>
        <div>
          <input
            type="date"
            id="start"
            name="travelDates"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="date"
            id="end"
            name="travelDates"
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Budget */}
        <label>Budget</label>
        <select name="budget" onChange={handleChange} style={styles.input} required>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Accommodation */}
        <label>Preferred Accommodation</label>
        <select name="accommodation" onChange={handleChange} style={styles.input} required>
          <option value="">Select</option>
          <option value="Budget Hotels">Budget Hotels</option>
          <option value="Luxury Resorts">Luxury Resorts</option>
          <option value="Camping">Camping</option>
          <option value="Home Stays">Home Stays</option>
        </select>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Get My Trip Recommendation
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

// Inline CSS Styles
const styles = {
  container: { maxWidth: "600px", margin: "auto", padding: "20px",marginTop:"0px" },
  heading: { textAlign: "center", color: "#4CAF50",fontSize:"30px"},
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px" },
  checkboxGroup: { display: "flex", flexWrap: "wrap", gap: "10px" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "5px" },
  textarea: { padding: "10px", fontSize: "16px", borderRadius: "5px" },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Trip;
