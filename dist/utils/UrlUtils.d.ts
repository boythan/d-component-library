import queryString from "query-string";
declare const _default: {
    getParams: (url: string) => any;
    addUrlParam: (search: string, key: string, val: any) => string;
    getParamFromUrl: (key: string) => string | null;
    addQuery: (newQuery?: {}) => void;
    replaceQuery: (query?: {}) => void;
    removeQuery: (queryKey: string) => void;
    clearQuery: () => void;
    getQuery: () => queryString.ParsedQuery<string>;
};
export default _default;
