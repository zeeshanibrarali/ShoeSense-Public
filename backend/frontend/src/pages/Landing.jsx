import React from 'react';
import Header from '../components/header.jsx';
import Marquee from '../components/marquee.jsx';
import nike from '../assets/NikeLogo.png';
import adidas from '../assets/AdidasLogo.png';
import puma from '../assets/PumaLogo.png';
import converse from '../assets/ConverseLogo.png';
import vans from '../assets/VansLogo.png';
import Heroimage from '../components/heroimage.jsx';
import Featuredproducts from '../components/featuredproducts.jsx';
import ContactSection from '../components/contactsection.jsx';
import Footer from '../components/Footer.jsx';
import RecommendedSection from '../components/RecommendedSection.jsx';

function Landing() {
  const logos = [nike, adidas, puma, converse, vans];

  return (
    <>
      <Header />
      <Marquee logos={logos} />
      <Heroimage />
      <Featuredproducts />
      <RecommendedSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Landing;
