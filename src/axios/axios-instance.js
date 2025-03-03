import axios from "axios";
import axiosRetry from "axios-retry";

export function createAxiosInstance(baseURL) {

    const instance = axios.create({
        baseURL: baseURL,
        timeout: process.env.REQUEST_TIMEOUT,
    });

    instance.interceptors.request.use(
        (config) => {

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.data) {
                error.message = error.response.data;
            }
            return Promise.reject(error);
        }
    );

    axiosRetry(instance, { retries: process.env.AXIOS_RETRIES });

    return instance;
}
