/* eslint-disable prefer-template */
import _ from "lodash";
import queryString from "query-string";

const getParams = function (url?: string) {
    const params: any = {};
    const parser = document.createElement("a");
    const currentUrl = document.location.href;
    parser.href = url || currentUrl;
    const query = parser.search.substring(1);
    const vars = query.split("&");
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

const addUrlParam = (search: string, key: string, val: any) => {
    const newParam = `${key}=${val}`;
    let params = `&${newParam}`;
    // If the “search” string exists, then build params from it
    if (search) {
        // Try to replace an existance instance
        params = search.replace(new RegExp(`([?&])${key}[^&]*`), `$1${newParam}`);
        // If nothing was replaced, then add the new param to the end
        if (params === search) {
            if (_.includes(search, "?")) {
                params += `&${newParam}`;
            } else {
                params += `?${newParam}`;
            }
        }
    }
    return params;
};

const getParamFromUrl = (key: string) => {
    if (typeof key !== "string") {
        // eslint-disable-next-line no-throw-literal
        throw "Key is not a string";
    }
    const urlString = window.location.href;
    const url = new URL(urlString);
    const param = url.searchParams.get(key);
    return param;
};

const pushState = (obj: { [key: string]: any }) => {
    const url = new URL(window.location as any);
    if (_.isEmpty(obj)) {
        const originUrl = window.location.href.substring(window.location.href.lastIndexOf("/") + 1).split("?")[0];
        return window.history.pushState("", "", ("/" + originUrl) as any);
    }
    Object.keys(obj).forEach((key) => {
        url.searchParams.set(key, obj[key]);
    });
    return window.history.pushState("", "", url as any);
};

const replaceState = (obj: { [key: string]: any }) => {
    const url = new URL(window.location as any);
    if (_.isEmpty(obj)) {
        const originUrl = window.location.href.substring(window.location.href.lastIndexOf("/") + 1).split("?")[0];
        return window.history.replaceState("", "", ("/" + originUrl) as any);
    }
    url.search = "";
    Object.keys(obj).forEach((key) => {
        url.searchParams.set(key, obj[key]);
    });
    return window.history.replaceState("", "", url as any);
};

const deleteState = (key: string) => {
    const url = new URL(window.location as any);
    url.searchParams.delete(key);
    return window.history.replaceState("", "", url as any);
};

//* *************************************USE FOR NEW UPDATE PARAMS********************************************** */

const addQuery = (newQuery = {}) => {
    const currentPath = window.location.origin + window.location.pathname;
    const { query } = queryString.parseUrl(window.location.href);
    const resultQuery = { ...query, ...newQuery };
    window.open(queryString.stringifyUrl({ url: currentPath, query: resultQuery }), "_self");
};

const replaceQuery = (query = {}) => {
    const currentPath = window.location.origin + window.location.pathname;
    window.open(queryString.stringifyUrl({ url: currentPath, query }), "_self");
};

const removeQuery = (queryKey: string) => {
    const currentPath = window.location.origin + window.location.pathname;
    const { query } = queryString.parseUrl(window.location.href);
    delete query[queryKey];
    window.open(queryString.stringifyUrl({ url: currentPath, query }), "_self");
};

const clearQuery = () => {
    const currentPath = window.location.origin + window.location.pathname;
    window.open(currentPath, "_self");
};

const getQuery = () => {
    const { query } = queryString.parseUrl(window.location.href);
    return query;
};

//

const getValidUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`;
    }

    return newUrl;
};

export default {
    getParams,
    addUrlParam,
    getParamFromUrl,
    addQuery,
    replaceQuery,
    removeQuery,
    clearQuery,
    getQuery,
    pushState,
    replaceState,
    deleteState,
    getValidUrl,
};
