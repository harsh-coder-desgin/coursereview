import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authcreator from '../auth/authcreator'
export default function VerfiyAuth({ children }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const checkauth = async () => {
            try {
                const data = await authcreator.verifyauth()
                if (data) {
                    navigate("/creator");
                    return;
                }
            } catch (error) {
                const storedEmail = localStorage.getItem("email");
                const storeduserEmail = localStorage.getItem("useremail");

                if (!storedEmail && !storeduserEmail) {
                    navigate("/");
                }
            } finally {
                setLoading(false)
            }
        };
        checkauth();

    }, [navigate]);

    if (loading) return <p>Loading...</p>

    return children;

}

