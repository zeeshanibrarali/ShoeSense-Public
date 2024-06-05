import React from 'react';
import styles from '../styles/CartPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';

function CartPage() {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.itemsSection}>
          {cart.map((item, index) => (
            <div key={index} className={styles.brand}>
              <h2>{item.brand}</h2>
              <div className={styles.item}>
                <img src={item.imageURL} alt={item.name} />
                <div className={styles.itemInfo}>
                  <p>{item.name}</p>
                  <p>${item.price.$numberDecimal}</p>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          {/* <div className={styles.brand}>
          <h2>Brand Name</h2>
          <div className={styles.item}>
            <img src="shoe2.png" alt="Shoe" />
            <div className={styles.itemInfo}>
              <p>Name</p>
              <p>Price</p>
            </div>
          </div>
          <div className={styles.item}>
            <img src="shoe2.png" alt="Shoe" />
            <div className={styles.itemInfo}>
              <p>Name</p>
              <p>Price</p>
            </div>
          </div>
        </div> */}
        </div>
        <div className={styles.checkoutSection}>
          <div className={styles.summary}>
            {cart.map((item, index) => (
              <p key={index}>{item.name} <span>{item.price.$numberDecimal}</span></p>
            ))}
            <p>Shipping <span>$30</span></p>
            <p>Subtotal <span>{calculateTotal() + 30}</span></p>
          </div>
          <Link to="/checkout">
            <button className={styles.checkoutButton}>Checkout</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CartPage
