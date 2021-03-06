/** @format */

export interface MemoryResponse {
  total: number;
  used: number;
  swapUsed: number;
  swapTotal: number;
  usedPercent: number;
  cached: number;
  bufferCache: number;
}

export interface CpuResponse {
  coreCount: number;
  clockSpeed: number;
  temperature: number;
  load: {
    total: number;
    user: number;
    nice: number;
    system: number;
    idle: number;
    cpus: {
      total: number;
      user: number;
      nice: number;
      system: number;
      idle: number;
    }[];
  };
}

export interface CpuLoadResponse {
  clockSpeed: number;
  temperature: number;
  load: number;
}

export interface MemLoadResponse {
  used: number;
  usedPercent: number;
  bufferCache: number;
}

interface _DiskResponseItem {
  used: number;
  available: number;
  total: number;
  usedPercent: number;
  mountPoint: string;
}
export interface DiskResponse {
  usages: _DiskResponseItem[];
  type: string;
  interface: string;
}

export interface MetaResponse {
  os: string;
  ipAddr: string;
  username: string;
  uptime: number;
}

export interface LoadsChartResponse {
  memory: (string | number)[];
  cpu: (string | number)[];
}

export interface ContainerListSummaryResponseItem {
  id: string;
  name: string;
  created: number;
  status: string;
  ports: {
    IP?: string;
    PrivatePort: number;
    PublicPort?: number;
    Type: string;
  }[];
  service: string | null;
}

export type ContainerListSummaryResponse = ContainerListSummaryResponseItem[];
