import { notification } from "antd";
import Notifications from "./Notifications";

describe("Notifications", () => {
    beforeEach(() => {
        vi.spyOn(notification, "open").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("exports showError as a function", () => {
        expect(typeof Notifications.showError).toBe("function");
    });

    it("exports showSuccess as a function", () => {
        expect(typeof Notifications.showSuccess).toBe("function");
    });

    it("exports showWarning as a function", () => {
        expect(typeof Notifications.showWarning).toBe("function");
    });

    it("exports showInfo as a function", () => {
        expect(typeof Notifications.showInfo).toBe("function");
    });

    it("showError calls notification.open with notification-error className", () => {
        Notifications.showError("Something failed");
        expect(notification.open).toHaveBeenCalledWith(
            expect.objectContaining({ className: "notification-error" })
        );
    });

    it("showSuccess calls notification.open with notification-success className", () => {
        Notifications.showSuccess("Done!");
        expect(notification.open).toHaveBeenCalledWith(
            expect.objectContaining({ className: "notification-success" })
        );
    });

    it("showWarning calls notification.open with notification-warning className", () => {
        Notifications.showWarning("Watch out");
        expect(notification.open).toHaveBeenCalledWith(
            expect.objectContaining({ className: "notification-warning" })
        );
    });

    it("showInfo calls notification.open with notification-info className", () => {
        Notifications.showInfo("FYI");
        expect(notification.open).toHaveBeenCalledWith(
            expect.objectContaining({ className: "notification-info" })
        );
    });

    it("showError passes extra options to notification.open", () => {
        Notifications.showError("Error", undefined, { duration: 0 });
        expect(notification.open).toHaveBeenCalledWith(
            expect.objectContaining({ duration: 0, className: "notification-error" })
        );
    });
});

describe("Notifications onClick action callbacks", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    const spyAndCapture = () => {
        let captured: any;
        vi.spyOn(notification, "open").mockImplementation((config: any) => {
            captured = config;
        });
        return () => captured;
    };

    it("showError onClick invokes action when provided", () => {
        const getConfig = spyAndCapture();
        const action = vi.fn();
        Notifications.showError("Error", action);
        getConfig().onClick();
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("showWarning onClick invokes action when provided", () => {
        const getConfig = spyAndCapture();
        const action = vi.fn();
        Notifications.showWarning("Warning", action);
        getConfig().onClick();
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("showSuccess onClick invokes action when provided", () => {
        const getConfig = spyAndCapture();
        const action = vi.fn();
        Notifications.showSuccess("Done", action);
        getConfig().onClick();
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("showInfo onClick invokes action when provided", () => {
        const getConfig = spyAndCapture();
        const action = vi.fn();
        Notifications.showInfo("Info", action);
        getConfig().onClick();
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("onClick does not throw when no action is provided", () => {
        const getConfig = spyAndCapture();
        Notifications.showError("Error");
        expect(() => getConfig().onClick()).not.toThrow();
    });
});
