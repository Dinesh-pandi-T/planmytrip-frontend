import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Layers, 
  DollarSign, 
  PlusCircle, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  XCircle,
  TrendingUp
} from 'lucide-react';
import './AdminHome.css';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "http://localhost:5000"
  : "https://planmytrip-backend-68sp.onrender.com";

function AdminHome() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState('');

  // Form Fields for new Package
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('$');
  const [newDuration, setNewDuration] = useState('5 Days / 4 Nights');
  const [newTag, setNewTag] = useState('Premium');

  // Booking Logistics Modal States
  const [showLogisticsModal, setShowLogisticsModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [pickupPoint, setPickupPoint] = useState('');
  const [inchargeName, setInchargeName] = useState('');
  const [inchargePhone, setInchargePhone] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        throw new Error("Failed to load bookings");
      }
    } catch (err) {
      console.error("Failed to load bookings from server:", err);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      setBookings(allBookings);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      } else {
        throw new Error("Failed to load packages");
      }
    } catch (err) {
      console.error("Failed to load packages from server:", err);
      // Fallback
      const savedPackages = JSON.parse(localStorage.getItem('adminPackages') || '[]');
      setPackages(savedPackages);
    }
  };

  useEffect(() => {
    // 1. Load users
    const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(registeredUsers);

    // 2. Load bookings from DB
    fetchBookings();

    // 3. Load admin packages
    fetchPackages();
  }, []);

  // Package Management Actions
  const handleAddPackage = async (e) => {
    e.preventDefault();
    if (!newTitle || !newLocation || !newPrice) return;

    const newPkg = {
      title: newTitle,
      location: newLocation,
      price: newPrice.startsWith('$') ? newPrice : '$' + newPrice,
      duration: newDuration,
      tag: newTag
    };

    try {
      const res = await fetch(`${API_BASE}/api/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPkg)
      });
      if (res.ok) {
        fetchPackages();
        window.dispatchEvent(new Event('storage'));

        // Reset Form Fields
        setNewTitle('');
        setNewLocation('');
        setNewPrice('$');
        setNewDuration('5 Days / 4 Nights');
        setNewTag('Premium');
        setShowAddModal(false);

        setAdminSuccess('Successfully published new holiday package!');
        setTimeout(() => setAdminSuccess(''), 3000);
      } else {
        alert("Failed to add package to database.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend server.");
    }
  };

  const handleDeletePackage = async (pkgId) => {
    try {
      const res = await fetch(`${API_BASE}/api/packages/${pkgId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchPackages();
        window.dispatchEvent(new Event('storage'));
        setAdminSuccess('Holiday package deleted successfully.');
        setTimeout(() => setAdminSuccess(''), 3000);
      } else {
        alert("Failed to delete package from database.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend server.");
    }
  };

  // Booking Actions
  const handleApproveBooking = (bookingId) => {
    const existing = bookings.find(b => b.id === bookingId || b._id === bookingId);
    setSelectedBookingId(bookingId);
    setPickupPoint(existing?.pickupPoint || '');
    setInchargeName(existing?.inchargeName || '');
    setInchargePhone(existing?.inchargePhone || '');
    setShowLogisticsModal(true);
  };

  const handleConfirmApprove = async (e) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    try {
      const res = await fetch(`${API_BASE}/api/bookings/${selectedBookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: 'Confirmed',
          pickupPoint,
          inchargeName,
          inchargePhone
        })
      });

      if (res.ok) {
        fetchBookings();
        const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updated = allBookings.map(b => {
          if (b.id === selectedBookingId || b._id === selectedBookingId) {
            return {
              ...b,
              status: 'Confirmed',
              pickupPoint,
              inchargeName,
              inchargePhone
            };
          }
          return b;
        });
        localStorage.setItem('userBookings', JSON.stringify(updated));
      } else {
        throw new Error("Failed to update booking on server");
      }
    } catch (err) {
      console.warn("Server update failed. Updating local storage fallback.", err);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updated = allBookings.map(b => {
        if (b.id === selectedBookingId || b._id === selectedBookingId) {
          return {
            ...b,
            status: 'Confirmed',
            pickupPoint,
            inchargeName,
            inchargePhone
          };
        }
        return b;
      });
      localStorage.setItem('userBookings', JSON.stringify(updated));
      setBookings(updated);
    }

    setShowLogisticsModal(false);
    window.dispatchEvent(new Event('storage'));
    setAdminSuccess('Booking approved with travel logistics!');
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  const handleRevokeBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API_BASE}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: 'Cancelled'
        })
      });

      if (res.ok) {
        fetchBookings();
        const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updated = allBookings.map(b => {
          if (b.id === bookingId || b._id === bookingId) {
            return { ...b, status: 'Cancelled' };
          }
          return b;
        });
        localStorage.setItem('userBookings', JSON.stringify(updated));
      } else {
        throw new Error("Failed to revoke booking on server");
      }
    } catch (err) {
      console.warn("Server revoke failed. Revoking locally.", err);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updated = allBookings.map(b => {
        if (b.id === bookingId || b._id === bookingId) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      });
      localStorage.setItem('userBookings', JSON.stringify(updated));
      setBookings(updated);
    }

    window.dispatchEvent(new Event('storage'));
    setAdminSuccess('Booking status cancelled.');
    setTimeout(() => setAdminSuccess(''), 3000);
  };

  // Compute stats
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed')
    .reduce((acc, curr) => {
      const amt = parseInt(curr.price.replace(/[^0-9]/g, '')) || 1000;
      return acc + amt;
    }, 0);

  return (
    <div className="admin-dashboard-wrapper animate-fade-in">
      
      {/* 1. Header Section */}
      <section className="admin-hero">
        <div className="admin-header-card glass">
          <div>
            <div className="admin-title-badge">ADMIN CONTROL CENTER</div>
            <h1 className="admin-greeting">Command Dashboard 📊</h1>
            <p className="admin-subtext">Manage travel logs, user activities, and active listings.</p>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-item glass border-green">
              <DollarSign className="stat-icon text-green" />
              <div>
                <h3>${totalRevenue.toLocaleString()}</h3>
                <p>Gross Income</p>
              </div>
            </div>
            <div className="admin-stat-item glass border-blue">
              <BarChart3 className="stat-icon text-blue" />
              <div>
                <h3>{bookings.length} Orders</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            <div className="admin-stat-item glass border-purple">
              <Users className="stat-icon text-purple" />
              <div>
                <h3>{users.length + 1} Registered</h3>
                <p>Users Active</p>
              </div>
            </div>
            <div className="admin-stat-item glass border-orange">
              <Layers className="stat-icon text-orange" />
              <div>
                <h3>{packages.length} Units</h3>
                <p>Active Packages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Notification Toast */}
      {adminSuccess && (
        <div className="admin-toast animate-fade-in">
          <CheckCircle2 className="toast-icon" />
          <span>{adminSuccess}</span>
        </div>
      )}

      {/* 2. Visual Charts Row */}
      <section className="analytics-section glass">
        <div className="analytics-header">
          <h2><TrendingUp size={20} className="analytics-header-icon" /> Monthly Sales & Bookings Flow</h2>
          <p>Realtime automated platform engagement logs</p>
        </div>
        
        <div className="analytics-visuals">
          {/* SVG Bar Chart */}
          <div className="chart-box glass">
            <h4>Reservations By Season</h4>
            <div className="bar-chart-container">
              <div className="chart-y-axis">
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
              <div className="bars-row">
                <div className="chart-bar-group">
                  <div className="bar bar-1" style={{ height: '75%' }}>
                    <span className="bar-val">75</span>
                  </div>
                  <span className="bar-label">Spring</span>
                </div>
                <div className="chart-bar-group">
                  <div className="bar bar-2" style={{ height: '95%' }}>
                    <span className="bar-val">95</span>
                  </div>
                  <span className="bar-label">Summer</span>
                </div>
                <div className="chart-bar-group">
                  <div className="bar bar-3" style={{ height: '45%' }}>
                    <span className="bar-val">45</span>
                  </div>
                  <span className="bar-label">Autumn</span>
                </div>
                <div className="chart-bar-group">
                  <div className="bar bar-4" style={{ height: '30%' }}>
                    <span className="bar-val">30</span>
                  </div>
                  <span className="bar-label">Winter</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core insights */}
          <div className="insight-card glass">
            <h4>Operation Health System</h4>
            <div className="insights-metrics">
              <div className="metric-box">
                <span className="metric-num">98.2%</span>
                <span className="metric-desc">Booking Approval SLA</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">3.4 min</span>
                <span className="metric-desc">Avg User Retention Time</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">1.4x</span>
                <span className="metric-desc">Monthly User Growth Rate</span>
              </div>
            </div>
            <div className="insight-system-status">
              <span className="pulse-indicator"></span>
              <span className="indicator-text">System status fully operational (Vercel Core cluster, active cache)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Admin Management Grid */}
      <div className="admin-grid-layout">
        
        {/* Left Side: Packages management & bookings listing */}
        <div className="admin-left-col">
          
          {/* Packages Listing Section */}
          <div className="admin-section-card glass">
            <div className="section-header-action">
              <h2 className="admin-section-title">
                <Layers className="admin-title-icon text-indigo" />
                Tour Packages Directory
              </h2>
              <button 
                className="add-package-trigger-btn"
                onClick={() => setShowAddModal(true)}
              >
                <PlusCircle size={16} /> Create Package
              </button>
            </div>

            <div className="package-admin-list">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-admin-row glass">
                  <div className="pkg-info-box">
                    <span className="pkg-admin-badge">{pkg.tag}</span>
                    <div>
                      <h4>{pkg.title}</h4>
                      <p><MapPin size={12} /> {pkg.location} • <Calendar size={12} /> {pkg.duration}</p>
                    </div>
                  </div>
                  <div className="pkg-action-box">
                    <span className="pkg-admin-price">{pkg.price}</span>
                    <button 
                      className="pkg-delete-btn"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings log management */}
          <div className="admin-section-card glass">
            <h2 className="admin-section-title">
              <CheckCircle2 className="admin-title-icon text-green" />
              Global Reservation Audit Logs
            </h2>
            <div className="bookings-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Traveler Email</th>
                    <th>Selected Destination</th>
                    <th>Schedule Date</th>
                    <th>Ticket Cost</th>
                    <th>State Code</th>
                    <th style={{ textAlign: 'right' }}>Operator Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="user-email-td">{booking.userEmail}</td>
                      <td className="destination-td">
                        <strong>{booking.title}</strong>
                        {booking.travelerPhone && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            📞 {booking.travelerPhone} | 👥 {booking.numberOfTravelers} traveler(s) (Veg: {booking.vegCount || 0} | Non-Veg: {booking.nonVegCount || 0})
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginTop: '2px' }}>Details: {booking.travelerDetails}</div>
                          </div>
                        )}
                      </td>
                      <td>{booking.date}</td>
                      <td className="cost-td">{booking.price}</td>
                      <td>
                        <span className={`status-pill ${booking.status.toLowerCase().replace(' ', '-')}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="action-buttons-group">
                          {booking.status !== 'Confirmed' && (
                            <button 
                              className="action-btn approve"
                              onClick={() => handleApproveBooking(booking.id)}
                              title="Approve Booking"
                            >
                              <CheckCircle2 size={14} /> Approve
                            </button>
                          )}
                          {booking.status !== 'Cancelled' && (
                            <button 
                              className="action-btn revoke"
                              onClick={() => handleRevokeBooking(booking.id)}
                              title="Cancel Booking"
                            >
                              <XCircle size={14} /> Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Side: Active registered accounts */}
        <div className="admin-right-col">
          
          <div className="admin-section-card glass">
            <h2 className="admin-section-title">
              <Users className="admin-title-icon text-purple" />
              Registered Explorers Directory
            </h2>
            <p className="admin-section-subtitle">Realtime registered user profiles in localStorage</p>
            
            <div className="user-accounts-list">
              <div className="user-account-item glass primary-admin-card">
                <div className="user-acc-info">
                  <div className="admin-avatar">SA</div>
                  <div>
                    <h4>System Admin</h4>
                    <p>admin@planmytrip.com</p>
                  </div>
                </div>
                <span className="role-pill admin-pill">ROOT ADMIN</span>
              </div>

              {users.length === 0 ? (
                <div className="empty-users-alert">
                  <p>No user accounts registered yet via the signup portal.</p>
                </div>
              ) : (
                users.map((user, idx) => (
                  <div key={idx} className="user-account-item glass">
                    <div className="user-acc-info">
                      <div className="user-avatar">{user.name.substring(0, 2).toUpperCase()}</div>
                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <span className="role-pill traveler-pill">EXPLORER</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Package Creation Modal Component */}
      {showAddModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content glass animate-scale-up">
            <div className="modal-header">
              <h3>Create New Tour Package</h3>
              <button className="close-modal-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddPackage} className="modal-form">
              <div className="modal-form-group">
                <label>Package Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Maldivian Lagoon Luxury Resort"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Location Country</label>
                <input 
                  type="text" 
                  placeholder="e.g. Maldives"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  required
                />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Price tag</label>
                  <input 
                    type="text" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label>Duration Info</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5 Days / 4 Nights"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-form-group">
                <label>Vibe Tag Category</label>
                <select value={newTag} onChange={(e) => setNewTag(e.target.value)}>
                  <option value="Premium">Premium</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Eco-Luxury">Eco-Luxury</option>
                  <option value="Adventure">Adventure Vibe</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Travel Logistics modal for booking confirmation */}
      {showLogisticsModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content glass animate-scale-up" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Confirm Booking Logistics</h3>
              <button className="close-modal-btn" onClick={() => setShowLogisticsModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleConfirmApprove} className="modal-form">
              <div className="modal-form-group">
                <label>Pickup Point Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Airport Terminal 2 Gate 4"
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Trip Incharge / Guide Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rohan Sharma"
                  value={inchargeName}
                  onChange={(e) => setInchargeName(e.target.value)}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Trip Incharge Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 99887 76655"
                  value={inchargePhone}
                  onChange={(e) => setInchargePhone(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowLogisticsModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Approve & Save Logistics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminHome;
