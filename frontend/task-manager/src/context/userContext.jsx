import React, { createContext, useState, useEffect  } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New state to track loading

    useEffect(() => {
        if (user) return; // If user is already set, no need to fetch again

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false); // No token, stop loading
            return; // No token, no need to fetch user
        }
        
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false); // Stop loading after fetch attempt
            }
        };

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);  // Save token
        setLoading(false); // Ensure loading is false after update
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
      
    };
    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
        
}

export default UserProvider