import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import dobToAge from 'dob-to-age';
// import { useAuth } from '../context/auth';
import { useCombined } from '../context/combined';

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

  const { combinedData, setCombinedData } = useCombined();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Singup Form Data Management States
  // const [name, setName] = useState('');
  // const [gender, setGender] = useState('');
  // const [age, setAge] = useState('');
  // const [dob, setDob] = useState('');
  // const [country, setCountry] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [correctPass, setCorrectPass] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!combinedData.name) newErrors.name = 'Name is required';
    if (!combinedData.dob) newErrors.dob = 'Date of Birth is required';
    if (!combinedData.email) newErrors.email = 'Email is required';
    if (!combinedData.password) newErrors.password = 'Password is required';
    if (!combinedData.correctPass) newErrors.correctPass = 'Confirm Password is required';
    if (combinedData.password !== combinedData.correctPass) newErrors.correctPass = 'Passwords do not match';
    if (!combinedData.gender) newErrors.gender = 'Gender is required';
    if (!combinedData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const age = dobToAge(combinedData.dob);

    // setAge(dobToAge(dob));

    if (combinedData.password !== combinedData.correctPass) {
      alert("Passwords do not match!");
      return;
    }

    setCombinedData((prevData) => ({
      ...prevData,
      age,
    }));

    navigate('/preferences');

    // const userData = {
    //   name, gender, age, country, email, password
    // };

    // try {
    //   const response = await fetch('http://localhost:3000/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData),
    //     credentials: 'include'
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     alert(result.message);
    //     SetAuth({
    //       ...auth,
    //       token: result.token,
    //       userData: result.user
    //     });
    //     localStorage.setItem('auth', JSON.stringify(result));
    //     setTimeout(() => {
    //       navigate('/');
    //     }, 2000);
    //   } else {
    //     alert(result.message);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An error occurred. Please try again.');
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCombinedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              name='name'
              type='text'
              placeholder='Name'
              value={combinedData.name}
              onChange={handleChange} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <label htmlFor='age'>Date of Birth:</label>
            <input
              id="dob"
              name='dob'
              type='date'
              value={combinedData.dob}
              onChange={handleChange} />
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}

            <label htmlFor='email'>Enter your Email:</label>
            <input
              id="email"
              name='email'
              type='email'
              placeholder='Email'
              value={combinedData.email}
              onChange={handleChange} />
            {errors.email && <span className={styles.error}>{errors.email}</span>}

            <label htmlFor='password'>Enter your Password:</label>
            <input
              id="password"
              name='password'
              type='password'
              placeholder='Password'
              value={combinedData.password}
              onChange={handleChange} />
            {errors.password && <span className={styles.error}>{errors.password}</span>}

            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
              id="correctPass"
              name='correctPass'
              type='password'
              placeholder='Confirm Password'
              value={combinedData.correctPass}
              onChange={handleChange} />
            {errors.correctPass && <span className={styles.error}>{errors.correctPass}</span>}
          </div>

          <div className={styles.column}>
            <label htmlFor='gender'>Choose Your Gender:</label>
            <select
              id="gender"
              name='gender'
              value={combinedData.gender}
              onChange={handleChange}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Rather not say</option>
            </select>
            {errors.gender && <span className={styles.error}>{errors.gender}</span>}

            <label htmlFor='country'>Select your Country:</label>
            <select
              id="country"
              name='country'
              value={combinedData.country}
              onChange={handleChange}>
              <option value="">Select...</option>
              {asianCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <span className={styles.error}>{errors.country}</span>}
          </div>

          <div className={styles.signupbutton}>
            {/* <Link to="/preferences">
            </Link> */}
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
