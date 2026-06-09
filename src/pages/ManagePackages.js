import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, Hotel, Sparkles, Check, Coffee, Plane, Edit } from 'lucide-react';
import './ManagePackages.css';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "http://localhost:5000"
  : "https://planmytrip-backend-68sp.onrender.com";

function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [hotel, setHotel] = useState('');
  const [activities, setActivities] = useState('');
  const [meals, setMeals] = useState('');
  const [transport, setTransport] = useState('');
  const [highlights, setHighlights] = useState('');
  const [price, setPrice] = useState('');

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
    fetchPackages();
  }, []);

  const handleAddPackage = async () => {
    if (!title || !destination || !duration || !image || !hotel || !activities || !meals || !transport || !highlights || !price) {
      alert('Please fill out all fields.');
      return;
    }

    const newPkg = {
      title,
      location: destination,
      duration,
      image,
      hotel,
      activities: parseInt(activities),
      meals,
      transport,
      highlights,
      price: price.toString().startsWith('₹') ? price : '₹' + Number(price).toLocaleString('en-IN'),
      tag: 'Featured',
      rawPrice: parseInt(price)
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

        // Clear form
        setTitle('');
        setDestination('');
        setDuration('');
        setImage('');
        setHotel('');
        setActivities('');
        setMeals('');
        setTransport('');
        setHighlights('');
        setPrice('');

        setSuccessMsg('Holiday Package Added Successfully! 🎉');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert("Failed to add package to database.");
      }
    } catch (err) {
      console.error("Error adding package:", err);
      alert("Failed to connect to backend server.");
    }
  };

  const handleUpdatePackage = async () => {
    if (!title || !destination || !duration || !image || !hotel || !activities || !meals || !transport || !highlights || !price) {
      alert('Please fill out all fields.');
      return;
    }

    const updatedPkg = {
      title,
      location: destination,
      duration,
      image,
      hotel,
      activities: parseInt(activities),
      meals,
      transport,
      highlights,
      price: price.toString().startsWith('₹') ? price : '₹' + Number(price).toLocaleString('en-IN'),
      tag: 'Featured',
      rawPrice: parseInt(price)
    };

    try {
      const res = await fetch(`${API_BASE}/api/packages/${editingPackageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPkg)
      });
      if (res.ok) {
        fetchPackages();
        window.dispatchEvent(new Event('storage'));
        handleCancelEdit();
        setSuccessMsg('Holiday Package Updated Successfully! 🎉');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert("Failed to update package in database.");
      }
    } catch (err) {
      console.error("Error updating package:", err);
      alert("Failed to connect to backend server.");
    }
  };

  const handleRemovePackage = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        // If we are currently editing the deleted package, cancel edit mode
        if (editingPackageId === id) {
          handleCancelEdit();
        }
        fetchPackages();
        window.dispatchEvent(new Event('storage'));
        setSuccessMsg('Package removed successfully.');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert("Failed to delete package from database.");
      }
    } catch (err) {
      console.error("Error deleting package:", err);
      alert("Failed to connect to backend server.");
    }
  };

  const handleEditClick = (pkg) => {
    setIsEditMode(true);
    setEditingPackageId(pkg.id || pkg._id);

    setTitle(pkg.title || '');
    setDestination(pkg.location || '');
    setDuration(pkg.duration || '');
    setImage(pkg.image || '');
    setHotel(pkg.hotel || '');
    setActivities(pkg.activities || '');
    setMeals(pkg.meals || '');
    setTransport(pkg.transport || '');
    setHighlights(pkg.highlights || '');

    // Extract numeric price (e.g. ₹12,999 -> 12999)
    const numericPrice = pkg.price ? pkg.price.toString().replace(/[^0-9]/g, '') : '';
    setPrice(numericPrice);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingPackageId(null);

    setTitle('');
    setDestination('');
    setDuration('');
    setImage('');
    setHotel('');
    setActivities('');
    setMeals('');
    setTransport('');
    setHighlights('');
    setPrice('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdatePackage();
    } else {
      handleAddPackage();
    }
  };

  return (
    <div className="manage-packages-wrapper animate-fade-in">
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="manage-toast animate-fade-in">
          <Check className="toast-icon" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Header section */}
      <section className="manage-hero">
        <div className="manage-hero-card glass">
          <div className="manage-title-badge">ADMIN CONTROL CENTER</div>
          <h1 className="manage-greeting">Manage Trip Packages 🗺️</h1>
          <p className="manage-subtext">Publish new curated tours and adjust pricing for your explorers.</p>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="manage-grid">
        
        {/* Left Form Column */}
        <div className="form-column">
          <div className="form-card glass">
            <h2>{isEditMode ? 'Edit Package' : 'Add New Package'}</h2>
            
            <form onSubmit={handleSubmit} className="package-form">
              <div className="form-group">
                <label>Package Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Goa Beach Tour"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  minLength="5" 
                />
              </div>

              <div className="form-group">
                <label>Destination</label>
                <input 
                  type="text" 
                  placeholder="e.g. North Goa • South Goa"
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Package Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 5N/6D"
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="url" 
                  placeholder="e.g. https://images.unsplash.com/..."
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Hotels</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3 Star Hotel"
                    value={hotel} 
                    onChange={(e) => setHotel(e.target.value)} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Activities count</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5"
                    value={activities} 
                    onChange={(e) => setActivities(e.target.value)} 
                    min="1" 
                    required 
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Meals Included</label>
                  <select 
                    value={meals} 
                    onChange={(e) => setMeals(e.target.value)} 
                    required
                  >
                    <option value="">Select meals</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Breakfast + Dinner">Breakfast + Dinner</option>
                    <option value="All Meals">All Meals</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Transport</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Airport Pickup"
                    value={transport} 
                    onChange={(e) => setTransport(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Highlights</label>
                <textarea 
                  placeholder="Enter highlights separated by commas (e.g. Scuba Diving, Cruise)"
                  value={highlights} 
                  onChange={(e) => setHighlights(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Price Per Person (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 12999"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  min="1000" 
                  required 
                />
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="add-btn" style={{ flex: 1 }}>
                  {isEditMode ? (
                    <>
                      <Check size={18} /> Update Package
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Add Package
                    </>
                  )}
                </button>
                {isEditMode && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit} 
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Packages Column */}
        <div className="packages-column">
          <h2>Active Trip Packages ({packages.length})</h2>
          
          <div className="packages-list-grid">
            {packages.map((pkg) => (
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
                    <div className="pkg-action-buttons" style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleEditClick(pkg)} 
                        className="pkg-edit-btn"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => handleRemovePackage(pkg.id)} 
                        className="pkg-remove-btn"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ManagePackages;
