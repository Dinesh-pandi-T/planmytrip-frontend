import React from 'react';
import {
  ShieldCheck, Compass, Award, Globe,
  Heart, Headphones, Star, MapPin, TrendingUp, CheckCircle2,
  Plane, Clock, CreditCard, Smartphone
} from 'lucide-react';
import './About.css';

function About() {
  const team = [
    { name: 'Arjun Patel', role: 'Founder & CEO', avatar: 'AP', desc: '15+ years in travel industry', color: '#2563eb' },
    { name: 'Meera Nair', role: 'Head of Travel Curation', avatar: 'MN', desc: 'Visited 60+ countries', color: '#7c3aed' },
    { name: 'Vikram Rao', role: 'AI & Tech Lead', avatar: 'VR', desc: 'Building smart itineraries', color: '#0891b2' },
    { name: 'Kavya Reddy', role: 'Customer Experience', avatar: 'KR', desc: '24/7 traveler support', color: '#059669' }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', desc: 'PlanMyTrip was born from a vision to make premium travel accessible to everyone.' },
    { year: '2021', title: '1,000 Travelers', desc: 'Crossed our first milestone of 1,000 happy explorers in just 12 months.' },
    { year: '2022', title: 'AI Planner Launch', desc: 'Introduced our AI Smart-Planner, generating itineraries in seconds.' },
    { year: '2023', title: '100+ Destinations', desc: 'Expanded our curated package catalog to cover 100+ global destinations.' },
    { year: '2024', title: '10,000+ Community', desc: 'Our explorer community grew to 10,000+ satisfied travelers globally.' }
  ];

  const features = [
    { icon: Plane, label: 'Instant Booking', desc: 'Confirm your trip in under 60 seconds with our streamlined booking system.', color: '#2563eb', bg: '#eff6ff' },
    { icon: Smartphone, label: 'AI Itinerary Generator', desc: 'Get day-by-day travel plans personalized to your style and budget, instantly.', color: '#7c3aed', bg: '#f5f3ff' },
    { icon: Headphones, label: '24/7 Concierge', desc: 'Our dedicated travel advisors are always on call to handle your queries.', color: '#0891b2', bg: '#ecfeff' },
    { icon: CreditCard, label: 'Flexible Payments', desc: 'Book now, pay later options and EMI-friendly plans for every budget.', color: '#059669', bg: '#f0fdf4' },
    { icon: ShieldCheck, label: 'Fully Insured', desc: 'Every booking comes with travel insurance and cancellation protection.', color: '#f59e0b', bg: '#fffbeb' },
    { icon: Globe, label: '150+ Destinations', desc: 'From Himalayan peaks to Maldivian lagoons — we cover the entire globe.', color: '#ef4444', bg: '#fef2f2' }
  ];

  const testimonials = [
    { name: 'Sanjay Kapoor', city: 'Mumbai', text: 'The entire Maldives trip was flawlessly organized. From airport transfers to snorkeling gear — everything was taken care of. Truly 5-star experience!', rating: 5, avatar: 'SK', tour: 'Maldives Luxury Package' },
    { name: 'Divya Menon', city: 'Bangalore', text: 'The AI planner suggested a hidden temple in Kyoto I never would have found. PlanMyTrip changed how I travel. I\'ll never plan a trip any other way!', rating: 5, avatar: 'DM', tour: 'Kyoto Heritage Trail' },
    { name: 'Rohan Singh', city: 'Delhi', text: 'Booked a Swiss Alps family tour for 6 people — incredibly smooth. The customer support team was incredibly responsive throughout. Highly recommend!', rating: 5, avatar: 'RS', tour: 'Alpine Swiss Valley Tour' }
  ];

  return (
    <div className="about-wrapper animate-fade-in">

      {/* 1. HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <span className="about-badge">🌍 OUR STORY</span>
            <h1 className="about-title">Travel More,<br /><span className="about-title-accent">Stress Less</span></h1>
            <p className="about-subtext">
              PlanMyTrip was born from a simple belief — that every person deserves to explore the world without the headache of complex planning.
              We combine expert curation, AI-powered personalization, and genuine human care to craft travel experiences that last a lifetime.
            </p>
            <div className="about-hero-pills">
              <span>✅ 10,000+ Happy Travelers</span>
              <span>✅ 150+ Destinations</span>
              <span>✅ 4.9★ Average Rating</span>
            </div>
          </div>
          <div className="about-hero-img-col">
            <img
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80"
              alt="Travel Adventure"
              className="about-hero-img"
            />
            <div className="about-hero-overlay-stat">
              <Award size={22} color="#fbbf24" />
              <div>
                <strong>Award Winning</strong>
                <p>Best Travel Platform 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          <div className="about-stat-card">
            <TrendingUp className="about-stat-icon text-blue" />
            <h3>10,000+</h3>
            <p>Happy Explorers</p>
          </div>
          <div className="about-stat-card">
            <MapPin className="about-stat-icon text-orange" />
            <h3>150+</h3>
            <p>Global Destinations</p>
          </div>
          <div className="about-stat-card">
            <Star className="about-stat-icon text-yellow" />
            <h3>4.9 ★</h3>
            <p>Average Rating</p>
          </div>
          <div className="about-stat-card">
            <Clock className="about-stat-icon text-green" />
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
          <div className="about-stat-card">
            <Heart className="about-stat-icon text-red" />
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="about-stat-card">
            <Plane className="about-stat-icon text-indigo" />
            <h3>5,000+</h3>
            <p>Trips Completed</p>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VALUES */}
      <section className="about-mission-section">
        <div className="about-mission-split">
          <div className="mission-text">
            <span className="section-chip">OUR MISSION</span>
            <h2 className="about-section-title">Making the World More Accessible</h2>
            <p>
              We started with a dream — to eliminate the stress and complexity of travel planning so you can focus entirely on the joy of exploration.
              Today, PlanMyTrip serves thousands of explorers across India and around the world, from solo backpackers to luxury family getaways.
            </p>
            <p>
              Our curated packages are vetted by seasoned travel professionals. Our AI tools generate itineraries in seconds. And our support team is just a call away, 24 hours a day.
            </p>
            <div className="mission-checks">
              <span><CheckCircle2 size={16} color="#10b981" /> Expert-crafted itineraries</span>
              <span><CheckCircle2 size={16} color="#10b981" /> Transparent pricing — no hidden fees</span>
              <span><CheckCircle2 size={16} color="#10b981" /> Instant digital booking confirmation</span>
              <span><CheckCircle2 size={16} color="#10b981" /> Flexible cancellation policies</span>
            </div>
          </div>
          <div className="mission-img-col">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80"
              alt="Scenic mountains"
              className="mission-img"
            />
          </div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER */}
      <section className="about-features-section">
        <div className="section-header-centered">
          <span className="section-chip">WHAT WE OFFER</span>
          <h2 className="about-section-title">Everything in One Place</h2>
          <p className="about-desc-light">All the tools, support, and packages you need for a seamless journey</p>
        </div>
        <div className="about-features-grid">
          {features.map((f, i) => (
            <div key={i} className="about-feature-card">
              <div className="about-feature-icon" style={{ background: f.bg }}>
                <f.icon size={24} color={f.color} />
              </div>
              <div>
                <h3>{f.label}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OUR JOURNEY TIMELINE */}
      <section className="about-timeline-section">
        <div className="section-header-centered">
          <span className="section-chip">OUR JOURNEY</span>
          <h2 className="about-section-title">Milestones That Define Us</h2>
        </div>
        <div className="timeline-wrapper">
          {milestones.map((m, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content-box">
                <span className="timeline-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      {/* 6. TEAM */}
      <section className="about-team-section">
        <div className="section-header-centered">
          <span className="section-chip">THE TEAM</span>
          <h2 className="about-section-title">Meet The Explorers Behind It All</h2>
          <p className="about-desc-light">A passionate group of travel lovers, tech innovators, and customer champions</p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}>
                {member.avatar}
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span>{member.role}</span>
                <p>{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="about-testimonials-section">
        <div className="section-header-centered">
          <span className="section-chip">TRAVELER STORIES</span>
          <h2 className="about-section-title">Voices of Our Explorer Community</h2>
        </div>
        <div className="about-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="about-testimonial-card">
              <div className="about-t-stars">
                {[...Array(t.rating)].map((_, si) => <Star key={si} size={14} fill="#fbbf24" stroke="#fbbf24" />)}
              </div>
              <p className="about-t-text">"{t.text}"</p>
              <div className="about-t-tour">
                <Compass size={12} />
                <span>{t.tour}</span>
              </div>
              <div className="about-t-author">
                <div className="about-t-avatar">{t.avatar}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT */}
      <section className="about-contact-section">
        <div className="about-contact-card">
          <div className="contact-left">
            <h2>Ready to Plan Your Next Adventure?</h2>
            <p>Our team of travel experts is available 24/7 to help you craft the perfect trip. Get in touch — we'd love to hear from you!</p>
            <div className="contact-items">
              <div className="contact-item">
                <span>📞</span>
                <div>
                  <strong>Call Us</strong>
                  <p>+91 9873214560</p>
                </div>
              </div>
              <div className="contact-item">
                <span>✉️</span>
                <div>
                  <strong>Email Us</strong>
                  <p>planmytrip45@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <div>
                  <strong>Visit Us</strong>
                  <p>Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <Headphones className="contact-right-icon" />
            <h3>24/7 Support Center</h3>
            <p>Available around the clock for any travel queries, emergencies, or booking changes.</p>
            <div className="contact-badges">
              <span>🌐 Multi-language Support</span>
              <span>⚡ Avg. Response: 2 min</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
