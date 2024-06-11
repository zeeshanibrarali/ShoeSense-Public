import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import styles from '../styles/RecommendedSection.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart';

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [recommendations, setRecommendations] = useState([]);

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? recommendations.length - 9 : prevIndex - 1;
      return newIndex < 0 ? recommendations.length - 4 : newIndex;
    });
  };

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === recommendations.length - 9 ? 0 : prevIndex + 1;
      return newIndex >= recommendations.length ? 0 : newIndex;
    });
  };

  const handleAddToCart = (product) => {
    if (!auth.token) {
      toast.error('Make sure to log in first to perform this action');
      return;
    }
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success('Item added to cart');
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(auth.userData)
      if (!auth.userData) {
        console.log('No user data available');
        return;
      }

      try {
        const params = {};

        if (auth.userData.shoeColorPreference && auth.userData.shoeColorPreference[0]) {
          params.color = auth.userData.shoeColorPreference[0];
        }

        if (auth.userData.shoeBrandPreference && auth.userData.shoeBrandPreference[0]) {
          params.brand = auth.userData.shoeBrandPreference[0];
        }

        if (auth.userData.priceRangePreference) {
          params.max_price = auth.userData.priceRangePreference.replace(/\$/g, '').replace(/\s/g, '');
        }

        params.age = auth.userData.age;
        params.gender = auth.userData.gender;
        params.country = "Pakistan";
        params.hobbies = auth.userData.hobbies[0];

        console.log('Fetching recommendations with preferences:', params);

        const response = await axios.get('http://localhost:5000/recommendations', {
          params: params
        });

        console.log('Received recommendations:', response.data);
        console.log('Type of recommendations:', typeof response.data);
        const dataString = JSON.stringify(response.data);

        // Replace any occurrences of 'NaN' with 'null'
        const cleanedData = dataString.replace(/NaN/g, 'null');

        // Parse the cleaned data as JSON
        const jsonData = JSON.parse(cleanedData);
        setRecommendations(jsonData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchData();
  }, [auth]);
  console.log("wow", recommendations)
  return (
    <div className={styles.recommendedSection}>
      <h1>RECOMMENDED SECTION</h1>
      <div className={styles.carousel}>
        <button className={`${styles.navButton} ${styles.left}`} onClick={prevProduct}>
          &lt;
        </button>
        <div className={styles.productsContainer} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {recommendations.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/products/product-info/${product.id}`}>
                {product.imageURLs && <img src={product.imageURLs} alt={product.name} />}
                <div className={styles.productInfo}>
                  {product.name && <h3>{product.name}</h3>}
                  {product.price && <h3>Price: {product.price}</h3>}
                  {product.color && <h3>Color: {product.color}</h3>}
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </Link>
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
