import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await fetch('http://localhost:3000/checkAuth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.ok) {
                        setOk(true);
                    }
                }
            } catch (error) {
                console.error('Error checking auth', error);
                setOk(false);
            }
        };

        if (auth?.token) authCheck();

    }, [auth?.token]);

    return ok ? <Outlet /> : <div>Unauthorized</div>;

}
