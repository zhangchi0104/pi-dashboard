import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    url: '192.168.50.26',
    port: 3000,
    token: '',
    apiPath: '/api/v1'
  },
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setPort: (state, action: PayloadAction<number>) => {
      state.port = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUrl, setPort, setToken } = configSlice.actions;
export default configSlice.reducer;
