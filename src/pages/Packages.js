import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Hotel, 
  Sparkles, 
  Coffee, 
  Plane, 
  Star, 
  SlidersHorizontal, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import './Packages.css';

function Packages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(200000); // Max default price
  const [sortBy, setSortBy] = useState('rating'); // rating, price-low-high, price-high-low

  // Notifications
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [loginAlert, setLoginAlert] = useState(false);
  const [selectedPkgForBooking, setSelectedPkgForBooking] = useState(null);

  const fetchPackages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/packages");
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      } else {
        throw new Error("Failed to load packages");
      }
    } catch (err) {
      console.error("Failed to load packages from server:", err);
      // Fallback to localStorage
      const savedPackages = JSON.parse(localStorage.getItem('adminPackages') || '[]');
      if (savedPackages.length > 0) {
        setPackages(savedPackages);
      } else {
        // Ultimate seed fallback matching backend structure
        const defaultPackages = [
          {
            id: 'pkg-seed-1',
            title: 'Goa Beach Tour',
            location: 'Goa, India',
            duration: '5N/6D',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            hotel: '3 Star Hotel',
            activities: 5,
            meals: 'Breakfast + Dinner',
            transport: 'Airport Pickup',
            highlights: 'Beach Photoshoot, Scuba Diving, Sunset Cruise',
            price: '₹12,999',
            tag: 'Best Seller',
            rawPrice: 12999,
            rating: 4.8,
            reviews: 128
          },
          {
            id: 'pkg-seed-2',
            title: 'Alpine Swiss Valley Tour',
            location: 'Switzerland',
            duration: '7N/8D',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            hotel: '5 Star Resort',
            activities: 6,
            meals: 'All Meals',
            transport: 'First Class Train Pass',
            highlights: 'Zermatt Hiking, Glacier Express, Cable Car Tour',
            price: '₹1,49,999',
            tag: 'Adventure',
            rawPrice: 149999,
            rating: 4.95,
            reviews: 95
          },
          {
            id: 'pkg-seed-3',
            title: 'Santorini Sunset Odyssey',
            location: 'Greece',
            duration: '6 Days / 5 Nights',
            image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
            hotel: '4 Star Hotel',
            activities: 4,
            meals: 'Breakfast',
            transport: 'Airport Shuttle',
            highlights: 'Oia Sunset Walk, Volcano Cruise, Wine Tasting',
            price: '$1,299',
            tag: 'Luxury',
            rawPrice: 109000,
            rating: 4.9,
            reviews: 142
          },
          {
            id: 'pkg-seed-4',
            title: 'Kyoto Heritage Trails',
            location: 'Japan',
            duration: '5 Days / 4 Nights',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
            hotel: 'Traditional Ryokan',
            activities: 5,
            meals: 'Breakfast + Dinner',
            transport: 'Bullet Train Ticket',
            highlights: 'Fushimi Inari Shrine, Bamboo Forest Walk, Tea Ceremony',
            price: '$1,420',
            tag: 'Cultural',
            rawPrice: 119000,
            rating: 4.95,
            reviews: 210
          }
        ];
        setPackages(defaultPackages);
      }
    }
  };

  useEffect(() => {
    fetchPackages();
    const session = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(session);
    const params = new URLSearchParams(window.location.search);
    const searchVal = params.get('search');
    if (searchVal) {
      setSearchQuery(searchVal);
    }
  }, []);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutTravelers, setCheckoutTravelers] = useState(1);
  const [checkoutDetails, setCheckoutDetails] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  const handleBookClick = (pkg) => {
    if (!currentUser) {
      setSelectedPkgForBooking(pkg);
      setLoginAlert(true);
      return;
    }

    setSelectedPkgForBooking(pkg);
    setCheckoutPhone('');
    setCheckoutTravelers(1);
    setCheckoutDetails('');
    const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const dateStr = futureDate.toISOString().split('T')[0];
    setCheckoutDate(dateStr);
    setShowCheckoutModal(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedPkgForBooking) return;

    const userEmail = currentUser.email || 'guest@example.com';
    const userName = currentUser.name || 'Traveler';

    const formattedDate = new Date(checkoutDate).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });

    const bookingPayload = {
      userEmail,
      userName,
      packageId: selectedPkgForBooking.id || selectedPkgForBooking._id || 'pkg-default',
      title: selectedPkgForBooking.title,
      location: selectedPkgForBooking.location,
      price: selectedPkgForBooking.price,
      date: formattedDate,
      travelerPhone: checkoutPhone,
      numberOfTravelers: Number(checkoutTravelers),
      travelerDetails: checkoutDetails
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });

      if (res.ok) {
        const result = await res.json();
        const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        allBookings.push(result.data || bookingPayload);
        localStorage.setItem('userBookings', JSON.stringify(allBookings));
      } else {
        throw new Error("Failed to save booking in backend DB");
      }
    } catch (err) {
      console.warn("Server booking failed. Saving locally to localStorage.", err);
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const fallbackBooking = {
        id: 'book-' + Date.now(),
        ...bookingPayload,
        status: 'Pending Approval',
        pickupPoint: "",
        inchargeName: "",
        inchargePhone: ""
      };
      allBookings.push(fallbackBooking);
      localStorage.setItem('userBookings', JSON.stringify(allBookings));
    }

    setShowCheckoutModal(false);
    window.dispatchEvent(new Event('storage'));

    setBookingSuccess(`Congratulations! Your booking for ${selectedPkgForBooking.title} is registered. View it in your Dashboard.`);
    setTimeout(() => {
      setBookingSuccess('');
    }, 4500);
  };

  const handleLoginRedirect = () => {
    setLoginAlert(false);
    navigate('/login');
  };

  // Categories list
  const categories = ['All', 'Best Seller', 'Adventure', 'Cultural', 'Luxury', 'Eco-Luxury'];

  // Filter and sort computation
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      pkg.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.highlights?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      pkg.tag?.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Adventure' && pkg.title?.toLowerCase().includes('trek')) ||
      (selectedCategory === 'Luxury' && pkg.hotel?.toLowerCase().includes('5 star'));

    const matchesPrice = (pkg.rawPrice || 15000) <= priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'price-low-high') {
      return (a.rawPrice || 0) - (b.rawPrice || 0);
    }
    if (sortBy === 'price-high-low') {
      return (b.rawPrice || 0) - (a.rawPrice || 0);
    }
    return 0;
  });

  return (
    <div className="packages-page-container animate-fade-in">
      
      {/* 1. Page Header */}
      <section className="packages-hero-section">
        <div className="packages-hero-card glass">
          <div className="badge-pill">OUR EXCLUSIVE TOURS</div>
          <h1>Explore Premium Holiday Packages ✈️</h1>
          <p>Hand-picked journeys with full flights, boutique stays, daily meals, and guided tours.</p>
        </div>
      </section>

      {/* Booking Success Toast */}
      {bookingSuccess && (
        <div className="booking-success-toast animate-fade-in">
          <CheckCircle2 className="toast-success-icon" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Login Requirement Modal */}
      {loginAlert && (
        <div className="login-modal-overlay animate-fade-in">
          <div className="login-modal-card glass animate-scale-up">
            <AlertCircle className="login-modal-icon" />
            <h3>Sign-in Required</h3>
            <p>You need to have an active Explorer account to reserve holiday packages. Would you like to sign in now?</p>
            <div className="login-modal-actions">
              <button className="btn-cancel" onClick={() => setLoginAlert(false)}>Maybe Later</button>
              <button className="btn-confirm" onClick={handleLoginRedirect}>Sign In / Register</button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Traveler Details Modal */}
      {showCheckoutModal && selectedPkgForBooking && (
        <div className="login-modal-overlay animate-fade-in">
          <div className="login-modal-card glass animate-scale-up" style={{ maxWidth: '500px', width: '90%', padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>Complete Your Booking ✈️</h3>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'var(--bg-glass)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selected Tour</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{selectedPkgForBooking.title}</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{selectedPkgForBooking.price} / Traveler</span>
            </div>

            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500', textAlign: 'left' }}>Traveler Contact Phone</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 98765 43210" 
                  value={checkoutPhone} 
                  onChange={(e) => setCheckoutPhone(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500', textAlign: 'left' }}>Travelers Count</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={checkoutTravelers} 
                    onChange={(e) => setCheckoutTravelers(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500', textAlign: 'left' }}>Departure Date</label>
                  <input 
                    type="date" 
                    value={checkoutDate} 
                    onChange={(e) => setCheckoutDate(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', color: 'var(--text-main)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500', textAlign: 'left' }}>Passenger Details (Names & Ages)</label>
                <textarea 
                  placeholder="e.g. John Doe (28), Jane Doe (26)" 
                  value={checkoutDetails} 
                  onChange={(e) => setCheckoutDetails(e.target.value)} 
                  required 
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', color: 'var(--text-main)', outline: 'none', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowCheckoutModal(false)} 
                  className="btn-cancel"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-confirm"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Search & Filters Layout */}
      <div className="packages-explorer-layout">
        
        {/* Left Side: Interactive Sidebar Filters */}
        <aside className="filters-sidebar-card glass">
          <div className="sidebar-header">
            <h3><SlidersHorizontal size={18} /> Filters & Sort</h3>
          </div>

          <div className="filter-group">
            <label>Price Range (Max Price)</label>
            <div className="slider-container">
              <input 
                type="range" 
                min="10000" 
                max="200000" 
                step="5000"
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))} 
                className="price-slider"
              />
              <div className="slider-vals">
                <span>₹10K</span>
                <strong>₹{priceRange.toLocaleString('en-IN')}</strong>
                <span>₹2L+</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="price-low-high">Price: Low to High 📈</option>
              <option value="price-high-low">Price: High to Low 📉</option>
            </select>
          </div>

          <div className="sidebar-decor-card">
            <h4>Support Hub 24/7</h4>
            <p>Our dedicated travel concierges are standing by to guide your bookings.</p>
          </div>
        </aside>

        {/* Right Side: Search and Package Catalog Grid */}
        <main className="packages-catalog-section">
          
          {/* Search bar & Tabs */}
          <div className="catalog-controls-card glass">
            <div className="search-bar-row">
              <Search className="search-bar-icon" />
              <input 
                type="text" 
                placeholder="Search packages by title, location, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="category-tabs-container">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Package Cards Catalog */}
          <div className="catalog-grid">
            {filteredPackages.length === 0 ? (
              <div className="empty-catalog-message glass">
                <p>No holiday packages match your filters. Try adjusting your search query or price sliders!</p>
                <button 
                  className="reset-filters-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange(200000);
                  }}
                >
                  Reset Explorer Filters
                </button>
              </div>
            ) : (
              filteredPackages.map((pkg) => (
                <div key={pkg.id || pkg._id} className="catalog-pkg-card glass">
                  
                  {/* Card Image Header */}
                  <div className="pkg-image-header">
                    <img 
                      src={pkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'} 
                      alt={pkg.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e';
                      }}
                    />
                    <span className="pkg-duration-badge">{pkg.duration}</span>
                    {pkg.tag && <span className="pkg-tag-badge">{pkg.tag}</span>}
                  </div>

                  {/* Card Details Body */}
                  <div className="pkg-card-body">
                    <div className="pkg-top-meta">
                      <span className="pkg-loc-text">
                        <MapPin size={14} className="icon-pink" /> {pkg.location}
                      </span>
                      <span className="pkg-rating-text">
                        <Star size={14} fill="#f59e0b" stroke="#f59e0b" /> 
                        <strong>{pkg.rating || '4.8'}</strong> 
                        <span>({pkg.reviews || '45'})</span>
                      </span>
                    </div>

                    <h3 className="pkg-title-text">{pkg.title}</h3>

                    {/* Specifications table grid */}
                    <div className="pkg-specs-grid">
                      <div className="spec-cell">
                        <Hotel size={13} /> <span>{pkg.hotel}</span>
                      </div>
                      <div className="spec-cell">
                        <Sparkles size={13} /> <span>{pkg.activities} Activities</span>
                      </div>
                      <div className="spec-cell">
                        <Coffee size={13} /> <span>{pkg.meals}</span>
                      </div>
                      <div className="spec-cell">
                        <Plane size={13} /> <span>{pkg.transport}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights List */}
                    <ul className="pkg-highlights-bullets">
                      {pkg.highlights && pkg.highlights.split(',').map((h, i) => (
                        <li key={i}>{h.trim()}</li>
                      ))}
                    </ul>

                    {/* Booking price and CTA */}
                    <div className="pkg-card-footer">
                      <div className="pkg-price-box">
                        <span className="price-label">Price per Traveler</span>
                        <span className="price-value">{pkg.price}</span>
                      </div>
                      <button 
                        className="book-now-cta-btn"
                        onClick={() => handleBookClick(pkg)}
                      >
                        Book Package
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

        </main>

      </div>

    </div>
  );
}

export default Packages;
