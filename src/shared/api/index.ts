import { BACKEND, METHODS } from './config';
import {
    QueryParams,
    RequestConfig,
    Response,
    SlugParam,
    Body,
} from './index.types';

export { BACKEND, STATUS } from './config/index.constants';
export { throttle } from './throttling';

export async function ajax<T>({
    url,
    method,
    body,
    queryParams,
    slugParam,
}: RequestConfig) {
    let fullUrl = BACKEND + url;

    if (queryParams) {
        const newUrl = new URL(fullUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            newUrl.searchParams.append(key, `${value}`);
        });
        fullUrl = newUrl.toString();
    }

    if (slugParam) fullUrl += `/${slugParam}`;

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
}: {
    url: string;
    queryParams?: QueryParams;
    slugParam?: SlugParam;
}) {
    return ajax<T>({ url, method: METHODS.GET, queryParams, slugParam });
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
