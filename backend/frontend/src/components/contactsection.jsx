import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/contactsection.module.css';

function ContactSection() {
  return (
    <div className={styles['contact-section']}>
      <div className={styles['contact-text']}>
        <p>Do you have any problems or would you like to share your experience? <span className={styles['highlight']}>Hit us up!</span></p>
      </div>
      <div className={styles['contact-button']}>
        <Link to="/contacts">
          <button className={styles['get-in-touch']}>Get in touch</button>
        </Link>
      </div>
    </div>
  );
}

export default ContactSection;
