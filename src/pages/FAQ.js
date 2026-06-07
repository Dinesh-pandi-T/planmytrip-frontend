import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const faqs = [
  {
    category: 'Booking & Payments',
    icon: '💳',
    items: [
      {
        q: 'How do I book a trip package?',
        a: 'Simply create an account or log in, browse the available packages on your dashboard, and click "InstaBook" on any package you like. Your booking will be confirmed instantly with a confirmation on screen.'
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, RuPay), UPI payments (Google Pay, PhonePe, Paytm), net banking, and EMI options for orders above ₹5,000.'
      },
      {
        q: 'Can I book for multiple travelers?',
        a: 'Yes! During the booking process you can specify the number of travelers. All prices shown are per person unless explicitly stated. Group discounts are automatically applied for bookings of 5 or more travelers.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All payment transactions are encrypted using AES-256 and processed through certified PCI-DSS compliant payment gateways. We never store your card details on our servers.'
      }
    ]
  },
  {
    category: 'Cancellations & Refunds',
    icon: '↩️',
    items: [
      {
        q: 'What is the cancellation policy?',
        a: 'You can cancel any booking up to 72 hours before the departure date for a full refund. Cancellations between 24–72 hours before departure receive a 50% refund. Cancellations within 24 hours are non-refundable unless the trip is cancelled by us.'
      },
      {
        q: 'How long does a refund take?',
        a: 'Refunds are processed within 5–7 business days to your original payment method. For bank transfers and UPI, it typically takes 2–3 business days. You will receive an email confirmation once your refund is initiated.'
      },
      {
        q: 'Can I reschedule my trip instead of cancelling?',
        a: 'Yes! Rescheduling is free of charge up to 48 hours before the trip. Simply contact our support team via email or phone, and we will adjust your travel dates based on availability — no penalty fees apply.'
      }
    ]
  },
  {
    category: 'Packages & Itineraries',
    icon: '🗺️',
    items: [
      {
        q: 'Are meals included in the packages?',
        a: 'It depends on the specific package. Each package clearly lists what is included — some include Breakfast only, others include Breakfast + Dinner or All Meals. Detailed inclusions are shown on each package card.'
      },
      {
        q: 'Can I customize a package?',
        a: 'Yes! We offer custom trip planning for groups. Contact our concierge team at planmytrip45@gmail.com with your preferences — destination, duration, budget, and group size — and we will craft a tailored itinerary just for you.'
      },
      {
        q: 'What does the AI Smart Planner do?',
        a: 'Our AI Smart Planner generates a personalized day-by-day itinerary based on your chosen destination, travel style (Adventure, Cultural, Luxury, or Relaxing), and trip duration. It is a great tool to get inspired before you book a package.'
      },
      {
        q: 'Are flights included in the packages?',
        a: 'International packages include flight connectivity details and airport transfers but may not include the actual flight ticket cost unless specified. Domestic packages typically include transport within the destination (cab, train, etc.).'
      }
    ]
  },
  {
    category: 'Account & Profile',
    icon: '👤',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" on the navigation bar, enter your full name, email, and a strong password. Once registered, you will be automatically logged in and can start exploring packages right away.'
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'Click the "Forgot Password?" link on the login page. Enter your registered email address, and we will send a 6-digit OTP to verify your identity. After verification, you can set a new password instantly.'
      },
      {
        q: 'Can I change my email address or name?',
        a: 'Profile editing is coming soon! For now, please contact our support team at planmytrip45@gmail.com with your request and we will update your account details within 24 hours.'
      }
    ]
  },
  {
    category: 'Support & Contact',
    icon: '🎧',
    items: [
      {
        q: 'How can I reach customer support?',
        a: 'You can reach us via email at planmytrip45@gmail.com or call us at +91 9873214560 (Mon–Sat, 9 AM – 7 PM IST). We also respond to messages on our Instagram and LinkedIn pages within 24 hours.'
      },
      {
        q: 'What if my trip experience was unsatisfactory?',
        a: 'We take customer satisfaction very seriously. Please send a detailed complaint to planmytrip45@gmail.com within 7 days of your trip. Our team will review your case and offer a resolution within 48 hours, which may include a partial refund or voucher.'
      },
      {
        q: 'Do you offer travel insurance?',
        a: 'We partner with leading travel insurance providers. You can opt-in for comprehensive travel insurance during checkout. It covers medical emergencies, trip cancellation due to unforeseen events, baggage loss, and flight delays.'
      }
    ]
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // "catIdx-itemIdx"
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toggle = (key) => {
    setOpenIndex(prev => (prev === key ? null : key));
  };

  const filteredFaqs = faqs
    .filter(cat => activeCategory === 'All' || cat.category === activeCategory)
    .map(cat => ({
      ...cat,
      items: cat.items.filter(
        item =>
          searchQuery === '' ||
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => cat.items.length > 0);

  const totalResults = filteredFaqs.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="faq-wrapper animate-fade-in">

      {/* ─── Hero Banner ─── */}
      <section className="faq-hero">
        <div className="faq-hero-bg" />
        <div className="faq-hero-content">
          <div className="faq-hero-chip">HELP CENTER</div>
          <h1 className="faq-hero-title">Frequently Asked<br /><span className="faq-hero-accent">Questions</span></h1>
          <p className="faq-hero-sub">Everything you need to know about PlanMyTrip. Can't find the answer? Reach out to our support team.</p>

          {/* Search */}
          <div className="faq-search-bar">
            <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="faq-search-input"
              id="faq-search"
            />
            {searchQuery && (
              <button className="faq-search-clear" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="faq-hero-stats">
          <div className="faq-stat-card">
            <span className="faq-stat-num">{faqs.reduce((s, c) => s + c.items.length, 0)}+</span>
            <span className="faq-stat-label">Questions Answered</span>
          </div>
          <div className="faq-stat-card">
            <span className="faq-stat-num">{faqs.length}</span>
            <span className="faq-stat-label">Categories</span>
          </div>
          <div className="faq-stat-card">
            <span className="faq-stat-num">24h</span>
            <span className="faq-stat-label">Support Response</span>
          </div>
        </div>
      </section>

      {/* ─── Category Tabs ─── */}
      <section className="faq-body">
        <div className="faq-tabs">
          <button
            className={`faq-tab ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >All Topics</button>
          {faqs.map(cat => (
            <button
              key={cat.category}
              className={`faq-tab ${activeCategory === cat.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.category)}
            >
              <span>{cat.icon}</span> {cat.category}
            </button>
          ))}
        </div>

        {/* Search result count */}
        {searchQuery && (
          <div className="faq-result-count">
            Showing <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for "<em>{searchQuery}</em>"
          </div>
        )}

        {/* ─── FAQ Accordion ─── */}
        {filteredFaqs.length === 0 ? (
          <div className="faq-empty">
            <div className="faq-empty-icon">🔍</div>
            <h3>No results found</h3>
            <p>Try different keywords or browse by category above.</p>
          </div>
        ) : (
          <div className="faq-sections">
            {filteredFaqs.map((cat, catIdx) => (
              <div key={catIdx} className="faq-section">
                <div className="faq-section-header">
                  <span className="faq-section-emoji">{cat.icon}</span>
                  <h2 className="faq-section-title">{cat.category}</h2>
                  <span className="faq-section-count">{cat.items.length}</span>
                </div>

                <div className="faq-items">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = openIndex === key;
                    return (
                      <div
                        key={itemIdx}
                        className={`faq-item ${isOpen ? 'open' : ''}`}
                        id={`faq-${key}`}
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggle(key)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-q-text">{item.q}</span>
                          <span className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>
                        <div className={`faq-answer-wrap ${isOpen ? 'expanded' : ''}`}>
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── Still Need Help CTA ─── */}
      <section className="faq-cta">
        <div className="faq-cta-card">
          <div className="faq-cta-icon">🎧</div>
          <div className="faq-cta-text">
            <h2>Still Have Questions?</h2>
            <p>Our friendly support team is always ready to help you plan your perfect trip.</p>
          </div>
          <div className="faq-cta-actions">
            <a href="mailto:planmytrip45@gmail.com" className="faq-cta-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email Support
            </a>
            <a href="tel:+919873214560" className="faq-cta-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.14 6.14l1.91-1.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Us
            </a>
            <Link to="/about" className="faq-cta-btn outline">Learn More</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default FAQ;
