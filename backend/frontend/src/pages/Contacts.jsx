import React from 'react';
import styles from '../styles/contacts.module.css';
import Header from '../components/header';
import img from '../assets/ContactUsImg.jpg'
import Footer from '../components/Footer.jsx';

function Contacts() {
  return (
    <>
      <Header />

      <div className={styles.contactsContainer}>
        <div className={styles.flexContainer}>
          <div>
            <img src={img} className={styles.contactsImg} alt="ContactUsImg" />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.contactsHeading}>
              <span className={styles.highlight}>CONTA</span>CT US
            </h1>
            <p className={styles.contactsDescription}>
              We're here to assist you. Get in touch with us!
            </p>
          </div>
        </div>
        <div className={styles.contactsContent}>
          <h2>Our Office</h2>
          <p>
            <strong>Address:</strong> <br />
            1234 Shoe Lane, <br />
            Footwear City, FC 56789 <br />
            United States
          </p>
          <p>
            <strong>Phone:</strong> <br />
            +1 (234) 567-8900
          </p>
          <p>
            <strong>Email:</strong> <br />
            contact@shoesense.com
          </p>
          <p>
            <strong>Office Hours:</strong> <br />
            Monday - Friday: 9:00 AM - 6:00 PM <br />
            Saturday: 10:00 AM - 4:00 PM <br />
            Sunday: Closed
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contacts;
