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
        <h1>Latest Products</h1>
      </div>

      <Productssection gender={"latestProducts"} />
      <Footer />
    </div>
  )
}

export default Latest
