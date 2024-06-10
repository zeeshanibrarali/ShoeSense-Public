// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/auth';
// import axios from 'axios';
// import styles from '../styles/RecommendedSection.module.css';
import img1 from '../assets/FeaturedSection(Vans).jfif';
import img2 from '../assets/FeaturedSection(Nike).png';
import img3 from '../assets/FeaturedSection(Nike2).png';

// const RecommendedSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [auth, setAuth] = useAuth();


// const products = [
//   { id: 1, name: 'Nike Airforce', image: img1 },
//   { id: 2, name: 'Adidas Samba', image: img2 },
//   { id: 3, name: 'Vans White', image: img3 },
//   { id: 4, name: 'Product 4', image: img1 },
//   { id: 5, name: 'Nike Airforce', image: img1 },
//   { id: 6, name: 'Adidas Samba', image: img2 },
//   { id: 7, name: 'Vans White', image: img3 },
//   { id: 8, name: 'Product 4', image: img1 },
// ];

//   const prevProduct = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 4 : prevIndex - 1));
//   };

//   const nextProduct = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === products.length - 4 ? 0 : prevIndex + 1));
//   };

//   return (
//     <div className={styles.recommendedSection}>
//       <h1>RECOMMENDED SECTION</h1>
//       <div className={styles.carousel}>
//         <button className={`${styles.navButton} ${styles.left}`} onClick={prevProduct}>
//           &lt;
//         </button>
//         <div className={styles.productsContainer} style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
// {products.map((product, index) => (
//   <div key={product.id} className={styles.productCard}>
//     <img src={product.image} alt={product.name} />
//     <div className={styles.productInfo}>
//       <h3>{product.name}</h3>
//       <button>Add to Cart</button>
//     </div>
//   </div>
// ))}
//         </div>
//         <button className={`${styles.navButton} ${styles.right}`} onClick={nextProduct}>
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecommendedSection;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import styles from '../styles/RecommendedSection.module.css';

const RecommendedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auth] = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  // const products = [
  //   { id: 1, name: 'Nike Airforce', image: img1 },
  //   { id: 2, name: 'Adidas Samba', image: img2 },
  //   { id: 3, name: 'Vans White', image: img3 },
  //   { id: 4, name: 'Product 4', image: img1 },
  //   { id: 5, name: 'Nike Airforce', image: img1 },
  //   { id: 6, name: 'Adidas Samba', image: img2 },
  //   { id: 7, name: 'Vans White', image: img3 },
  //   { id: 8, name: 'Product 4', image: img1 },
  // ];

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

  useEffect(() => {
    const fetchData = async () => {
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

        console.log('Fetching recommendations with preferences:', params);

        const response = await axios.get('http://localhost:5000/recommendations', {
          params: params
        });

        console.log('Received recommendations:', response.data);
        console.log('Type of recommendations:', typeof response.data);

        const cleanedData = response.data.replace(/NaN/g, 'null');

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
              {product.imageURLs && <img src={product.imageURLs} alt={product.name} />}
              <div className={styles.productInfo}>
                {product.name && <h3>{product.name}</h3>}
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
