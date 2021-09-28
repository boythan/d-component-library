/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// react
import ClassNames from "classnames";
// third-party
import _ from "lodash";
import React, { useEffect, useRef, useState, ImgHTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import Carousel, { Modal, ModalGateway } from "react-images";
// data stubs
import Messages from "../../language/Messages";
import { DOC, EXCEL, PDF, IMAGE } from "../../utils/ImageUtils";
import StringUtils from "../../utils/StringUtils";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import Notifications from "../notifications/Notifications";
// application

const FILE_TYPE = [DOC, EXCEL, PDF];

export interface IFilePreviewProps extends ImgHTMLAttributes<any> {
    onClick?: (props?: any) => any;
    onRemove?: (props?: any) => any;
    removable?: boolean;
    videoUrl?: any;
}

export interface IRenderPreviewFileProps extends IFilePreviewProps {
    item?: any;
    extension?: any;
    name?: any;
    onViewImage?: (props?: any, src?: any) => any;
}

export const FilePreview: React.FC<IFilePreviewProps> = ({
    src,
    onRemove,
    onClick,
    removable = true,
    videoUrl = null,
}) => {
    let children = (
        <img
            className="image-upload-item__image image-square-x-large"
            src={src}
            onClick={() => onClick && onClick()}
            alt="upload-item"
        />
    );
    if (videoUrl) {
        children = (
            <iframe
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                title="item"
                className="upload-file-container__preview-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                width="200px"
                height="126px"
            />
        );
    }
    return (
        <div className="image-upload-item mr-2 ml-2">
            {removable && (
                <div onClick={() => onRemove && onRemove()} className="image-upload-item__remove">
                    <Icon name="delete" />
                </div>
            )}
            {children}
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
}) => {
    if (IMAGE.extension.includes(extension)) {
        return (
            <div className="d-view-file-list__file-preview">
                <FilePreview
                    onRemove={() => onRemove && onRemove(item)}
                    src={src || item?.imageData}
                    removable={!!removable}
                    onClick={() => onViewImage && onViewImage(item, src)}
                />
                {/* <text id="fileNameText">{name}</text> */}
            </div>
        );
    }
    return (
        <React.Fragment>
            {FILE_TYPE.map((type) => {
                if (type.extension.includes(extension)) {
                    return (
                        <div className="d-view-file-list__file-preview">
                            <a href={item?.url} target="_blank" rel="noreferrer">
                                <FilePreview
                                    onRemove={() => onRemove && onRemove(item)}
                                    src={type.iconFile}
                                    removable={removable}
                                />
                                {!removable && <div className="d-view-file-list__download-icon">get app icon</div>}
                            </a>
                            {/* <text id="fileNameText">{name}</text> */}
                        </div>
                    );
                }
                return null;
            })}
        </React.Fragment>
    );
};

export interface IViewFileListProps {
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
}

const ViewFileList: React.FC<IViewFileListProps> = ({
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
    const containerClass = ClassNames("d-view-file-list", "d-flex", "mt-3", {
        "flex-column": !isSquare,
        "align-items-start": isSquare,
    });

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
            <div className="d-view-file-list__preview">
                {!_.isEmpty(uploadedFiles) &&
                    uploadedFiles.map((file) => {
                        const fileName = getName(file);
                        const fileExtension = StringUtils.getExtensionFromFilename(fileName)?.toLowerCase();
                        const source = getSource(file);
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
                            />
                        );
                    })}

                {video.length > 0 &&
                    video.map((item) => {
                        return <FilePreview onRemove={() => handleRemoveVideo(item)} removable videoUrl={item} />;
                    })}
                {showButton && isSquare && (
                    <button
                        className="product-create__gallery-add-image ml-2 border-dashed text-x-small border-primary text-center d-flex align-items-center justify-content-center  hover-pointer"
                        {...getRootProps()}
                        type="button"
                        disabled={disabled}
                    >
                        <small className="text-center mt-1">{Messages.browseOrDropHere}</small>
                        <input {...getInputProps(inputParam)} />
                    </button>
                )}
            </div>
            {showButton && !isSquare && (
                <div className="d-flex justify-content-end">
                    <Button disabled={disabled} {...(getRootProps() as any)} type="button" className="btn-primary p-3">
                        <input {...getInputProps(inputParam)} />
                        {buttonText}
                    </Button>
                </div>
            )}
            <ModalGateway>
                {modalImageView ? (
                    <Modal onClose={() => setModalImageView(false)}>
                        <Carousel
                            currentIndex={imageIndex}
                            views={
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
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default ViewFileList;
