import React, { useEffect, useState } from 'react';
import styles from '../styles/featuredproducts.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleClick = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex === products.length - 3 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? products.length - 3 : currentIndex - 1;
    }
    setCurrentIndex(newIndex);
  };

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
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.FeaturedContainer}>
        <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={() => handleClick('prev')}>&lt;</button>
        <div className={styles.FeaturedSection}>
          <div className={styles.FeaturedHeading}>
            <h1>FEATURED SECTION</h1>
          </div>
          <div className={styles.FeaturedItems}>
            {products.slice(currentIndex, currentIndex + 3).map(product => (
              <div key={product._id} className={styles.FeaturedBoxes}>
                <Link to={`/products/product-info/${product._id}`}>
                  <img src={product.imageURL} alt={product.alt} />
                  <h2>{product.name}</h2>
                  <p>{product.brand}-{product.style}</p>
                </Link>
                <button className={styles.FeaturedButtons}
                  onClick={() => handleAddToCart(product)}
                >Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
        <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={() => handleClick('next')}>&gt;</button>
      </div >
    </>
  );
}

export default FeaturedProducts;
