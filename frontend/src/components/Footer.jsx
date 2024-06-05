import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <div className={styles.FooterSectionContainer}>
      <div className={styles.ColumnDiv}>
        <div className={styles.Slogan}>
          <p>ShoeSense.</p>
          <h1>Walk The Talk</h1>
        </div>
        <div className={styles.Addressdiv}>
          <h3>1234 Maple StreetSpringfield</h3>
          <p>IL 62704</p>
          <p>United States</p>
          <div className={styles.SocialIcons}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
