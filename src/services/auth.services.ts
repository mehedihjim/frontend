import { authKey } from '@/constants/authKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import {
    getFromLocalStorage,
    removeFromLocalStorage, setToLocalStorage
} from '@/utils/local-storage';

export const storeToken = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken);
};
export const getUserInfo = () => {
    const data = getFromLocalStorage('data');

    if (data) {
        const d = JSON.parse(data);
        return {
            ...d,
            role: d?.role?.toLowerCase(),
        };
    } else {
        return '';
    }
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return !!authToken;
    }
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
    return await axiosInstance({
        url: 'http://localhost:5000/api/v1/auth/refresh-token',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};