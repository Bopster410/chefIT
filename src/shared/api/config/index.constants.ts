import { AllowedMethods } from './index.types';

export const BACKEND = 'https://www.chef-it.online/api/';

export const METHODS: { [method: string]: AllowedMethods } = {
    GET: 'GET',
    POST: 'POST',
};

export const STATUS = {
    SUCCESS: 200,
};
