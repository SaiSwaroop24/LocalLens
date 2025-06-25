import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailsPage from "./components/Main/DetailsPage";
import Main from "./components/Main/Main";
import Hotels from "./components/Main/Hotels";
import Trip from "./components/Main/Trip";
import Recommendation from "./components/Main/Recommendation";
import Footer from "./components/Main/Footer";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:placeName" element={<DetailsPage />} />
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path='/trip' element={<Trip/>}/>
        <Route path="/recommendation" element={<Recommendation/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
