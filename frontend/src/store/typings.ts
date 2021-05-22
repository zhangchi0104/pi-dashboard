export interface MetaInfo {
  uptime: number;
  ipAddr: string;
  diskType: string;
  diskUsage: number;
}

export interface CpuInfo {
  load: number,
  temperature: number,
  clockSpeed: number,
  cores: number
}

export interface MemoryInfo {
  usedPercent: number;
  total: number;
  bufferCached: number;
  swapTotal: number;
  swapUsed: number;
}
export interface SliceType {
  metaInfo: MetaInfo | null;
  cpuInfo: CpuInfo | null;
  memInfo: MemoryInfo | null;
  chartsData: {
    cpu: number[],
    memory: number[]
  }
}
