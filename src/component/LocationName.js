// src/MyContext.js
import React, { createContext, useState, useContext } from 'react';

const LocationName = createContext();


export const MyProvider = ({ children }) => {
    const [name, setName] = useState('');

    return (
        <LocationName.Provider value={{ name, setName }}>
            {children}
        </LocationName.Provider>
    );
};

// Custom hook to use LocationName context
export const useLocationName = () => useContext(LocationName);

export default LocationName;
