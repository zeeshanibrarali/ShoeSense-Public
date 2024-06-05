import React from 'react'
import Header from '../components/header'
import ProductsSection from '../components/productssection';
import styles from '../styles/men.module.css'

function men() {
  return (
    <div>
      <Header />
      <div className={styles.heading}>
        <h1>Men's Shoes</h1>
      </div>
      <ProductsSection gender={"men"} />
    </div>
  )
}

export default men
