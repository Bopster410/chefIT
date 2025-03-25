import { AllowedMethods } from './index.types';

export const BACKEND = 'http://109.120.191.8:8080/api/';

export const METHODS: { [method: string]: AllowedMethods } = {
    GET: 'GET',
    POST: 'POST',
};

export const STATUS = {
    SUCCESS: 200,
};
