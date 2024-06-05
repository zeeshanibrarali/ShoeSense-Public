import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

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
                    } else {
                        setOk(false);
                        toast.warn('Please log in to access this page.');
                        navigate('/account', { replace: true });
                    }
                }
            } catch (error) {
                console.error('Error checking auth', error);
                setOk(false);
                navigate('/account');
                toast.warn('Please log in to access this page.');
            }
        };

        if (auth?.token) authCheck();
        else {
            toast.warn('Please log in to access this page.');
            navigate('/account', { replace: true });
        }

    }, [auth?.token]);

    return ok ? <Outlet /> : null;

}
