import React, { useState } from 'react';
import styles from '../styles/RecommendedSection.module.css';
import img1 from '../assets/FeaturedSection(Vans).jfif';
import img2 from '../assets/FeaturedSection(Nike).png';
import img3 from '../assets/FeaturedSection(Nike2).png';

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { id: 1, name: 'Nike Airforce', image: img1 },
    { id: 2, name: 'Adidas Samba', image: img2 },
    { id: 3, name: 'Vans White', image: img3 },
    { id: 4, name: 'Product 4', image: img1 },
    { id: 5, name: 'Nike Airforce', image: img1 },
    { id: 6, name: 'Adidas Samba', image: img2 },
    { id: 7, name: 'Vans White', image: img3 },
    { id: 8, name: 'Product 4', image: img1 },
  ];

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 4 : prevIndex - 1));
  };

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 4 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.recommendedSection}>
      <h1>RECOMMENDED SECTION</h1>
      <div className={styles.carousel}>
        <button className={`${styles.navButton} ${styles.left}`} onClick={prevProduct}>
          &lt;
        </button>
        <div className={styles.productsContainer} style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
          {products.map((product, index) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <button className={`${styles.navButton} ${styles.right}`} onClick={nextProduct}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default RecommendedSection;
