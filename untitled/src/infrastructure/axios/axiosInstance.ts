import axios from "axios";
import {AuthStorage} from "../localStorage/authStorage.ts";
import {errorNotification} from "../../utils/notifications/errorNotification.ts";
import {ValidationError} from "./exceptions/validationError.ts";
import {$pageChanged} from "../../states/routing/events.ts";
import {Pages} from "../../dtos/routing/page.ts";

const apiBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
    baseURL: apiBaseUrl, // Get the base URL from the .env file
});

axiosInstance.interceptors.request.use((config) => {
    const token = AuthStorage.getToken();

    if (token) {
        config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: any) => {
        if (error.status === 500 && error?.response?.data?.message) {
            errorNotification("Internal error !");
        }
        if ([401, 400].includes(error.status) && error?.response?.data?.message && !error?.response?.data?.errors) {
            errorNotification(error?.response?.data?.message);
        } else if (error.status === 400 && error?.response?.data?.errors) {
            throw new ValidationError(error.response.data.errors);
        }
        if (error.status === 401) {
            AuthStorage.deleteToken();
            $pageChanged(Pages.LOGIN);
        }
        return Promise.reject(error.response);
    },
);
