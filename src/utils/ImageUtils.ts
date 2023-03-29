import _ from "lodash";

export const DOC = { extension: ["docx", "doc", "pptx", "pps"], iconFile: "https://www.amazon.com/photos/shared/rQZhhXKaRQ2L-WcwN4AVJQ.bRVF68flfITSxjU_ZMdWxd" };
export const EXCEL = { extension: ["xls", "csv", "xlsx"], iconFile: "https://www.amazon.com/photos/shared/46bssV64SN2lKn0wquegXQ.ls6DruUfkk-6qa1Rtzna-Y" };
export const PDF = { extension: ["pdf"], iconFile: "https://www.amazon.com/photos/shared/zsm1zx5vTe2GGAXRQ4wMMQ.Aq980KcnqMtUH0OZPCfBHP" };
export const IMAGE = { extension: ["jpeg", "bmp", "png", "jpg", "heic"], iconFile: "" };

const getBase64ImageFromUrl = async (imageUrl: string) => {
    if (!imageUrl || _.isEmpty(imageUrl)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject("Url is empty!");
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const res = await fetch(proxyurl + imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                resolve(reader.result);
            },
            false
        );

        reader.onerror = () => {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject(this);
        };
        reader.readAsDataURL(blob);
    });
};

const getBase64ImageInImageData = async (imageUrl: string) => {
    if (!imageUrl || _.isEmpty(imageUrl)) {
        return "";
    }
    const base64String: unknown = await getBase64ImageFromUrl(imageUrl);
    const jpgBase64 = (base64String as string).replace("data:application/octet-stream;base64", "data:image/jpg;base64");
    return jpgBase64;
};
const getBase64ListFromUrls = async (imageUrls: string[]) => {
    const base64List = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < imageUrls.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        const base64String = await getBase64ImageFromUrl(imageUrls[index]);
        const jpgBase64 = (base64String as string).replace(
            "data:application/octet-stream;base64",
            "data:image/jpg;base64"
        );
        base64List.push(jpgBase64);
    }
    return base64List;
};

function getBase64FromLocal(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

async function downloadImages(mediaUrls: any[]) {
    for (let index = 0; index <= mediaUrls.length; index += 1) {
        const mediaUrl = mediaUrls[index];
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(mediaUrl, { method: "GET", headers: {} });
        // eslint-disable-next-line no-await-in-loop
        const buffer = await response.arrayBuffer();
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
    }
}

function getImageSer(url: string, width: any, height: any, fit: boolean) {
    if (_.isEmpty(url)) {
        return "images/default.png";
    }
    let urlResult = `${url}?`;
    if (width) {
        urlResult += `w=${width}`;
    }
    if (height) {
        urlResult += `&h=${height}`;
    }
    if (fit) {
        urlResult += `&fit=crop`;
    }
    return urlResult;
}

export default {
    getBase64ImageFromUrl,
    getBase64ListFromUrls,
    getBase64FromLocal,
    getBase64ImageInImageData,
    downloadImages,
    getImageSer,
};
