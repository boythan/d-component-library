import axios from "axios";
import { AccessTokenInterceptor, LanguageInterceptor, UnauthorizeInterceptor } from "./Interceptors";
import { API_BRAND, API_PRODUCT, API_SIGN_IN, API_UPLOAD_FILE } from "./URL";

const BASE_URL = "https://api-dev.mattresscity.co.th/";
const getInstance = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        // baseURL: AppConfig.getAPIBaseUrl(),
        timeout: 120000,
    });

    instance.interceptors.response.use(UnauthorizeInterceptor.onFullfilled, UnauthorizeInterceptor.onRejected);
    instance.interceptors.request.use(AccessTokenInterceptor.addAccessToken, AccessTokenInterceptor.onRejected);
    instance.interceptors.request.use(LanguageInterceptor.addLanguage);

    return instance;
};

const API = {
    instance: getInstance(),
    switchServer: () => {
        API.instance = getInstance();
    },

    callApi: (url: string, body: any) => {
        return API.instance.post(url, body);
    },

    // ----------------------------------------
    // -- SIGN IN
    // ----------------------------------------

    signIn: (body: any) => {
        return API.instance.post(API_SIGN_IN, body);
    },

    // ----------------------------------------
    // -- BRAND
    // ----------------------------------------

    brandList: (body: any, paging: any) => {
        return API.instance.get(API_BRAND, {
            params: {
                page: paging?.pageIndex ?? 1,
                per_page: paging?.pageSize ?? 20,
                ...body,
            },
        });
    },

    productList: (body: any, paging: any) => {
        return API.instance.get(API_BRAND, {
            params: {
                page: paging?.pageIndex ?? 1,
                per_page: paging?.pageSize ?? 20,
                ...body,
            },
        });
    },

    uploadFile: (body: any) => {
        return API.instance.post(API_UPLOAD_FILE, body);
    },
};

export default API;
