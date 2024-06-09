import React, { useState } from 'react';
import styles from '../styles/preferences.module.css';
import { useCombined } from '../context/combined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Preferences() {
  // const [brandPreference, setBrandPreference] = useState([]);
  // const [priceRangePreference, setPriceRangePreference] = useState('');
  // const [shoeColorPreference, setShoeColorPreference] = useState([]);
  // const [hobbies, setHobbies] = useState([]);

  const { combinedData, setCombinedData } = useCombined();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const brands = ["Nike", "Adidas", "Vans", "Converse", "Puma"];
  const priceRanges = ["$0 - $50", "$50 - $100", "$100 - $150", "$150 - $200", "$200 - $250", "$250 - $300", "$300+"];
  const colors = ["#1A2130", "#FDFFE2", "#FF9EAA", "#987070", "#4F6F52", "#C73659"];
  const hobbiesOptions = [
    { label: "Active/Athletic" },
    { label: "Casual/Comfort-Seeker" },
    { label: "Adventurous/Outdoor Enthusiast" },
    { label: "Minimalist/Practical" }
  ];

  const handleColorClick = (color) => {
    setCombinedData((prevData) => ({
      ...prevData,
      shoeColorPreference: prevData.shoeColorPreference.includes(color)
        ? prevData.shoeColorPreference.filter(pref => pref !== color)
        : [...prevData.shoeColorPreference, color]
    }));
  };

  const handleHobbyChange = (label) => {
    setCombinedData((prevData) => ({
      ...prevData,
      hobbies: prevData.hobbies.includes(label)
        ? prevData.hobbies.filter(hobby => hobby !== label)
        : [...prevData.hobbies, label]
    }));
  };

  const handleBrandChange = (brand) => {
    setCombinedData((prevData) => ({
      ...prevData,
      brandPreference: prevData.brandPreference.includes(brand)
        ? prevData.brandPreference.filter(pref => pref !== brand)
        : [...prevData.brandPreference, brand]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedData),
        credentials: 'include'
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setAuth({
          ...auth,
          token: result.token,
          userData: result.user
        });
        localStorage.setItem('auth', JSON.stringify(result));
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.preferencesBox}>
        <h1 className={styles.heading}>PREFERENCES</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.column}>
            <label className={styles.brandLabel} htmlFor='brandPreference'>Brand Preference:</label>
            <div className={styles.brandContainer}>
              {brands.map(brand => (
                <div key={brand} className={styles.brandOption}>
                  <input
                    type="checkbox"
                    id={brand}
                    value={brand}
                    checked={combinedData.brandPreference.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={brand} className={styles.brandOptionLabel}>{brand}</label>
                </div>
              ))}
            </div>

            <label className={styles.priceLabel} htmlFor='priceRangePreference'>Price Range Preference:</label>
            <select
              id="priceRangePreference"
              name="priceRangePreference"
              value={combinedData.priceRangePreference}
              onChange={e => setCombinedData((prevData) => ({
                ...prevData,
                priceRangePreference: e.target.value
              }))}
              className={styles.input}>
              <option value="">Select...</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className={styles.column}>
            <label className={styles.hobbyLabel}>How would you define yourself?</label>
            {hobbiesOptions.map(option => (
              <div key={option.label} className={styles.hobbyOption}>
                <input
                  type="checkbox"
                  id={option.label}
                  checked={combinedData.hobbies.includes(option.label)}
                  onChange={() => handleHobbyChange(option.label)}
                  className={styles.hobbyCheckbox}
                />
                <label htmlFor={option.label} className={styles.hobbyOptionLabel}>{option.label}</label>
                <p className={styles.hobbyDescription}>{option.description}</p>
              </div>
            ))}
            <label className={styles.colorLabel} htmlFor='shoeColorPreference'>Color Preference:</label>
            <div className={styles.colorContainer}>
              {colors.map(color => (
                <div
                  key={color}
                  className={`${styles.colorCircle}`}
                  style={{
                    backgroundColor: color,
                    border: combinedData.shoeColorPreference.includes(color) ? '3px solid black' : 'none'
                  }}
                  onClick={() => handleColorClick(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.submitButton}>
            <button type="submit">Save Preferences</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Preferences;
