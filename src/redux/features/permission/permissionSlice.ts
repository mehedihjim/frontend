import { createSlice } from "@reduxjs/toolkit";
type TPermissionState = {
    permissions: null | string[];
}
const initialState: TPermissionState = {
    permissions: null,
}
const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        removePermissions: (state) => {
            state.permissions = null;
        },
    },
});
export const { setPermissions, removePermissions } = permissionSlice.actions;
export default permissionSlice.reducer;