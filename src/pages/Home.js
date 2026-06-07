import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Star, MapPin, Clock, Users, Shield, Sparkles, Phone, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import './Home.css';

function Home() {
  const [role, setRole] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setRole(session.role || null);

    const syncSession = () => {
      const updatedSession = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setRole(updatedSession.role || null);
    };

    window.addEventListener('storage', syncSession);
    return () => window.removeEventListener('storage', syncSession);
  }, []);



  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: `${process.env.PUBLIC_URL}/images/santorini.png`,
      price: '₹89,999',
      duration: '6 Days',
      rating: 4.9,
      reviews: 142,
      tag: 'Best Seller',
      tagColor: '#f59e0b'
    },
    {
      id: 2,
      name: 'Maldives Paradise',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      price: '₹1,20,000',
      duration: '5 Days',
      rating: 4.8,
      reviews: 98,
      tag: 'Luxury',
      tagColor: '#8b5cf6'
    },
    {
      id: 3,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      price: '₹95,000',
      duration: '7 Days',
      rating: 4.95,
      reviews: 210,
      tag: 'Cultural',
      tagColor: '#ef4444'
    },
    {
      id: 4,
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      price: '₹1,40,000',
      duration: '8 Days',
      rating: 4.85,
      reviews: 76,
      tag: 'Adventure',
      tagColor: '#10b981'
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      price: '₹65,000',
      duration: '6 Days',
      rating: 4.7,
      reviews: 325,
      tag: 'Popular',
      tagColor: '#0ea5e9'
    },
    {
      id: 6,
      name: 'Rajasthan, India',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
      price: '₹28,999',
      duration: '5 Days',
      rating: 4.8,
      reviews: 187,
      tag: 'Heritage',
      tagColor: '#f97316'
    }
  ];

  const categories = ['All', 'Beach', 'Mountain', 'Cultural', 'Adventure', 'Luxury'];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Solo Traveler',
      text: 'PlanMyTrip made our Bali vacation absolutely seamless. The AI planner suggested activities we never would have found on our own!',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Rahul Menon',
      role: 'Family Traveler',
      text: 'Booked a Rajasthan heritage tour for the whole family. Incredible value, everything was on-point. Will definitely use again!',
      rating: 5,
      avatar: 'RM'
    },
    {
      name: 'Ananya Iyer',
      role: 'Adventure Seeker',
      text: 'The Swiss Alps package was beyond expectations. From glacier hikes to cable cars — every detail was curated perfectly.',
      rating: 5,
      avatar: 'AI'
    }
  ];

  return (
    <div className="home-container animate-fade-in">

      {/* 1. Hero Banner */}
      <section className="hero-section">
        <div className="hero-banner">
          <div className="hero-bg-overlay"></div>
          <div className="hero-content">
            <span className="hero-chip">🌍 Trusted by 10,000+ Travelers</span>
            <h1 className="hero-title">Discover The World,<br /><span className="hero-title-accent">Your Way</span></h1>
            <p className="hero-subtitle">
              Smart AI-powered trip planning, hand-picked premium packages, and seamless booking — 
              all in one place. Your perfect adventure starts here.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="hero-btn-primary">
                Start Planning <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="hero-btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <strong>10K+</strong><span>Happy Travelers</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <strong>150+</strong><span>Destinations</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <strong>4.9★</strong><span>Avg Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-image-col">
            <img
              src={`${process.env.PUBLIC_URL}/images/santorini.png`}
              alt="Santorini"
              className="hero-float-img"
            />
            <div className="hero-float-card card-1">
              <span>✈️</span>
              <div>
                <strong>Instant Booking</strong>
                <p>Confirm in seconds</p>
              </div>
            </div>
            <div className="hero-float-card card-2">
              <span>⭐</span>
              <div>
                <strong>4.9 Rating</strong>
                <p>10K+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Offer Cards */}
      <section className="offers-section">
        <div className="section-header-row">
          <div>
            <span className="section-chip">EXCLUSIVE DEALS</span>
            <h2 className="section-title-main">Seasonal Offers</h2>
          </div>
        </div>
        <div className="offers-grid">
          <div className="offer-card hill-card">
            <div className="offer-image-container">
              <img
                src={`${process.env.PUBLIC_URL}/images/hill-station.png`}
                alt="Hill Station Escapes"
                className="offer-bg-img"
              />
              <div className="offer-gradient-overlay"></div>
            </div>
            <div className="offer-content">
              <div className="offer-header-row">
                <span className="badge hill-badge">TAKE A HILL PILL</span>
                <span className="badge offer-badge">OFFERS</span>
              </div>
              <div className="offer-middle">
                <p className="offer-tagline">ESCAPE TO THE HILLS:</p>
                <h2 className="offer-main-title">Grab Up to 40% OFF*</h2>
              </div>
              <p className="offer-subtext">on buses, cabs, trains, holiday packages, stays and flights</p>
            </div>
          </div>

          <div className="offer-card beach-card">
            <div className="offer-image-container">
              <img
                src={`${process.env.PUBLIC_URL}/images/beach-paradise.png`}
                alt="Beach Paradise Escapes"
                className="offer-bg-img"
              />
              <div className="offer-gradient-overlay"></div>
            </div>
            <div className="offer-content">
              <div className="offer-header-row">
                <span className="badge beach-badge">TMH &amp; HILL PILL</span>
                <span className="badge offer-badge text-yellow">OFFER!</span>
              </div>
              <div className="offer-middle">
                <p className="offer-tagline">EXPLORE PARADISE:</p>
                <h2 className="offer-main-title">Grab Up to 40% OFF</h2>
              </div>
              <p className="offer-subtext">On beaches, villas, holiday packages, stays and flights</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trending Destinations */}
      <section className="destinations-section">
        <div className="section-header-row">
          <div>
            <span className="section-chip">✨ TRENDING NOW</span>
            <h2 className="section-title-main">Top Destinations</h2>
            <p className="section-desc">Explore our most-loved destinations, hand-picked by travel experts</p>
          </div>
        </div>
        <div className="categories-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="destinations-grid">
          {destinations.map(dest => (
            <div key={dest.id} className="dest-card">
              <div className="dest-img-wrapper">
                <img src={dest.image} alt={dest.name} className="dest-img" />
                <span className="dest-tag" style={{ background: dest.tagColor }}>{dest.tag}</span>
              </div>
              <div className="dest-body">
                <div className="dest-meta-row">
                  <span className="dest-location"><MapPin size={12} /> {dest.name}</span>
                  <span className="dest-rating"><Star size={11} fill="#fbbf24" stroke="#fbbf24" /> {dest.rating} ({dest.reviews})</span>
                </div>
                <div className="dest-details-row">
                  <span><Clock size={12} /> {dest.duration}</span>
                </div>
                <div className="dest-footer">
                  <div className="dest-price">
                    <span className="dest-price-label">From</span>
                    <span className="dest-price-val">{dest.price}</span>
                  </div>
                  <Link to="/login" className="dest-book-btn">
                    Book Now <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="why-us-section">
        <div className="section-header-row centered">
          <span className="section-chip">OUR EDGE</span>
          <h2 className="section-title-main">Why PlanMyTrip?</h2>
          <p className="section-desc">Everything you need for the perfect vacation, all under one roof</p>
        </div>
        <div className="why-us-grid">
          <div className="why-card">
            <div className="why-icon bg-blue"><Sparkles className="w-icon text-blue" /></div>
            <h3>AI Smart Planner</h3>
            <p>Generate personalized day-by-day itineraries instantly, customized to your travel style and budget.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-green"><Shield className="w-icon text-green" /></div>
            <h3>100% Secure Booking</h3>
            <p>All bookings are protected with digital audit trails and reliable cancellation policies.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-indigo"><Globe className="w-icon text-indigo" /></div>
            <h3>150+ Destinations</h3>
            <p>From Himalayan treks to European getaways — explore a curated world of possibilities.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-orange"><Users className="w-icon text-orange" /></div>
            <h3>Expert Support 24/7</h3>
            <p>Our dedicated travel concierge team is always on standby to assist you at every step.</p>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="testimonials-section">
        <div className="section-header-row centered">
          <span className="section-chip">REVIEWS</span>
          <h2 className="section-title-main">Traveler Stories</h2>
          <p className="section-desc">Hear from real explorers who have journeyed with us</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={14} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Newsletter CTA */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <span>📧</span>
            <div>
              <h2>Get Exclusive Travel Deals</h2>
              <p>Subscribe to our newsletter and be the first to get seasonal offers, flash deals, and curated travel guides straight to your inbox.</p>
            </div>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
            <button className="newsletter-btn">
              <Phone size={15} /> Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
