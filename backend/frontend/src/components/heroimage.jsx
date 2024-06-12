import React from 'react'
import styles from '../styles/heroimage.module.css';
import Hero from '../assets/Hero.jpg';
import { Link } from 'react-router-dom';

function HeroImage() {
    return (
        <div className={styles.heroImageContainer}>
            <img src={Hero} className={styles.heroImage} alt="Hero" />
            <div className={styles.overlay}>
                <h1 className={styles.heroImageText}>
                    <span className={styles.orange}>"</span>WALK THE TALK<span className={styles.orange}>"</span>
                </h1>
                <Link to="/latest">
                    <button className={styles.heroButton}>Explore Our Latest Collection</button>
                </Link>
            </div>
        </div>
    );
}

export default HeroImage