import React from 'react';
import Header from '../components/header.jsx';
import Productssection from '../components/productssection.jsx';
import styles from '../styles/latest.module.css'
import Footer from '../components/Footer.jsx';

function Latest() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>LATEST PRODUCTS</h1>
      </div>
      <div className={styles.CLA}>
        <p>Don't Miss Out! Shop Now and Find Your Perfect Fit with Our Newest Styles. Experience Unmatched Comfort and Trend-Setting Designs Today!</p>
      </div>

      <Productssection gender={"latestProducts"} />
      <Footer />
    </div>
  )
}

export default Latest
