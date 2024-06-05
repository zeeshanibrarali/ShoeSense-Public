import React, { useEffect, useState } from 'react';
import styles from '../styles/productsection.module.css';
import img1 from '../assets/FeaturedSection(Vans).jfif';
import img2 from '../assets/FeaturedSection(Nike).png';
import img3 from '../assets/FeaturedSection(Nike2).png';
import { Link } from 'react-router-dom';

function ProductBox({ img, name, price, description }) {
  return (
    <div className={styles.productBox}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <p>{description}</p>
      <button className={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
}

function ProductsSection({ gender }) {
  const [filters, setFilters] = useState({
    color: '',
    brand: '',
    price: '',
    size: ''
  });

  // const products = [
  //   {
  //     img: img1,
  //     name: 'Product 1',
  //     price: '$20.00',
  //     description: 'This is a description for Product 1.'
  //   },
  //   {
  //     img: img2,
  //     name: 'Product 2',
  //     price: '$30.00',
  //     description: 'This is a description for Product 2.',
  //   },
  //   {
  //     img: img3,
  //     name: 'Product 3',
  //     price: '$40.00',
  //     description: 'This is a description for Product 3.',
  //   },
  //   {
  //     img: img1,
  //     name: 'Product 4',
  //     price: '$50.00',
  //     description: 'This is a description for Product 4.',
  //   },
  //   {
  //     img: img2,
  //     name: 'Product 5',
  //     price: '$60.00',
  //     description: 'This is a description for Product 5.',
  //   },
  //   {
  //     img: img3,
  //     name: 'Product 6',
  //     price: '$70.00',
  //     description: 'This is a description for Product 6.',
  //   },
  //   {
  //     img: img1,
  //     name: 'Product 7',
  //     price: '$80.00',
  //     description: 'This is a description for Product 7.',
  //   },
  //   {
  //       img: img1,
  //       name: 'Product 7',
  //       price: '$80.00',
  //       description: 'This is a description for Product 7.',
  //   },
  //   {
  //       img: img1,
  //       name: 'Product 7',
  //       price: '$80.00',
  //       description: 'This is a description for Product 7.',
  //   },
  //   {
  //       img: img1,
  //       name: 'Product 7',
  //       price: '$80.00',
  //       description: 'This is a description for Product 7.',
  //   },
  //   {
  //       img: img1,
  //       name: 'Product 7',
  //       price: '$80.00',
  //       description: 'This is a description for Product 7.',
  //   },
  //   {
  //       img: img1,
  //       name: 'Product 7',
  //       price: '$80.00',
  //       description: 'This is a description for Product 7.',
  //   },

  // ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${gender}`);
        if (!response.ok) {
          throw new Error('Response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProducts = products.filter(product => {
    return (
      (!filters.color || product.description.includes(filters.color)) &&
      (!filters.brand || product.name.includes(filters.brand)) &&
      (!filters.price || parseFloat(product.price.substring(1)) <= parseFloat(filters.price)) &&
      (!filters.size || product.description.includes(filters.size))
    );
  });

  return (
    <div className={styles.productSection}>
      <div className={styles.filterPanel}>
        <h3>Filters</h3>
        <div>
          <label>Color:</label>
          <input type="text" name="color" value={filters.color} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" name="brand" value={filters.brand} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={filters.price} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Size:</label>
          <input type="text" name="size" value={filters.size} onChange={handleFilterChange} />
        </div>
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          // <Link to={`/products/product-info/${product._id}`}>
          <ProductBox
            key={product._id}
            img={product.imageURL}
            name={product.name}
            price={`$${product.price.$numberDecimal}`}
            description={`Brand: ${product.brand}, Color: ${product.color}, Size: ${product.size}`}
          />
          // </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsSection;
