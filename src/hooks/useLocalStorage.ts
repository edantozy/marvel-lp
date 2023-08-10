import { useEffect, useState } from "react";


// Custom hook for using localStorage
export const useLocalStorage = (key: string, initialValue: string) => {
    // Create a state variable and a function to update it
    const [value, setValue] = useState(() => {
        // Get the value from localStorage using the key
        const storedValue = localStorage.getItem(key);
        // If the value exists, parse it and return it
        // Otherwise, return the initial value
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    // Use useEffect to sync the state with localStorage
    useEffect(() => {
        // Set the value in localStorage using the key and the state value
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]); // Only run when the key or the value changes

    // Return the state variable and the function to update it
    return [value, setValue];
}