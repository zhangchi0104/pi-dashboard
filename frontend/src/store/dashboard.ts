import { DiskResponse } from '@/typings/response';
import { MetaResponse } from '@/typings/response';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TypedThunkApi } from './store';
interface MetaInfo {
  uptime: number;
  ipAddr: string;
  diskType: string;
  diskUsage: number;
}

export const fetchMetaInfo = createAsyncThunk<
  MetaInfo,
  void,
  TypedThunkApi
>('dashboard/fetchMetaInfo', async (action, thunkApi) => {
  try {
    const [metaResp, diskResp] = await Promise.all([
      thunkApi.extra.client.get('/meta'),
      thunkApi.extra.client.get('/disk'),
    ]);
    const diskMeta = diskResp.data as DiskResponse;
    console.log(diskMeta);
    const res = {
      uptime: (metaResp.data as MetaResponse).uptime,
      ipAddr: (metaResp.data as MetaResponse).ipAddr,
      diskType: `${diskMeta.type} - ${diskMeta.interface}`,
      diskUsage: diskMeta.usages[0].usedPercent,
    };
    return res
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

interface SliceType {
  metaInfo: MetaInfo | null;
  chartsInfo: {
    data: {
      cpu: number[];
      memory: number[];
    };
    cpuInterval: number | null;
    memInterval: number | null;
  };
}

const initialState: SliceType = {
  metaInfo: null,
  chartsInfo: {
    data: {
      cpu: [],
      memory: [],
    },
    memInterval: null,
    cpuInterval: null,
  },
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMetaInfo.fulfilled, (state, action) => {
      state.metaInfo = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
