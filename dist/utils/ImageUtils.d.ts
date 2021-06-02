declare function getBase64FromLocal(img: any, callback: any): void;
declare function downloadImages(mediaUrls: any[]): Promise<void>;
declare function getImageSer(url: string, width: any, height: any, fit: boolean): string;
declare const _default: {
    getBase64ImageFromUrl: (imageUrl: string) => Promise<unknown>;
    getBase64ListFromUrls: (imageUrls: string[]) => Promise<string[]>;
    getBase64FromLocal: typeof getBase64FromLocal;
    getBase64ImageInImageData: (imageUrl: string) => Promise<string>;
    downloadImages: typeof downloadImages;
    getImageSer: typeof getImageSer;
};
export default _default;
