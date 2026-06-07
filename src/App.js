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
import UserHome from './pages/UserHome';
import Packages from './pages/Packages';
import ForgotPassword from './pages/ForgotPassword';
import FAQ from './pages/FAQ';
import './App.css';

function DashboardRouteWrapper() {
  const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (session.role === 'admin') {
    return <AdminHome />;
  }
  return <UserHome />;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/manage-packages" element={<ManagePackages />} />
            <Route path="/dashboard" element={<DashboardRouteWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
