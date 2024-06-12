import React from 'react';
import styles from '../styles/profile.module.css';
import Header from '../components/header';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const [auth, setAuth] = useAuth();
    const { userData } = auth;
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear auth context
        setAuth({
            userData: null,
            token: ''
        });
        // Clear local storage
        localStorage.removeItem("auth");
        // Navigate to landing page
        navigate('/');
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    const {
        name,
        gender,
        age,
        email,
        shoeBrandPreference,
        priceRangePreference,
        shoeColorPreference,
        hobbies
    } = userData;

    // const brandPreference = ["Nike", "Adidas", "Vans", "Converse", "Puma"];
    // const priceRangePreference = "$0 - $50";
    // const shoeColorPreference = ["Black", "White", "Pink", "Brown", "Green", "Red"];
    // const hobbies = ["Active/Athletic", "Casual/Comfort-Seeker", "Adventurous/Outdoor Enthusiast", "Minimalist/Practical"];
    // const name = "Haseebullah";
    // const gender = "Male";
    // const age = 21;
    // const dob = "2003-08-14";
    // const country = "Pakistan";
    // const email = "haseebullah1408@gmail.com";
    // const password = "********";

    return (
        <div>
            <Header />
            <div className={styles.profileContainer}>
                <h1 className={styles.title}>PROFILE</h1>
                <div className={styles.profileDetails}>
                    <p className={styles.name}><strong>Name:</strong> {name}</p>
                    <p className={styles.gender}><strong>Gender:</strong> {gender}</p>
                    <p className={styles.age}><strong>Age:</strong> {age}</p>
                    {/* <p className={styles.dob}><strong>Date of Birth:</strong> {dob}</p> */}
                    {/* <p className={styles.country}><strong>Country:</strong> {country}</p> */}
                    <p className={styles.email}><strong>Email:</strong> {email}</p>
                    <p className={styles.brandPreference}><strong>Brand Preference:</strong> {shoeBrandPreference.join(', ')}</p>
                    <p className={styles.priceRangePreference}><strong>Price Range Preference:</strong> {priceRangePreference}</p>
                    <p className={styles.shoeColorPreference}><strong>Shoe Color Preference:</strong> {shoeColorPreference.join(', ')}</p>
                    <p className={styles.hobbies}><strong>Hobbies:</strong> {hobbies.join(', ')}</p>
                </div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}

export default Profile;
