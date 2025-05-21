import { BACKEND, METHODS } from './config';
import {
    QueryParams,
    RequestConfig,
    Response,
    SlugParam,
    Body,
} from './index.types';

export { BACKEND, STATUS } from './config';
export { throttle } from './throttling';
export type { Response } from './index.types';

export async function ajax<T>({
    url,
    method,
    body,
    queryParams,
    slugParam,
}: RequestConfig) {
    let fullUrl = BACKEND + url;
    // if (MODE === 'development') fullUrl = BACKEND_DEV + url;
    if (slugParam) fullUrl += `/${slugParam}`;

    if (queryParams) {
        const newUrl = new URL(fullUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            newUrl.searchParams.append(key, `${value}`);
        });
        fullUrl = newUrl.toString();
    }

    const headers = new Headers();
    if (body) {
        headers.set('Content-Type', 'application/json; charset=utf8');
    }

    return fetch(fullUrl, {
        method,
        credentials: 'include',
        body: body == null ? null : JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .then((data: Response<T>) => {
            return data;
        })
        .catch((error: Response<T>) => {
            return error;
        });
}

export async function ajaxGet<T>({
    url,
    queryParams,
    slugParam,
    body,
}: {
    url: string;
    queryParams?: QueryParams;
    slugParam?: SlugParam;
    body?: Body;
}) {
    return ajax<T>({
        url,
        method: METHODS.GET,
        queryParams,
        slugParam,
        body: body,
    });
}

export async function ajaxPost<T>({
    url,
    queryParams,
    body,
    slugParam,
}: {
    url: string;
    queryParams?: QueryParams;
    body?: Body;
    slugParam?: SlugParam;
}) {
    return ajax<T>({ url, method: METHODS.POST, queryParams, body, slugParam });
}
