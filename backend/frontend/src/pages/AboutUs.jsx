import React from 'react';
import styles from '../styles/aboutus.module.css';
import Header from '../components/header';
import img from '../assets/AboutUsImg.jpg';
import Footer from '../components/Footer.jsx';

function AboutUs() {
  return (
    <>
      <Header />

      <div className={styles.AboutusContainer}>
        <div className={styles.flexContainer}>
          <div>
            <img src={img} className={styles.AboutusImg} alt="AboutUsImg" />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.aboutUsHeading}>
              <span className={styles.span}>ABOU</span>T US
            </h1>
            <p classNameF={styles.aboutUsDescription}>
              Get to know your favorite online sh<span className={styles.span}>opping platform</span>
            </p>
          </div>
        </div>
        <div className={styles.aboutUsContent}>
          <p>
            ShoeSense is a leading online footwear retailer dedicated to
            providing customers with a wide selection of high-quality shoes from
            top brands like Nike, Adidas, Vans, Converse, and Puma, at
            unbeatable prices. We are passionate about shoes and believe that
            everyone deserves to express their unique style through their footwear.
          </p>
          <p>
            At ShoeSense, we pride ourselves on offering a curated selection of
            shoes for every occasion, from everyday wear to special events.
            Whether you're looking for the latest sneakers, classic dress shoes,
            or comfortable sandals, we have something for everyone.
          </p>
          <p>
            Our commitment to customer satisfaction is unwavering. We strive to
            provide exceptional customer service, fast shipping, and a
            hassle-free return process. Our team of experts is always available to
            assist you with any questions or concerns you may have.
          </p>
          <p>
            Shop ShoeSense today and experience the difference! We are confident
            you'll find the perfect pair of shoes to complete your look and
            elevate your style.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
