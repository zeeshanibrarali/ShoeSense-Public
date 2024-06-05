import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/checkout.module.css';
import img1 from '../assets/FeaturedSection(Nike).png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header.jsx';

const CheckoutPage = () => {
  const companyName = "Shoe Sense";
  const shippingCost = 5;
  
  const initialItems = [
    { img: img1, alt: "Product 1", name: "Product 1", quantity: 1, price: 50 },
    { img: img1, alt: "Product 2", name: "Product 2", quantity: 2, price: 1500 },
    { img: img1, alt: "Product 3", name: "Product 3", quantity: 1, price: 2500 },
  ];

  const [items, setItems] = useState(initialItems);
  const [amountDue, setAmountDue] = useState(0);

  useEffect(() => {
    const calculateAmountDue = () => {
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setAmountDue(subtotal + shippingCost);
    };

    calculateAmountDue();
  }, [items]);

  const handlePay = (e) => {
    e.preventDefault();
    toast.success('Your order has been placed', {
      position: "top-right",
      autoClose: 5000, // 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <Header />
      <div className={styles.checkoutContainer}>
        <div className={styles.summarySection}>
          <h2>Pay {companyName}</h2>
          <h3>${amountDue}</h3>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              <img src={item.img} alt={item.alt} />
              <div>
                <p>{item.name}</p>
                <p>Qty {item.quantity}</p>
              </div>
              <p>${item.price}</p>
            </div>
          ))}
          <div className={styles.totals}>
            <p>Subtotal: ${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <p>Shipping: ${shippingCost}</p>
            <p>Total due: ${amountDue}</p>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <form className={styles.paymentForm} onSubmit={handlePay}>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" placeholder="your.email@example.com" required />
            </div>
            <div className={styles.field}>
              <label>Shipping address</label>
              <input type="text" placeholder="Full Name" required />
              <input type="text" placeholder="Street Address" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="State/Province" required />
              <input type="text" placeholder="Zip/Postal Code" required />
              <select required>
                <option value="">Country</option>
                <option value="US">United States</option>
                {/* Add more countries as needed */}
              </select>
              <button type="button">Enter address manually</button>
            </div>
            <div className={styles.field}>
              <label>Payment details</label>
              <input type="text" placeholder="Card Number" required />
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVC" required />
            </div>
            <div className={styles.field}>
              <label>Name on Card</label>
              <input type="text" placeholder="Name as it appears on the card" required />
            </div>
            <div className={styles.checkbox}>
              <input type="checkbox" id="billing" />
              <label htmlFor="billing">Billing address is same as shipping</label>
            </div>
            <button type="submit" className={styles.payButton}>Pay ${amountDue}</button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

CheckoutPage.defaultProps = {
  items: [],
};

CheckoutPage.propTypes = {
  companyName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default CheckoutPage;
