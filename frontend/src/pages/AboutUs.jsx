import React from 'react';
import styles from '../styles/aboutus.module.css';
import Header from '../components/header';
import img from '../assets/AboutUsImg.jpg';
function aboutUs() {
  return (
    <>
    <Header />

    <div className={styles.AboutusContainer}>
      <div className={styles.flexContainer}>
        <div>
          <img src={img} className={styles.AboutusImg} alt="AboutUsImg" />
          
        </div>
      </div>
    </div>
    </>
  )
}

export default aboutUs
