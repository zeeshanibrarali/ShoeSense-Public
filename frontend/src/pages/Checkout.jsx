import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/checkout.module.css';
import img1 from '../assets/FeaturedSection(Nike).png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header.jsx';
import { useCart } from '../context/cart.jsx';
import { useAuth } from '../context/auth.jsx';
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {

  const companyName = "Shoe Sense";
  const shippingCost = 5;
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState("");
  const [amountDue, setAmountDue] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // holding checkout form each field value 
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateOrProvince, setStateOrProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const updateAddress = async (email, addressData) => {
    try {
      const response = await fetch("http://localhost:3000/updateAddress", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          email,
          ...addressData
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update address");
      }
      console.log("Address updated successfully");
      // Update auth context
      const updatedAuth = {
        ...auth,
        userData: {
          ...data.user,
        }
      };

      // Save updated auth context in local storage
      localStorage.setItem("auth", JSON.stringify(updatedAuth));
      setAuth(updatedAuth);
    } catch (error) {
      console.log("Error updating address: " + error.message);
    }
  };

  // populating checkout form with already available data using state
  useEffect(() => {
    if (auth?.userData) {
      setEmail(auth.userData?.email);
      setFullName(auth.userData?.name);
      setStreetAddress(auth.userData?.address?.street);
      setCity(auth.userData?.address?.city);
      setStateOrProvince(auth.userData?.address?.stateOrProvince);
      setPostalCode(auth.userData?.address?.postalCode);
      setCountry(auth.userData?.address?.country);
    }
  }, [auth]);

  // get total amount calculated
  useEffect(() => {
    const calculateAmountDue = () => {
      const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price.$numberDecimal), 0);
      setAmountDue(subtotal);
    };

    calculateAmountDue();
  }, [cart]);

  //get payment gateway token
  const getToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/braintree/token", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth?.token}`
        }
      });
      const data = await response.json();
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePay = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to the cart before checking out.");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      // Update address
      const addressData = {
        street: streetAddress,
        city,
        stateOrProvince,
        country,
        postalCode,
      };
      await updateAddress(auth?.userData?.email, addressData);

      const response = await fetch("http://localhost:3000/braintree/payment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          nonce,
          cart,
          auth,
          totalPrice: amountDue + shippingCost
        })
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.success("Payment Completed Successfully");
        localStorage.removeItem("cart");
        setCart([]);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error(data.message || "Payment failed");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment failed: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.checkoutContainer}>
        <div className={styles.summarySection}>
          <h2>Pay {companyName}</h2>
          <h3>${amountDue.toFixed(2)}</h3>
          {cart.map((item, index) => (
            <div className={styles.item} key={index}>
              <img src={item.imageURL} alt={item.alt} />
              <div>
                <p>{item.name}</p>
                {/* <p>Qty {item.quantity}</p> */}
              </div>
              <p>${item.price.$numberDecimal}</p>
            </div>
          ))}
          <div className={styles.totals}>
            <p>Subtotal: ${amountDue}</p>
            <p>Shipping: ${shippingCost}</p>
            <p>Total due: ${(amountDue + shippingCost).toFixed(2)}</p>
          </div>
        </div>

        <div className={styles.paymentSection}>
          <form className={styles.paymentForm} onSubmit={handlePay}>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required />
            </div>
            <div className={styles.field}>
              <label>Shipping address</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required />
              <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} placeholder="Street Address" required />
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
              <input type="text" value={stateOrProvince} onChange={(e) => setStateOrProvince(e.target.value)} placeholder="State/Province" required />
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Zip/Postal Code" required />
              <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="">Country</option>
                <option value="US">United States</option>
                <option value="PAK">Pakistan</option>
                {/* Add more countries as needed */}
              </select>
              <button type="button">Enter address manually</button>
            </div>
            {/* <div className={styles.field}>
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
            </div> */}
            {/* <button type="submit" className={styles.payButton}>Pay ${(amountDue + shippingCost).toFixed(2)}</button> */}
            {clientToken && (
              <div>
                <DropIn
                  options={{
                    authorization: clientToken
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  type="submit"
                  className={styles.payButton}
                  onClick={handlePay}
                  disabled={loading || !instance}
                > {loading ? "Processing ...." : `Pay ${(amountDue + shippingCost).toFixed(2)}`}</button>
              </div>
            )}
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
