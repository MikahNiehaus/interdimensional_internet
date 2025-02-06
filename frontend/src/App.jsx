
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./About";
import InterdimensionalWebPage from "./components/InterdimensionalWebPage/InterdimensionalWebPage";
import "./App.css";

function App() {
  return (
    <div className="full-page">
      <header>
        <nav className="nav-bar">
          <Link to="/" className="nav-button">🏠 Home</Link>
          <Link to="/about" className="nav-button">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/interdimensional-web-page" element={<InterdimensionalWebPage />} />
      </Routes>
    </div>
  );
}

export default App;
