// hooks/useAuth.js
import { removeUser, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

const useAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data') || '{}');
        const accessToken = localStorage.getItem('auth_token');

        if (userData && accessToken) {
            dispatch(setUser({ user: userData, token: accessToken }));
        } else {
            dispatch(removeUser());
        }
    }, [dispatch]);
};

export default useAuth;
