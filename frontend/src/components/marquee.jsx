import React from 'react';
import styles from '../styles/marquee.module.css';

function Marquee({ logos }) {
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos]; // Duplicate logos multiple times

  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeContent}>
        {duplicatedLogos.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index + 1}`} className={styles.smallLogo} />
        ))}
      </div>
    </div>
  );
}

export default Marquee;
