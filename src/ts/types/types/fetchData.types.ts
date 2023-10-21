import { Options } from '../interface/fetch.interface';

export type FetchData = (url: string, options?: Options) => Promise<void>;

export type FetchDataParams = Parameters<FetchData>;
