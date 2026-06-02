import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import ManagePackages from './pages/ManagePackages';
import AdminHome from './pages/AdminHome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header Navigation */}
        <Header />
        
        {/* Main Routed Page Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage-packages" element={<ManagePackages />} />
            <Route path="/dashboard" element={<AdminHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        {/* Footer Info & Socials */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
