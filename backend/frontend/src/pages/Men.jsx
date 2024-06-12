import React from 'react';
import Header from '../components/header.jsx';
import Productssection from '../components/productssection.jsx';
import styles from '../styles/latest.module.css'
import Footer from '../components/Footer.jsx';

function men() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>MEN PRODUCTS</h1>
      </div>
      <div className={styles.CLA}>
        <p>Discover the Latest Trends in Men's Footwear! Step into Style and Comfort with Our Newest Collection. Find Your Perfect Pair Today and Stay Ahead of the Fashion Game!</p>
      </div>

      <Productssection gender={"latestProducts"} />
      <Footer />
    </div>
  )
}

export default men
