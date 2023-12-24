import { Options } from '../interface/fetch.interface';

export type FetchData<T> = (
  url: string,
  options?: Options
) => Promise<{ code: number; message: string; data: T }>;

export type FetchDataParams<T> = Parameters<FetchData<T>>;
