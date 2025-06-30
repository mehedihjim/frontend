import { removePermissions, setPermissions } from '@/redux/features/permission/permissionSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

const usePermission = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const user_data = JSON.parse(localStorage.getItem('data') || '[]');
        if (user_data && user_data.permissions) {
            dispatch(setPermissions(user_data.permissions));
        } else {
            dispatch(removePermissions());
        }
    }, [dispatch]);
};

export default usePermission;