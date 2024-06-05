import React from 'react';
import Header from '../components/header.jsx';
import Productssection from '../components/productssection.jsx';
import styles from '../styles/latest.module.css'

function Latest() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>Latest Products</h1>
      </div>

      <Productssection gender={"latestProducts"} />
    </div>
  )
}

export default Latest
