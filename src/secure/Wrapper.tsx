import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Menu from './components/Menu';
import { useNavigate } from "react-router-dom"; // ✅ import this
import api from '../libs/axiosInstance';

interface WrapperProps {
    children?: React.ReactNode;
}



const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Example: assuming axios has a baseURL configured
                const response = await api.get("profile");
                console.log("Authenticated user:", response.data);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]); // dependency array ensures it runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )

}

export default Wrapper;