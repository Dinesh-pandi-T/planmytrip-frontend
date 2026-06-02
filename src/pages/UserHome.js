import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Calendar, 
  Award, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Plane, 
  Star,
  Luggage,
  User
} from 'lucide-react';
import './UserHome.css';

function UserHome() {
  const [currentUser, setCurrentUser] = useState({ name: 'Traveler', email: '' });
  const [bookings, setBookings] = useState([]);
  const [aiDestination, setAiDestination] = useState('');
  const [aiDuration, setAiDuration] = useState('3');
  const [aiStyle, setAiStyle] = useState('Adventure');
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');

  const [packagesList, setPackagesList] = useState([]);

  useEffect(() => {
    // Load current user
    const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (session.name) {
      setCurrentUser(session);
    }

    // Load bookings for current user
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const userEmail = session.email || 'guest@example.com';
    const userSpecificBookings = allBookings.filter(b => b.userEmail === userEmail);
    
    // If no bookings, load some defaults so the UI isn't bare
    if (userSpecificBookings.length === 0) {
      const defaultBookings = [
        {
          id: 'def-1',
          title: 'Tropical Bali Island Escape',
          location: 'Bali, Indonesia',
          date: 'July 15, 2026',
          price: '$950',
          status: 'Confirmed',
          userEmail: userEmail
        }
      ];
      setBookings(defaultBookings);
      // Save default bookings
      const updatedAll = [...allBookings, ...defaultBookings];
      localStorage.setItem('userBookings', JSON.stringify(updatedAll));
    } else {
      setBookings(userSpecificBookings);
    }

    // Load dynamic packages from local storage
    const savedPackages = JSON.parse(localStorage.getItem('adminPackages') || '[]');
    if (savedPackages.length === 0) {
      const defaultPackages = [
        {
          id: 'pkg-1',
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
          rawPrice: 12999
        },
        {
          id: 'pkg-2',
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
          tag: 'Eco-Luxury',
          rawPrice: 149999
        }
      ];
      setPackagesList(defaultPackages);
      localStorage.setItem('adminPackages', JSON.stringify(defaultPackages));
    } else {
      setPackagesList(savedPackages);
    }
  }, []);

  const handleBookPackage = (pkg) => {
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    
    // Check if already booked
    const isAlreadyBooked = bookings.some(b => b.title === pkg.title);
    if (isAlreadyBooked) {
      setBookingSuccess(`You've already booked the ${pkg.title}!`);
      setTimeout(() => setBookingSuccess(''), 3000);
      return;
    }

    const newBooking = {
      id: 'book-' + Date.now(),
      title: pkg.title,
      location: pkg.location + ', ' + pkg.location,
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      price: pkg.price,
      status: 'Confirmed',
      userEmail: currentUser.email || 'guest@example.com'
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    // Save to global localStorage bookings
    allBookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(allBookings));

    setBookingSuccess(`Successfully booked ${pkg.title}! Check your itinerary below.`);
    
    // Also dispatch storage event so stats elsewhere could update
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setBookingSuccess('');
    }, 3500);
  };

  const handleCancelBooking = (bookingId) => {
    // Filter out of current state
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);

    // Filter out of global localStorage
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const filteredAll = allBookings.filter(b => b.id !== bookingId);
    localStorage.setItem('userBookings', JSON.stringify(filteredAll));
  };

  const generateItinerary = (e) => {
    e.preventDefault();
    if (!aiDestination) return;

    setIsPlanning(true);
    setGeneratedItinerary(null);

    setTimeout(() => {
      const itineraries = {
        Adventure: [
          { day: 1, title: 'Arrival & Off-Road Wilderness Trek', detail: 'Check-in to Eco-Lodge, meet your expedition guide, and head out on a 4WD wilderness safari trail with scenic canyon ridge walks.' },
          { day: 2, title: 'Waterfall Abseiling & Zip-lining', detail: 'Scale down majestic jungle canyon walls and fly across 5 panoramic zip-lines suspended 150m above the ancient forest floor.' },
          { day: 3, title: 'Sunset Volcano Peak Hike', detail: 'Guided volcanic trail hike. Enjoy hot premium volcanic cider as the sun sets over spectacular sulfur cloud steam valleys.' }
        ],
        Cultural: [
          { day: 1, title: 'Historic Sanctuary & Local Artisan Walk', detail: 'Stroll through UNESCO Heritage shrines, engage in local pottery, and sip ancient blend tea prepared by heritage curators.' },
          { day: 2, title: 'Masterchef Culinary Academy', detail: 'Select fresh organic ingredients from regional farm markets and cook a 4-course authentic heritage lunch with Master chefs.' },
          { day: 3, title: 'Mystical Folklore Music & Lantern Gala', detail: 'Attend a private theater performance under towering red cedar trees, releasing custom hand-painted hot-air silk paper lanterns.' }
        ],
        Luxury: [
          { day: 1, title: 'VIP Skyline Helicopter Tour & Fine Dining', detail: 'Gaze at the breathtaking horizon from a private luxury chopper. Land directly at the signature Michelin star glasshouse pavilion.' },
          { day: 2, title: 'Private Yacht Cruise & Oyster Tasting', detail: 'Charter a 60ft luxury catamaran to secret emerald coves. Swim with reef rays and feast on ocean oysters with sparkling wine.' },
          { day: 3, title: 'Sensory Therapy Spa & Caviar Soiree', detail: 'Indulge in a 3-hour holistic crystal body massage followed by a five-course custom organic caviar and truffle sunset tasting banquet.' }
        ],
        Relaxing: [
          { day: 1, title: 'Garden Bungalow Leisure & Thermal Baths', detail: 'Unpack in botanical villas. Submerge in natural hot springs surrounded by aromatic orchid walls and acoustic harp music.' },
          { day: 2, title: 'Beachside Yoga & Sound Baths', detail: 'Sunrise meditation session led by premium spiritual practitioners, utilizing quartz singing bowls and organic essential oils.' },
          { day: 3, title: 'Open-air Cinema under the Stars', detail: 'Relax in silk hammocks on the white beach sand, enjoying customized tropical fruit mocktails and cinematic classics on giant canvas.' }
        ]
      };

      const selectedPlan = itineraries[aiStyle] || itineraries.Relaxing;
      
      // Scale days based on input
      const daysCount = parseInt(aiDuration) || 3;
      let finalItinerary = [];
      for (let i = 0; i < daysCount; i++) {
        const itemIndex = i % selectedPlan.length;
        const originalDay = selectedPlan[itemIndex];
        finalItinerary.push({
          day: i + 1,
          title: originalDay.title,
          detail: originalDay.detail
        });
      }

      setGeneratedItinerary(finalItinerary);
      setIsPlanning(false);
    }, 1500);
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
              <Award className="stat-icon award-color" />
              <div>
                <h3>Gold Explorer</h3>
                <p>Loyalty Status</p>
              </div>
            </div>
            <div className="stat-item glass">
              <Luggage className="stat-icon tour-color" />
              <div>
                <h3>{bookings.length} Registered</h3>
                <p>Active Journeys</p>
              </div>
            </div>
            <div className="stat-item glass">
              <Compass className="stat-icon points-color" />
              <div>
                <h3>{bookings.length * 150 + 200}</h3>
                <p>Reward Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Toast */}
      {bookingSuccess && (
        <div className="booking-toast animate-fade-in">
          <CheckCircle2 className="toast-icon" />
          <span>{bookingSuccess}</span>
        </div>
      )}

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
                      <span className="status-dot active"></span>
                      <span className="status-label">{booking.status}</span>
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
                      <button 
                        className="cancel-trip-btn"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Curated Tour Packages */}
          <div className="dashboard-section-card glass">
            <h2 className="section-title">
              <Compass className="section-title-icon text-indigo" />
              Tailored Destinations For You
            </h2>
            <p className="section-desc">Exclusive members-only pricing with hand-crafted itineraries.</p>
            
            <div className="recommendations-grid">
              {packagesList.map((pkg) => (
                <div key={pkg.id} className="pkg-glass-card glass">
                  <div 
                    className={`pkg-image-header ${pkg.imageClass || ''}`}
                    style={pkg.image ? { backgroundImage: `url(${pkg.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    <span className="pkg-badge">{pkg.tag}</span>
                  </div>
                  <div className="pkg-body">
                    <div className="pkg-location">
                      <MapPin size={14} className="pin-icon" />
                      <span>{pkg.location}</span>
                      <span className="pkg-rating"><Star size={12} fill="#FBBF24" stroke="#FBBF24" /> {pkg.rating} ({pkg.reviews})</span>
                    </div>
                    <h3 className="pkg-title">{pkg.title}</h3>
                    <p className="pkg-duration">{pkg.duration}</p>
                    <div className="pkg-footer-row">
                      <div className="price-tag">
                        <span className="price-label">Price per traveler</span>
                        <span className="price-val">{pkg.price}</span>
                      </div>
                      <button 
                        className="pkg-book-btn"
                        onClick={() => handleBookPackage(pkg)}
                      >
                        InstaBook
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
          
          <div className="planner-card glass">
            <div className="planner-header">
              <div className="sparkle-circle">
                <Sparkles className="sparkle-icon" />
              </div>
              <div>
                <h2>AI Smart-Planner</h2>
                <p>Generate highly personalized daily itineraries instantly</p>
              </div>
            </div>

            <form onSubmit={generateItinerary} className="planner-form">
              <div className="planner-field">
                <label>Dream Destination</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kyoto, Japan or Amalfi Coast"
                  value={aiDestination}
                  onChange={(e) => setAiDestination(e.target.value)}
                  required
                />
              </div>

              <div className="planner-row-fields">
                <div className="planner-field">
                  <label>Duration</label>
                  <select 
                    value={aiDuration} 
                    onChange={(e) => setAiDuration(e.target.value)}
                  >
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </div>

                <div className="planner-field">
                  <label>Vibe & Style</label>
                  <select 
                    value={aiStyle} 
                    onChange={(e) => setAiStyle(e.target.value)}
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Relaxing">Relaxing</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="generate-itinerary-btn"
                disabled={isPlanning}
              >
                {isPlanning ? (
                  <>
                    <span className="spinner"></span>
                    Crunching local hotspots...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Custom Itinerary
                  </>
                )}
              </button>
            </form>

            {/* Generated Plan Output */}
            {generatedItinerary && (
              <div className="itinerary-output-box animate-fade-in">
                <div className="itinerary-header-row">
                  <h4>✨ Itinerary: {aiDestination} ({aiStyle})</h4>
                  <span>{aiDuration} Days</span>
                </div>

                <div className="itinerary-timeline">
                  {generatedItinerary.map((day) => (
                    <div key={day.day} className="timeline-node">
                      <div className="timeline-badge">Day {day.day}</div>
                      <div className="timeline-content">
                        <h5>{day.title}</h5>
                        <p>{day.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="save-itinerary-btn"
                  onClick={() => {
                    alert(`Saved itinerary for ${aiDestination} successfully!`);
                    setGeneratedItinerary(null);
                    setAiDestination('');
                  }}
                >
                  Save to My Plans
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserHome;
