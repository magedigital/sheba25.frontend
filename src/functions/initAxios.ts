import axios from 'axios';

import { enums } from '@global/enums';

import { getCookie, setCookie } from './cookies';

const AxiosInst = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api`,
});

AxiosInst.interceptors.request.use(
    (config) => {
        const token = getCookie(enums.ACCESS_TOKEN);

        if (token) {
            config.headers.JWT = token;
        }

        config.headers.Authorization = `Basic ${btoa('dev:test9807')}`;

        return config;
    },
    (err) => Promise.reject(err),
);

AxiosInst.interceptors.response.use(
    async (response) => {
        const data = response.data as ResponseT;
        const { JWT } = data;

        if (JWT) {
            setCookie(enums.ACCESS_TOKEN, JWT);
        }

        return data;
    },
    async (e) => {
        const error = e?.response?.data as ResponseErrorT;

        if (error) {
            const { JWT } = error;

            if (JWT) {
                setCookie(enums.ACCESS_TOKEN, JWT);
            }

            // setError({ text: error.errorText });
        }

        return Promise.reject(error || {});
    },
);

export default AxiosInst;
