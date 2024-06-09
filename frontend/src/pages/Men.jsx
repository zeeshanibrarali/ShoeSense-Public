import React from 'react'
import Header from '../components/header'
import ProductsSection from '../components/productssection';
import styles from '../styles/men.module.css'
import Footer from '../components/Footer';

function men() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>Men's Shoes</h1>
      </div>
      <ProductsSection gender={"men"} />
      <Footer />
    </div>
  )
}

export default men
