import { AllowedMethods } from './config';

export interface Response<T> {
    Data: T;
    Status: number;
}

export type Body = object;
export type QueryParams = { [key: string]: string | number };
export type SlugParam = string | number;

export interface RequestConfig {
    url: string;
    method: AllowedMethods;
    body?: Body;
    queryParams?: QueryParams;
    slugParam?: SlugParam;
}
