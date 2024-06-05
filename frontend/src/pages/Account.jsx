import React, { useState } from 'react';
import styles from '../styles/account.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Account() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, SetAuth] = useAuth();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
        credentials: 'include'
      });

      const result = await response.json();
      if (response.ok) {
        SetAuth({
          ...auth,
          token: result.token,
          userData: result.user
        });
        localStorage.setItem('auth', JSON.stringify(result));
        toast.success(result.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={`${styles.container} ${styles.loginBackground}`}>
        <div className={styles.loginBox}>
          <h1>Login To Your Account</h1>
          <form onSubmit={login}>
            <label htmlFor='email'>Enter your Email:</label>
            <input id='email' type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor='pass'>Enter your Password:</label>
            <input id='pass' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <a href="#" className={styles.link}>Forgot Password</a>
            <div className={styles.loginbutton}>
              <button type="submit">Login</button>
            </div>
          </form>
          <div className={styles.buttons}>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account;
