import React, { useEffect, useState } from 'react';
import styles from '../styles/featuredproducts.module.css'; // Assuming this contains the new styles
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  useEffect(() => {
    // Fetch featured products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/featured-products');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.error('Fetched data is not an array:', result.data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return <div>Unexpected error occurred. Please try again later.</div>;
  }

  const handleAddToCart = (product) => {
    if (!auth.token) {
      toast.error('Make sure to log in first to perform this action');
      return;
    }
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success('Item added to cart');
  };

  return (
    <>
<<<<<<< HEAD
      <div className={styles.FeaturedContainer}>
        <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={() => handleClick('prev')}>&lt;</button>
        <div className={styles.FeaturedSection}>
          <div className={styles.FeaturedHeading}>
            <h1>FEATURED SECTION</h1>
          </div>
          <div className={styles.FeaturedItems}>
            {products.slice(currentIndex, currentIndex + 3).map(product => (
              <div key={product._id} className={styles.FeaturedBoxes}>
=======
      <ToastContainer />
      <div className={styles.featuredSection}>
        <h1>FEATURED SECTION</h1>
        <div className={styles.featuredCarousel}>
          <button 
            className={`${styles.featuredNavButton} ${styles.left}`} 
            onClick={() => setCurrentIndex(currentIndex === 0 ? products.length - 3 : currentIndex - 1)}
          >
            &lt;
          </button>
          <div 
            className={styles.featuredProductsContainer} 
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {products.map(product => (
              <div key={product._id} className={styles.featuredProductCard}>
>>>>>>> e14cc484ff2c6b420925fd790645b8c0eef44b36
                <Link to={`/products/product-info/${product._id}`}>
                  <img src={product.imageURL} alt={product.alt} />
                  <div className={styles.featuredProductInfo}>
                    <h3>{product.name}</h3>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button 
            className={`${styles.featuredNavButton} ${styles.right}`} 
            onClick={() => setCurrentIndex(currentIndex === products.length - 3 ? 0 : currentIndex + 1)}
          >
            &gt;
          </button>
        </div>
<<<<<<< HEAD
        <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={() => handleClick('next')}>&gt;</button>
      </div >
      <ToastContainer />
=======
      </div>
>>>>>>> e14cc484ff2c6b420925fd790645b8c0eef44b36
    </>
  );
}

export default FeaturedProducts;
