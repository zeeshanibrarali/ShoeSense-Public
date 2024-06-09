import React, { useState } from 'react';
import styles from '../styles/preferences.module.css';

function Preferences() {
  const [brandPreference, setBrandPreference] = useState([]);
  const [priceRangePreference, setPriceRangePreference] = useState('');
  const [shoeColorPreference, setShoeColorPreference] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const brands = ["Nike", "Adidas", "Vans", "Converse", "Puma"];
  const priceRanges = ["$0 - $50", "$50 - $100", "$100 - $150", "$150 - $200", "$200 - $250", "$250 - $300", "$300+"];
  const colors = ["#1A2130", "#FDFFE2", "#FF9EAA", "#987070", "#4F6F52", "#C73659"];
  const hobbiesOptions = [
    { label: "Active/Athletic"},
    { label: "Casual/Comfort-Seeker"},
    { label: "Adventurous/Outdoor Enthusiast"},
    { label: "Minimalist/Practical"}
  ];

  const handleColorClick = (color) => {
    if (shoeColorPreference.includes(color)) {
      setShoeColorPreference(prevPreferences => prevPreferences.filter(pref => pref !== color));
    } else {
      setShoeColorPreference(prevPreferences => [...prevPreferences, color]);
    }
  };

  const handleHobbyChange = (label) => {
    if (hobbies.includes(label)) {
      setHobbies(prevHobbies => prevHobbies.filter(hobby => hobby !== label));
    } else {
      setHobbies(prevHobbies => [...prevHobbies, label]);
    }
  };

  const handleBrandChange = (brand) => {
    if (brandPreference.includes(brand)) {
      setBrandPreference(prevPreference => prevPreference.filter(pref => pref !== brand));
    } else {
      setBrandPreference(prevPreference => [...prevPreference, brand]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.preferencesBox}>
        <h1 className={styles.heading}>PREFERENCES</h1>
        <form className={styles.form}>
          <div className={styles.column}>
            <label className={styles.brandLabel} htmlFor='brandPreference'>Brand Preference:</label>
            <div className={styles.brandContainer}>
              {brands.map(brand => (
                <div key={brand} className={styles.brandOption}>
                  <input
                    type="checkbox"
                    id={brand}
                    value={brand}
                    checked={brandPreference.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={brand} className={styles.brandOptionLabel}>{brand}</label>
                </div>
              ))}
            </div>

            <label className={styles.priceLabel} htmlFor='priceRangePreference'>Price Range Preference:</label>
            <select
              id="priceRangePreference"
              value={priceRangePreference}
              onChange={e => setPriceRangePreference(e.target.value)}
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
                  checked={hobbies.includes(option.label)}
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
                  className={`${styles.colorCircle} ${shoeColorPreference.includes(color) ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
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
