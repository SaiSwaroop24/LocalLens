import React from "react";

const Footer = () => {
  const footerStyles = {
    backgroundColor: "#198754",
    color: "rgb(249, 249, 249)",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const containerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "100%",
    margin: "0 0",
  };

  const sectionStyles = {
    flex: "1",
    minWidth: "250px",
    margin: "20px 10px",
  };

  const headingStyles = {
    marginBottom: "15px",
    fontSize: "20px",
    borderBottom: "2px solid rgb(216, 166, 66)",
    display: "inline-block",
    paddingBottom: "5px",
  };

  const paragraphStyles = {
    lineHeight: "1.6",
    fontSize: "14px",
    margin: "0 0 10px",
  };

  const linkListStyles = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const linkStyles = {
    color: "rgb(18, 20, 18)",
    textDecoration: "none",
  };

  const linkHoverStyles = {
    textDecoration: "underline",
  };

  const socialIconsStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  };

  const iconStyles = {
    color: "#ffffff",
    fontSize: "20px",
    transition: "color 0.3s ease",
  };

  const bottomStyles = {
    marginTop: "20px",
    borderTop: "1px solid #555",
    paddingTop: "10px",
    fontSize: "14px",
  };

  return (
    <footer id="footer" style={footerStyles}>
      <div style={containerStyles}>
        <div style={sectionStyles}>
          <h3 style={headingStyles}>About Us</h3>
          <p style={paragraphStyles}>
          Discover India's top destinations with us! We offer curated travel experiences, including hotel options, budget-friendly stays, nearby places to explore, and a smart hotel search by city name. Let our AI-powered trip recommendations craft your perfect getaway effortlessly.
          </p>
        </div>
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Quick Links</h3>
          <ul style={linkListStyles}>
            <li>
              <a href="/" style={linkStyles} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")}>
                Home
              </a>
            </li>
            <li>
              <a href="/hotels" style={linkStyles} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")}>
                Search Hotels
              </a>
            </li>
            <li>
              <a href="/trip" style={linkStyles} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")}>
                Trip Recommendation
              </a>
            </li>
            <li>
            </li>
          </ul>
        </div>
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Follow Us</h3>
          <div style={socialIconsStyles}>
            <a href="https://facebook.com" style={iconStyles}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" style={iconStyles}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" style={iconStyles}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" style={iconStyles}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div style={bottomStyles}>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
