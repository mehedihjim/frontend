/* 
"total_requisition": 5,
        "total_pending_requisition": 5,
        "total_approved_requisition": 0,
        "total_rejected_requisition": 0,
        "sports_category": 15,
        "sports_item": 37,
        "current_stocks": 0,
        "total_club": 0,
        "total_institute": 0,
        "total_mp": 1,
        "total_sports_officer": 0,
        "total_achievements": 0
*/

import { createSlice } from "@reduxjs/toolkit";

type TDashBoardSate = {
    total_requisition: number;
    total_pending_requisition: number;
    total_approved_requisition: number;
    total_rejected_requisition: number;
    sports_category?: number;
    sports_item?: number;
    current_stocks?: number;
    total_club?: number;
    total_institute?: number;
    total_mp?: number;
    total_sports_officer?: number;
    total_achievements?: number;
}

const initialState: TDashBoardSate = {
    total_requisition: 0,
    total_pending_requisition: 0,
    total_approved_requisition: 0,
    total_rejected_requisition: 0,
    sports_category: 0,
    sports_item: 0,
    current_stocks: 0,
    total_club: 0,
    total_institute: 0,
    total_mp: 0,
    total_sports_officer: 0,
    total_achievements: 0
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardData: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },

    },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;