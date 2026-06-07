import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Compass, Calendar, MapPin, Sparkles, Plane, Luggage, User, Hotel, Coffee } from 'lucide-react';
import './UserHome.css';

function UserHome() {
  const [currentUser, setCurrentUser] = useState({ name: 'Traveler', email: '' });
  const [packagesList, setPackagesList] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter packages based on search query (title or location)
  const filteredPackages = packagesList.filter(pkg => {
    const q = searchQuery.toLowerCase();
    return (
      pkg.title?.toLowerCase().includes(q) ||
      pkg.location?.toLowerCase().includes(q)
    );
  });

  const fetchUserBookings = async (email) => {
    try {
      const res = await fetch(`https://planmytrip-backend-68sp.onrender.com/api/bookings/user/${email}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        throw new Error("Failed to load user bookings");
      }
    } catch (err) {
      console.error("Failed to load bookings from server:", err);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const userSpecificBookings = allBookings.filter(b => b.userEmail === email);
      setBookings(userSpecificBookings);
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (session.name) {
      setCurrentUser(session);
    }

    const userEmail = session.email || 'guest@example.com';
    fetchUserBookings(userEmail);

    const fetchPackagesList = async () => {
      try {
        const res = await fetch("https://planmytrip-backend-68sp.onrender.com/api/packages");
        if (res.ok) {
          const data = await res.json();
          setPackagesList(data);
        } else {
          throw new Error("Failed to load packages");
        }
      } catch (err) {
        console.error("Failed to load packages from server:", err);
        const savedPackages = JSON.parse(localStorage.getItem('adminPackages') || '[]');
        setPackagesList(savedPackages);
      }
    };

    fetchPackagesList();
  }, []);

  const handleBookPackage = (pkg) => {
    window.location.href = `/packages?search=${encodeURIComponent(pkg.title)}`;
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`https://planmytrip-backend-68sp.onrender.com/api/bookings/${bookingId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchUserBookings(currentUser.email || 'guest@example.com');
        const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const filtered = allBookings.filter(b => b.id !== bookingId && b._id !== bookingId);
        localStorage.setItem('userBookings', JSON.stringify(filtered));
      } else {
        throw new Error("Failed to delete booking from backend");
      }
    } catch (err) {
      console.warn("Server cancel failed. Cancelling locally.", err);
      const updatedBookings = bookings.filter(b => b.id !== bookingId && b._id !== bookingId);
      setBookings(updatedBookings);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const filteredAll = allBookings.filter(b => b.id !== bookingId && b._id !== bookingId);
      localStorage.setItem('userBookings', JSON.stringify(filteredAll));
    }
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="user-dashboard-wrapper animate-fade-in">
      
      {/* 1. Header Section */}
      <section className="dashboard-hero">
        <div className="dashboard-header-card glass">
          <div className="user-info-row">
            <div className="user-avatar-badge">
              <User className="avatar-icon" />
            </div>
            <div>
              <p className="welcome-tag">WELCOME BACK, EXPLORER</p>
              <h1 className="user-greeting">{currentUser.name} 🌟</h1>
              <p className="user-subtext">Every journey is a chapter. What will you write next?</p>
            </div>
          </div>

          <div className="user-stats-grid">

            <div className="stat-item glass">
              <Luggage className="stat-icon tour-color" />
              <div>
                <h3>{bookings.length} Registered</h3>
                <p>Active Journeys</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Main Grid Layout */}
      <div className="dashboard-main-grid">
        
        {/* Left Side: Booking Management & Recommendations */}
        <div className="dashboard-left-panel">
          
          {/* Active Bookings */}
          <div className="dashboard-section-card glass">
            <div className="section-header">
              <h2 className="section-title">
                <Plane className="section-title-icon" />
                My Upcoming Adventures
              </h2>
              <span className="booking-counter">{bookings.length} Booked</span>
            </div>

            <div className="bookings-list">
              {bookings.length === 0 ? (
                <div className="empty-bookings">
                  <p>You have no active trip bookings. Start exploring premium packages below!</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="booking-row-card glass">
                    <div className="booking-status-col">
                      <span className={`status-dot ${booking.status === 'Confirmed' ? 'active' : booking.status === 'Cancelled' ? 'cancelled' : 'pending'}`}></span>
                      <span className={`status-label ${booking.status === 'Confirmed' ? 'active' : booking.status === 'Cancelled' ? 'cancelled' : 'pending'}`}>{booking.status}</span>
                    </div>
                    <div className="booking-details-col">
                      <h3>{booking.title}</h3>
                      <div className="booking-meta-row">
                        <span><MapPin size={14} /> {booking.location}</span>
                        <span><Calendar size={14} /> {booking.date}</span>
                      </div>
                    </div>
                    <div className="booking-action-col">
                      <span className="booking-price">{booking.price}</span>
                      {booking.status !== 'Cancelled' && (
                        <button 
                          className="cancel-trip-btn"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Curated Tour Packages */}
          <div className="dashboard-section-card glass">
            <div className="section-header">
              <h2 className="section-title">
                <Compass className="section-title-icon text-indigo" />
                My Packages
              </h2>
              <Link to="/packages" className="view-all-packages-btn">
                Explore All Packages &rarr;
              </Link>
            </div>
            <p className="section-desc">Exclusive members-only pricing with hand-crafted itineraries.</p>
            
            {/* Search bar for packages */}
            <div className="packages-search-bar glass">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Packages Grid */}
            <div className="packages-list-grid">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="pkg-card glass">
                  <div className="pkg-img-box">
                    <img src={pkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} alt={pkg.title} />
                    <span className="pkg-days-badge">{pkg.duration}</span>
                    {pkg.tag && <span className="pkg-vibe-badge">{pkg.tag}</span>}
                  </div>

                  <div className="pkg-content-box">
                    <h3>{pkg.title}</h3>
                    <p className="pkg-location">
                      <MapPin size={14} /> {pkg.location}
                    </p>

                    <div className="pkg-details-row">
                      <p><Hotel size={13} /> {pkg.hotel}</p>
                      <p><Sparkles size={13} /> {pkg.activities} Activities</p>
                      <p><Coffee size={13} /> {pkg.meals}</p>
                      <p><Plane size={13} /> {pkg.transport}</p>
                    </div>

                    <ul className="pkg-highlights-list">
                      {pkg.highlights && pkg.highlights.split(',').map((h, index) => (
                        <li key={index}>{h.trim()}</li>
                      ))}
                    </ul>

                    <div className="pkg-action-footer">
                      <div className="pkg-price-text">
                        {pkg.price}
                      </div>
                      <button
                        onClick={() => handleBookPackage(pkg)}
                        className="pkg-book-btn"
                      >
                        <Plus size={16} /> Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: AI Smart Trip Planner */}
        <div className="dashboard-right-panel">
          
          

        </div>

      </div>

    </div>
  );
}

export default UserHome;
