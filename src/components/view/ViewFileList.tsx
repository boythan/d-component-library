/* eslint-disable indent */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// react
import ClassNames from "classnames";
// third-party
import _ from "lodash";
import React, { ImgHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// data stubs
import Messages from "../../language/Messages";
import { DOC, EXCEL, PDF } from "../../utils/ImageUtils";
import StringUtils from "../../utils/StringUtils";
import { AvatarProps } from "../avatar/Avatar";
import Button from "../button/Button";
import Icon from "../elements/icon/Icon";
import Notifications from "../notifications/Notifications";
// application

const FILE_TYPE = [DOC, EXCEL, PDF];

export interface IModalLightBox {
    open: boolean;
    onClose: (props?: any) => void;
    images: Array<{ src: string; caption?: string }>;
    currentIndex?: number;
}

export interface IFilePreviewProps extends ImgHTMLAttributes<any> {
    onRemove?: (props?: any) => any;
    removable?: boolean;
    onClick?: (props?: any) => any;
    videoUrl?: any;
    className?: string;
    classNameItem?: string;
    size?: AvatarProps["size"];
    hasLightBox?: boolean;
    renderContent?: (props: { className?: string; onClick?: any }) => React.ReactNode;
}

export interface IRenderPreviewFileProps extends IFilePreviewProps {
    item?: any;
    extension?: any;
    name?: any;
    onViewImage?: (props?: any, src?: any) => any;
    fileTypeSource?: Array<any>;
    customItem?: (props: any) => any;
}

export interface IViewFileListProps {
    className?: string;
    classNameList?: string;
    classNameSquare?: string;
    classNameButton?: string;
    buttonText?: string;
    getFile?: (props?: any) => any;
    getImage?: (props?: any) => any;
    getVideo?: (props?: any) => any;
    getSource?: (props?: any) => any;
    getName?: (props?: any) => any;
    onRemoveUploaded?: (props?: any) => any;
    uploadedFiles?: any[];
    video?: any[];
    uploadImagesOnly?: boolean;
    showButton?: boolean;
    disabled?: boolean;
    justGetFile?: boolean;
    removableUploaded?: boolean;
    allowNoExtension?: boolean;
    variant?: "square" | "button";
    fileItemProps?: Partial<IFilePreviewProps>;
    maxUploadedImageDisplay?: number;
}

export const ModalLightBox: React.FC<IModalLightBox> = ({ open, onClose, currentIndex = 0, images }) => {
    const slides = images.map((img) => ({
        src: img.src,
        alt: img.caption || "",
        title: img.caption || "",
    }));

    return <Lightbox open={open} close={onClose} slides={slides} index={currentIndex} />;
};

export const FilePreview: React.FC<IFilePreviewProps> = ({
    src,
    onRemove,
    onClick,
    renderContent,
    removable = true,
    videoUrl = null,
    className = "",
    classNameItem = "",
    size = "x-large",
    hasLightBox = false,
}) => {
    const [openLightBox, setOpenLightBox] = useState(false);
    const imageClass = ClassNames(
        "cursor-pointer object-cover rounded-md border border-gray-200 block",
        {
            "w-24 h-24": size === "x-large",
            "w-20 h-20": size === "large",
            "w-16 h-16": size === "medium",
            "w-12 h-12": size === "small",
            "w-10 h-10": size === "x-small",
            "w-8 h-8": size === "xx-small",
        },
        classNameItem
    );
    const videoClass = ClassNames(
        "rounded-md overflow-hidden",
        // Reuse sizing logic or specific video sizing
        {
            "w-24 h-24": size === "x-large",
            // ... map other sizes if needed, or keep fixed as before
        },
        classNameItem
    );

    const onClickImage = () => {
        if (hasLightBox) {
            setOpenLightBox(true);
        }
        onClick && onClick();
    };

    let content: any = renderContent ? (
        renderContent({ className: imageClass, onClick: onClickImage })
    ) : (
        <img
            className={imageClass}
            src={src}
            onClick={() => {
                if (hasLightBox) {
                    setOpenLightBox(true);
                }
                onClick && onClick();
            }}
            alt="upload-item"
        />
    );
    if (videoUrl) {
        content = renderContent ? (
            renderContent({ className: videoClass })
        ) : (
            <iframe
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                title="item"
                className={videoClass}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                width="200px" // Could be dynamic
                height="126px"
            />
        );
    }
    return (
        <div className={`relative inline-block ${className}`}>
            {removable && (
                <div
                    onClick={() => onRemove && onRemove()}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md cursor-pointer text-red-500 z-10 hover:bg-gray-100 flex items-center justify-center w-5 h-5"
                >
                    <Icon name="delete" className="text-xs" />
                </div>
            )}
            {content}
            <ModalLightBox
                open={openLightBox}
                onClose={() => setOpenLightBox(false)}
                images={[{ src: src as string }]}
            />
        </div>
    );
};

export const RenderPreviewFile: React.FC<IRenderPreviewFileProps> = ({
    item,
    extension,
    name,
    src,
    removable = false,
    onViewImage,
    onRemove,
    fileTypeSource,
    customItem,
    ...rest
}) => {
    const foundTypeDocument = useMemo(() => {
        return _.find(fileTypeSource || FILE_TYPE, (type) => _.includes(type?.extension ?? [], extension));
    }, [FILE_TYPE, extension]);

    if (customItem) {
        return customItem({ foundTypeDocument, src, item, extension });
    }

    if (foundTypeDocument) {
        return (
            <div className="inline-block relative group">
                <a href={item?.url} target="_blank" rel="noreferrer" className="block">
                    <FilePreview
                        onRemove={() => onRemove && onRemove(item)}
                        src={foundTypeDocument?.iconFile}
                        removable={removable}
                        {...rest}
                    />
                    {!removable && (
                        <div className="hidden group-hover:flex absolute inset-0 bg-black/50 items-center justify-center text-white text-xs rounded-md">
                            get app icon
                        </div>
                    )}
                </a>
            </div>
        );
    }
    return (
        <div className="inline-block leading-none">
            <FilePreview
                onRemove={() => onRemove && onRemove(item)}
                src={src || item?.imageData}
                removable={!!removable}
                onClick={() => onViewImage && onViewImage(item, src)}
                {...rest}
            />
        </div>
    );
};

const ViewFileList: React.FC<IViewFileListProps> = ({
    className,
    classNameList,
    classNameSquare,
    classNameButton,
    buttonText = Messages.browsefiles,
    uploadedFiles = [],
    uploadImagesOnly = false,
    showButton = true,
    getFile,
    getVideo,
    getImage,
    getName = (item) => item?.name ?? "noName",
    getSource = (file) => file?.url ?? "",
    onRemoveUploaded,
    justGetFile = false,
    disabled = false,
    removableUploaded = false,
    video = [],
    allowNoExtension = true,
    variant = "button",
    maxUploadedImageDisplay,
    fileItemProps,
}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noDragEventsBubbling: true,
        // eslint-disable-next-line max-len
    } as any); // add noDragEventsBubbling = true so the onDrop function will still be activated if there is another drop component present in the window
    const [attachments, setAttachments] = useState<any>([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [modalImageView, setModalImageView] = useState(false);
    const listImageRef = useRef<any>([]);
    const isSquare = variant === "square";
    const inputParam = uploadImagesOnly ? { accept: "image/x-png,image/jpeg,image/heic" } : {};
    const containerClass = ClassNames(
        "w-full",
        "flex",
        {
            "flex-col": !isSquare,
            "items-start": isSquare,
        },
        className
    );
    const listClass = ClassNames("flex flex-wrap items-center gap-2", classNameList);
    const buttonSquareClass = ClassNames(
        "bg-white p-2 ml-2 border-2 border-dashed border-primary text-xs text-primary rounded-md w-24 h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors",
        classNameSquare
    );

    useEffect(() => {
        listImageRef.current = [...attachments, ...uploadedFiles];
    }, [attachments, uploadedFiles, uploadedFiles?.length]);

    function onDrop(fileUpload = []) {
        if (
            !allowNoExtension &&
            _.some(fileUpload, (iFile: any) => {
                const fileExtension = StringUtils.getExtensionFromFilename(iFile?.name);
                return !fileExtension || !iFile?.type;
            })
        ) {
            return Notifications.showError(Messages.errorUploadingFile);
        }
        if (justGetFile) {
            getFile && getFile(fileUpload);
            return null;
        }

        const fileResult: any = [];
        return fileUpload.forEach(async (file, index) => {
            const reader = new FileReader();
            const url = reader.readAsDataURL(file);
            const result = await new Promise((resolve, reject) => {
                reader.onload = function (event) {
                    resolve(reader.result);
                };
            });
            fileResult.push({
                fileData: file,
                imageData: result,
            });

            if (fileResult.length === fileUpload.length) {
                const clone = [...fileResult];
                setAttachments([...attachments, ...clone]);
                getFile && getFile([...attachments, ...clone]);
            }
        });
    }

    const handleViewImage = (item: any, source: any) => {
        const clone = [...listImageRef.current];
        // eslint-disable-next-line no-restricted-syntax
        for (const key in clone) {
            if (clone[key] === item) {
                setImageIndex(key as any);
                setModalImageView(true);
            }
        }
    };

    const onClickRemoveHandle = (item: any) => {
        const clone = attachments.filter((attach: any) => attach?.imageData !== item?.imageData);
        setAttachments(clone);
        getFile && getFile(clone);
    };

    const handleRemoveVideo = (videoItem: any) => {
        const clone = video.filter((item) => item !== videoItem);
        getVideo && getVideo(clone);
    };

    return (
        <div className={containerClass}>
            <div className={listClass}>
                {!_.isEmpty(uploadedFiles) &&
                    uploadedFiles.map((file, index) => {
                        const fileName = getName(file);
                        const fileExtension = StringUtils.getExtensionFromFilename(fileName)?.toLowerCase();
                        const source = getSource(file);
                        if (
                            maxUploadedImageDisplay &&
                            maxUploadedImageDisplay > 0 &&
                            index >= maxUploadedImageDisplay
                        ) {
                            return null;
                        }

                        return (
                            <RenderPreviewFile
                                item={file}
                                extension={fileExtension}
                                name={fileName}
                                src={source}
                                key={`${fileName}+${fileExtension}`}
                                onRemove={onRemoveUploaded}
                                onViewImage={handleViewImage}
                                removable={removableUploaded}
                                {...(fileItemProps || {})}
                            />
                        );
                    })}
                {attachments &&
                    attachments.map((item: any) => {
                        const fileName = item?.fileData?.name;
                        const fileExtension = StringUtils.getExtensionFromFilename(fileName)?.toLowerCase();
                        return (
                            <RenderPreviewFile
                                item={item}
                                extension={fileExtension}
                                name={fileName}
                                removable
                                onRemove={onClickRemoveHandle}
                                onViewImage={handleViewImage}
                                {...(fileItemProps || {})}
                            />
                        );
                    })}

                {video.length > 0 &&
                    video.map((item) => {
                        return <FilePreview onRemove={() => handleRemoveVideo(item)} removable videoUrl={item} />;
                    })}
                {showButton && isSquare && (
                    <button className={buttonSquareClass} {...getRootProps()} type="button" disabled={disabled}>
                        <Icon name="add" className="text-xl mb-1" />
                        <span className="text-center text-xs">{Messages.browseOrDropHere}</span>
                        <input {...getInputProps(inputParam)} />
                    </button>
                )}
            </div>
            {showButton && !isSquare && (
                <div className="flex justify-end mt-2">
                    <Button disabled={disabled} {...(getRootProps() as any)} type="button" className="btn-primary">
                        <input {...getInputProps(inputParam)} />
                        {buttonText}
                    </Button>
                </div>
            )}
            <ModalLightBox
                open={modalImageView}
                onClose={() => setModalImageView(false)}
                currentIndex={imageIndex}
                images={
                    getImage
                        ? getImage(listImageRef.current)
                        : listImageRef.current?.map((image: any) => {
                              if (!_.isEmpty(image?.imageData)) {
                                  return {
                                      src: image?.imageData,
                                  };
                              }
                              return { src: image };
                          })
                }
            />
        </div>
    );
};

export default ViewFileList;
