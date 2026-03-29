import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // Fetch Blogs
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');

            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // Load initial data
    useEffect(() => {
        fetchBlogs();

        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = storedToken;
        }

    }, []);

    const value = {
        axios,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook
export const useAppContext = () => {
    return useContext(AppContext);
};