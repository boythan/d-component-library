import React from "react";
import Avatar from "../../../components/avatar/Avatar";
import AvatarName from "../../../components/avatar/AvatarName";
import Icon from "../../../components/icon/Icon";

export interface TestAvatarIconProps {
    [key: string]: any;
}

const TestAvatarIcon: React.FC<TestAvatarIconProps> = ({ id }) => {
    return (
        <React.Fragment>
            <div className="d-flex align-items-center my-3">
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="x-large"
                    className="mx-3"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="large"
                    className="mx-3"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="medium"
                    className="mx-3"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="small"
                    className="mx-3"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="x-small"
                    className="mx-3"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="xx-small"
                    className="mx-3"
                />
            </div>
            <div className="d-flex align-items-center my-3">
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="x-large"
                    className="mx-3"
                    variant="square"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="large"
                    className="mx-3"
                    variant="square"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="medium"
                    className="mx-3"
                    variant="square"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="small"
                    className="mx-3"
                    variant="square"
                />
                <Avatar
                    src="https://c4.wallpaperflare.com/wallpaper/462/200/955/face-women-model-portrait-wallpaper-preview.jpg"
                    size="x-small"
                    className="mx-3"
                    variant="square"
                />
            </div>
            <div className="d-flex align-items-center my-4">
                <Avatar size="x-large" className="mx-3" text="Joker" />
                <Avatar size="large" className="mx-3" text="Joker" />
                <Avatar size="medium" className="mx-3" text="Joker" />
                <Avatar size="small" className="mx-3" text="Joker" />
                <Avatar size="x-small" className="mx-3" text="Joker" />
                <Avatar size="xx-small" className="mx-3" text="Joker" />
            </div>
            <div className="d-flex align-items-center my-4">
                <Avatar size="x-large" className="mx-3" variant="square" text="Batman" />
                <Avatar size="large" className="mx-3" variant="square" text="Batman" />
                <Avatar size="medium" className="mx-3" variant="square" text="Batman" />
                <Avatar size="small" className="mx-3" variant="square" text="Batman" />
                <Avatar size="x-small" className="mx-3" variant="square" text="Batman" />
                <Avatar size="xx-small" className="mx-3" variant="square" text="Batman" />
            </div>
            <div className="d-flex align-items-center my-4">
                <Icon size="large" className="mx-3" name="photo_camera" />
                <Icon size="x-large" className="mx-3" name="photo_camera" />
                <Icon size="xx-large" className="mx-3" name="photo_camera" />
                <Icon size="xxx-large" className="mx-3" name="photo_camera" />
            </div>
            <div className="d-flex align-items-center my-4">
                <AvatarName
                    user={{
                        fullName: "Amanda",
                    }}
                    subLabel="Actress"
                    size="x-large"
                />
            </div>
        </React.Fragment>
    );
};

export default TestAvatarIcon;
