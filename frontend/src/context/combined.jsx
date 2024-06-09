import React, { createContext, useContext, useState } from 'react';

const CombinedContext = createContext();

const CombinedProvider = ({ children }) => {
    const [combinedData, setCombinedData] = useState({
        name: '',
        gender: '',
        age: '',
        dob: '',
        country: '',
        email: '',
        password: '',
        correctPass: '',
        brandPreference: [],
        priceRangePreference: '',
        shoeColorPreference: [],
        hobbies: []
    });

    return (
        <CombinedContext.Provider value={{ combinedData, setCombinedData }}>
            {children}
        </CombinedContext.Provider>
    );
};

const useCombined = () => useContext(CombinedContext);

export { useCombined, CombinedProvider };