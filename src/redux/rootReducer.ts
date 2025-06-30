import {
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./features/auth/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import permissionsReducer from "./features/permission/permissionSlice";

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const reducer = {
    auth: persistedAuthReducer,
    dashboard: dashboardReducer,
    permissions : persistReducer({key: 'permissions', storage}, permissionsReducer),
}