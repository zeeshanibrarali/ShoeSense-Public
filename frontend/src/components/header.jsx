import React from 'react';
import styles from '../styles/header.module.css';
import Logo from '../assets/Logo.png';
import cartIcon from '../assets/cart.png'
import accountIcon from '../assets/account.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Badge } from "antd";

function header() {

  const [auth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  // const handleCartClick = () => {
  //   if (!auth.userData) {
  //     toast.error('Make sure to log in first to perform this action');
  //     console.log("Yes Im Here");
  //     setTimeout(() => {
  //       navigate('/account');
  //     }, 2000);
  //   } else {
  //     navigate('/cart');
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div className={styles.headercontainer}>
        <div className={styles.logodiv}>
          <Link to="/"><img className={styles.logo} src={Logo} /></Link>
        </div>
        <div className={styles.mainNavbar}>
          <div className={styles.nav}>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/" className={styles.navAnchor}>Home</Link>
              </li>
              <li>
                <Link to="/latest" className={styles.navAnchor}>Latest</Link>
              </li>
              <li>
                <Link to="/men" className={styles.navAnchor}>Men</Link>
              </li>
              <li>
                <Link to="/women" className={styles.navAnchor}>Women</Link>
              </li>
              <li>
                <Link to="/aboutus" className={styles.navAnchor}>About Us</Link>
              </li>
              <li>
                <Link to="/contacts" className={styles.navAnchor}>Contact</Link>
              </li>
              {!auth.userData && (
                <li>
                  <Link to="/account" className={styles.navAnchor}>Login</Link>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.icon_container}>
            <ul>
              <li>
                {!auth.userData ? (
                  <>
                    <Link to="/account">
                      <img src={accountIcon} alt="account-icon" className="account-icon head-icons" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <img src={accountIcon} alt="account-icon" className="account-icon head-icons" />
                    </Link>
                  </>
                )}
              </li>
              <li>
                {auth.userData ? (
                  <Badge count={cart?.length}>
                    <Link to="/cart">{" "}<img src={cartIcon} alt="account-icon" className="account-icon head-icons" /></Link>
                  </Badge>
                ) : (
                  <Link to="/cart">{" "}<img src={cartIcon} alt="account-icon" className="account-icon head-icons" /></Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default header
