import { AllowedMethods } from './index.types';

export const BACKEND = 'https://www.chef-it.online/api/';
export const BACKEND_DEV =
    'https://www.chef-it.online/api/';

export const METHODS: { [method: string]: AllowedMethods } = {
    GET: 'GET',
    POST: 'POST',
};

export const STATUS = {
    SUCCESS: 200,
};

// export const MODE = process.env.NODE_ENV;
export const MODE = 'production';
