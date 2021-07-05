const UNAUTHORIZE = 401;
const DATA_ERROR = 400;

const FAKE_TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmRhNDEwNC01NDY4LTQwY2MtODU1Ni1kZjg4NzY0OGZiOGEiLCJqdGkiOiI5ZmZlNjUwNzQwMDRmZjY1MzY4ZmEyZjAwN2ZhY2I2MGRlY2Q3NGFmZjUwOWNhNmI4ZmM3YTBhNDIyYzZmZDdlMDJlNTIwMjBiYTZjYWQ1NyIsImlhdCI6MTYyMTkzNDY3NSwibmJmIjoxNjIxOTM0Njc1LCJleHAiOjE2NTM0NzA2NzUsInN1YiI6ImY4ZjUwMjdmLTdiMTItMTFlYi05MDIyLWNlN2ZjZGYxMWQzMCIsInNjb3BlcyI6W119.QOrc-ngJFxakJNVMI2stK1L2zyBArmvtLHZtfE5OPefj8azpI2Qxlvvp_EmN_RAV-pkW5YK1qv5Lpc6SHhKR6te9GL8xw3bFbVaKbcDxvNHLkx3zhsGszXeWxt-PoVVscQ1lk5q3z3yJhlYdiOXXECPuVwSVWVV3JQo9D9e-kepjk_8-_bd-klzzP1ST3pMlm5V7-MEMYrRB3de_M3ydjhH77ZJLGNyhNWPKV0h40ysM-zUmzynnX7InpzIS26Lr9dKNw0jW69RNwCpDRAfkYX9enhGYqMyRYCWxXmgojiqVkIXOvi4Ec61QjdRJig2W3dcWwt3a_QSaabTvv6Y0Xp-NbL1dl9GsPkHQZmlMH4fYS744lK0F854Ik_4SMeQO57ZUatGxrRFvw5AF04mrSF3cblH-W419am4uXeEiOMKHfBeuzrSj5Vu8BbRiHmWwHl-H4K-nSoe2TRz6_IGuahn-4S9xiFnUOzX3QIqZ_Br7lrFLN4A5EJmG4uYwLDZvwtct-lNiLqmEMp3UovTr3qlBr1GXoMRvLRAlfPMYKipmCJ1bhPYoXyXoOhAwluAM7F24o5GIB43DjD5_dOXYniuUAa7z3ObLtJDtkbtdif3MUyrHKlv9tfrf_c87lFrfTMfYGkLpgZ6pBKz0B7S3ZtkkgNi1oUbVwN98eiZLBrs";
const SALE_TOKEN = "2kzELbMCer83lBdECOWVH6c95VDfTponZ0YOGxMbLuPud1dJPDdYE8nqzU05";
export const AccessTokenInterceptor = {
    addAccessToken: (config: any) => {
        const headers = { ...config.headers, Accept: "application/json" };
        try {
            // const accessToken = store.getState().auth?.user?.accessToken;
            const accessToken = FAKE_TOKEN;
            // const accessToken = SALE_TOKEN;
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (err: any) {
            console.log({ err });
        }
        return { ...config, headers };
    },

    onRejected: (error: any) => {
        return Promise.reject(error);
    },
};

// export const AddTokenToURL = {
//     addAccessToken: (config) => {
//         if (process.env.REACT_APP_ENV === "local") {
//             const addedParamUrl = URLUtils.addUrlParam(config?.url, "api_token", ACCESS_TOKEN);
//             config.url = addedParamUrl;
//         }

//         return config;
//     },
//     onRejected: (error) => {
//         return Promise.reject(error);
//     },
// };

export const LanguageInterceptor = {
    addLanguage: (config: any) => {
        const language = "en";
        const headers = { ...config.headers, language };
        return { ...config, headers };
    },
};

// export const PermissionInterceptor = {
//     checkPermission: (config) => {
//         if (PermissionUtils.isGrantURLPermission(config.url, config.method)) {
//             return config;
//         }
//         const urlSlash = config.url.split("/");
//         const urlTail = urlSlash[urlSlash.length - 1];
//         Notifications.showError(Messages.youNotHavePermission + " " + urlTail);
//         return Promise.reject({
//             message: Messages.youNotHavePermission + " " + urlTail,
//         });
//     },
// };

export const UnauthorizeInterceptor = {
    onFullfilled: (response: any) => {
        return Promise.resolve(response);
    },

    onRejected: (error: any) => {
        if (error) {
            const status = error?.response?.status;
            if (status === UNAUTHORIZE) {
                return Promise.reject(error);
            }
            if (status === DATA_ERROR) {
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
        return Promise.resolve();
    },
};
