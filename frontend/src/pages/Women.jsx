import React from 'react'
import Header from '../components/header'
import Productssection from '../components/productssection.jsx';
import styles from '../styles/women.module.css'
import Footer from '../components/Footer';

function women() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>WOMEN PRODUCTS</h1>
      </div>
      <div className={styles.CLA}>
        <p>Elevate Your Look with Our Latest Women's Footwear Collection! Explore Trendy Styles and Experience Unrivaled Comfort. Step Out in Confidence with Our Fashion-Forward Designs. Shop Now and Find Your Perfect Pair!
        </p>
      </div>

      <Productssection gender={"latestProducts"} />
      <Footer />
    </div>
  )
}

export default women
