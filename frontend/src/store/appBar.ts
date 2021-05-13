import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appbar',
  initialState: { sidebarVisibility: false },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarVisibility = !state.sidebarVisibility;
    },
  },
});

export const { toggleSidebar } = appSlice.actions;
export default appSlice.reducer;
