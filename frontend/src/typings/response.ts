export interface MemoryResponse {
  total: number,
  free: number,
  used: number,
  freePercent: number,
  usedPercent: number
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
    }
}

interface _DiskResponseItem{
    used: number;
    available: number;
    total: number;
    usedPercent: number;
    mountPoint: string;

}
export type DiskResponse = _DiskResponseItem[]