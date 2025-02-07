import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InterdimensionalWebPage from "./components/InterdimensionalWebPage/InterdimensionalWebPage.jsx";
import { WebsiteProvider } from "./context/WebsiteContext.jsx";
import "./App.css";
import About from "./About.jsx";

function App() {
  return (
    <WebsiteProvider>
      <Router> {/* Ensure this is the ONLY Router */}
        <div className="full-page">
          {/* Navigation */}
          <header>
            <nav className="nav-bar">
              <Link to="/" className="nav-button">🏠 Home</Link>
              <Link to="/about" className="nav-button">About</Link>
            </nav>
          </header>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/interdimensional-web-page" element={<InterdimensionalWebPage />} />
          </Routes>
        </div>
      </Router>
    </WebsiteProvider>
  );
}

export default App;
