import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import dobToAge from 'dob-to-age';
import { useAuth } from '../context/auth';

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

  // Singup Form Data Management States
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [correctPass, setCorrectPass] = useState('');
<<<<<<< HEAD
=======
  const [shoeColorPreference, setShoeColorPreference] = useState([]);
  const [shoeBrandPreference, setShoeBrandPreference] = useState('');
  const [priceRangePreference, setPriceRangePreference] = useState('');

  // Context Custom Hook
  const [auth, SetAuth] = useAuth();

>>>>>>> 06aecbc97e107ce912f1e0b55a25a05cd2f1d82e
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    setAge(dobToAge(dob));
    console.log(age);

    if (password !== correctPass) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name, gender, age, country, email, password
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
        SetAuth({
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
    <div className={`${styles.container} ${styles.SignupBackground}`}>
      <div className={styles.SignupBox}>
        <h1>Sign Up To A New Account!</h1>
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
              value={dob}
              onChange={e => setDob(e.target.value)} />

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
          </div>

          <div className={styles.signupbutton}>
            <Link to="/preferences">
              <button type="submit">Sign Up</button>
            </Link>
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
