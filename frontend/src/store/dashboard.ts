import {
  CpuResponse,
  DiskResponse,
  CpuLoadResponse,
  MemoryResponse,
  MemLoadResponse,
} from '@/typings/response';
import {
  MetaResponse,
  LoadsChartResponse,
  ContainerListSummaryResponse,
} from '@/typings/response';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedThunkApi } from './store';
import { MetaInfo, SliceType } from './typings';

export const fetchMetaInfo = createAsyncThunk<MetaInfo, void, TypedThunkApi>(
  'dashboard/fetchMetaInfo',
  async (action, thunkApi) => {
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
      return res;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const fetchCpuInfo = createAsyncThunk<CpuResponse, void, TypedThunkApi>(
  'dashboard/fetchCpuInfo',
  async (action, thunkApi) => {
    try {
      const resp = await thunkApi.extra.client.get('/cpu');
      return resp.data as CpuResponse;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const fetchCpuLoad = createAsyncThunk<
  CpuLoadResponse,
  void,
  TypedThunkApi
>('dashboard/fetchCpuLoad', async (action, thunkApi) => {
  try {
    const resp = await thunkApi.extra.client.get('/cpu/load');
    return resp.data as CpuLoadResponse;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});
export const fetchMemoryInfo = createAsyncThunk<
  MemoryResponse,
  void,
  TypedThunkApi
>('dashboard/fetchMemoryInfo', async (action, thunkApi) => {
  try {
    const resp = await thunkApi.extra.client.get('/memory');
    return resp.data as MemoryResponse;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});
export const fetchMemoryLoad = createAsyncThunk<
  MemLoadResponse,
  void,
  TypedThunkApi
>('dashboard/fetchMemoryLoad', async (action, thunkApi) => {
  try {
    const resp = await thunkApi.extra.client.get('/memory');
    return resp.data as MemLoadResponse;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const fetchChartData = createAsyncThunk<
  LoadsChartResponse,
  number,
  TypedThunkApi
>('dashboard/fetchLoadsChart', async (action, thunkApi) => {
  try {
    const resp = await thunkApi.extra.client.get('/charts/loads');
    return resp.data as LoadsChartResponse;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const fetchContainerInfo = createAsyncThunk<
  ContainerListSummaryResponse,
  void,
  TypedThunkApi
>('dashboard/fetchContainerSummary', async (action, thunkApi) => {
  try {
    const resp = await thunkApi.extra.client.get(
      '/docker/containers/?verbose=false'
    );
    return resp.data as ContainerListSummaryResponse;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});
const initialState: SliceType = {
  metaInfo: null,
  cpuInfo: null,
  memInfo: null,
  chartsData: {
    cpu: [],
    memory: [],
  },
  containerInfo: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMetaInfo.fulfilled, (state, action) => {
      state.metaInfo = action.payload;
    });
    builder.addCase(fetchCpuInfo.fulfilled, (state, action) => {
      state.cpuInfo = {
        clockSpeed: action.payload.clockSpeed,
        cores: action.payload.coreCount,
        load: action.payload.load.total,
        temperature: action.payload.temperature,
      };
    });
    builder.addCase(fetchCpuLoad.fulfilled, (state, action) => {
      state.cpuInfo!.temperature = action.payload.temperature;
      state.cpuInfo!.clockSpeed = action.payload.clockSpeed;
      state.cpuInfo!.load = action.payload.load;
    });
    builder.addCase(fetchMemoryInfo.fulfilled, (state, action) => {
      const res = action.payload;
      state.memInfo = {
        bufferCached: res.bufferCache,
        swapTotal: res.swapTotal,
        swapUsed: res.swapUsed,
        total: res.total,
        usedPercent: res.usedPercent,
      };
    });
    builder.addCase(fetchMemoryLoad.fulfilled, (state, action) => {
      const res = action.payload;
      state.memInfo!.usedPercent = res.usedPercent;
      state.memInfo!.bufferCached = res.bufferCache;
    });
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      const { cpu, memory } = action.payload;

      if (state.chartsData.cpu.length >= 20) {
        state.chartsData.cpu.shift();
        state.chartsData.memory.shift();
      }

      state.chartsData.cpu.push(cpu);
      state.chartsData.memory.push(memory);
    });
    builder.addCase(fetchContainerInfo.fulfilled, (state, action) => {
      state.containerInfo = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
