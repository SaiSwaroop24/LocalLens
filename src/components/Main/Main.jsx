import React from "react";
import Nav from "./Nav";
import Slideshow from "./Slideshow";
import India from "./India";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Main() {
  const images = [
    "https://images.pexels.com/photos/7850522/pexels-photo-7850522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/14520365/pexels-photo-14520365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18887239/pexels-photo-18887239/free-photo-of-an-arti-ritual.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const navigate=useNavigate(); 
  const handleClick=()=>{
    navigate('/trip');
  }
  return (
       <>
      <Nav />
      <br />
      <div className="App">
        <Slideshow images={images} interval={5000} />
      </div>
      <br />
      <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-success" type="button" onClick={()=>navigate('/hotels')}>
             <b> <i className="fas fa-hotel"></i> Search Hotels</b>
          </button>
        </div>
        <br/>
      <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-success" type="button" onClick={handleClick}>
             <b><i className="fas fa-plane" style={{ marginLeft: '20px', marginRight: '10px', fontSize: '24px' }}></i>Get Specialized Trip Recommendations</b>
          </button>
        </div>
      <India />
      <Footer/>
    </>
  );
}

export default Main;
