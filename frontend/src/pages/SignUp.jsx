import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import { Link } from 'react-router-dom';

function SignUp() {
  const asianCountries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei",
    "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq",
    "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon",
    "Malaysia", "Maldives", "Mongolia", "Myanmar (Burma)", "Nepal", "North Korea", "Oman",
    "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore",
    "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste",
    "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
  ];

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [correctPass, setCorrectPass] = useState('');
  const [shoeColorPreference, setShoeColorPreference] = useState([]);
  const [shoeBrandPreference, setShoeBrandPreference] = useState('');
  const [priceRangePreference, setPriceRangePreference] = useState('');

  const signup = async (e) => {
    e.preventDefault();

    if (password !== correctPass) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name, gender, age, country, email, password,
      shoeColorPreference, shoeBrandPreference, priceRangePreference
    };

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleColorClick = (color) => {
    if (shoeColorPreference.includes(color)) {
      setShoeColorPreference(prevPreferences => prevPreferences.filter(pref => pref !== color));
    } else {
      setShoeColorPreference(prevPreferences => [...prevPreferences, color]);
    }
  };

  const colors = ["#1A2130", "#FDFFE2", "#FF9EAA", "#987070", "#4F6F52", "white"];

  return (
    <div className={`${styles.container} ${styles.SignupBackground}`}>
      <div className={styles.SignupBox}>
        <h1>SignUp To A New Account!</h1>
        <form onSubmit={signup} className={styles.form}>
          <div className={styles.column}>
            <label htmlFor='name'>Enter your Name:</label>
            <input
              id="name"
              type='text'
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)} />

            <label htmlFor='age'>Date of Birth:</label>
            <input
              id="age"
              type='date'
              value={age}
              onChange={e => setAge(e.target.value)} />

            <label htmlFor='email'>Enter your Email:</label>
            <input
              id="email"
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)} />

            <label htmlFor='password'>Enter your Password:</label>
            <input
              id="password"
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)} />

            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
              id="confirmPassword"
              type='password'
              placeholder='Confirm Password'
              value={correctPass}
              onChange={e => setCorrectPass(e.target.value)} />
          </div>

          <div className={styles.column}>
            <label htmlFor='gender'>Choose Your Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={e => setGender(e.target.value)}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Rather not say</option>
            </select>

            <label htmlFor='country'>Select your Country:</label>
            <select
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}>
              <option value="">Select...</option>
              {asianCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <label htmlFor='shoeBrandPreference'>Shoe Brand Preference:</label>
            <input
              id="shoeBrandPreference"
              type='text'
              placeholder='Brand Preference'
              value={shoeBrandPreference}
              onChange={e => setShoeBrandPreference(e.target.value)} />

            <label htmlFor='priceRangePreference'>Price Range Preference:</label>
            <input
              id="priceRangePreference"
              type='number'
              placeholder='Price Range'
              value={priceRangePreference}
              onChange={e => setPriceRangePreference(e.target.value)} />

            <label htmlFor='shoeColorPreference'>Shoe Color Preference:</label>
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
          <div className={styles.signupbutton}>
            <button type="submit">Sign Up</button>
          </div>
          <div className={styles.loginbutton}>
            <label htmlFor='login'>Have an account? </label><br /><Link to='/account'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
