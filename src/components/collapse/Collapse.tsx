/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// react
import { Fragment, Ref, ReactNode, useCallback, useEffect, useMemo, useRef, useState, ReactElement } from "react";
import Button from "../button/Button";
import Icon from "../elements/icon/Icon";

export interface ICollapseRenderFnData<T extends HTMLElement, P extends HTMLElement> {
    toggle?: () => void;
    setItemRef?: Ref<T>;
    setContentRef?: Ref<P>;
}

export type ICollapseRenderFn<T extends HTMLElement, P extends HTMLElement> = (
    data: ICollapseRenderFnData<T, P>
) => ReactNode;

export interface ICollapseProps<T extends HTMLElement, P extends HTMLElement> {
    toggleClass?: string;
    customRender?: ICollapseRenderFn<T, P>;
    open?: boolean;
    label?: string;
    children: any;
    customIcon?: ReactElement;
}

function Collapse<T extends HTMLElement, P extends HTMLElement>(props: ICollapseProps<T, P>) {
    const { toggleClass = "d-collapse__opened", customRender, open, label, children, customIcon } = props;
    const [init, setInit] = useState(false);
    const itemRef = useRef<T>(null);
    const contentRef = useRef<P>(null);

    const expand = useCallback(
        (immediate = false) => {
            if (!itemRef.current || !contentRef.current) {
                return;
            }

            if (immediate) {
                itemRef.current.classList.add(toggleClass);
                contentRef.current.style.height = "";
            } else {
                const startHeight = contentRef.current.getBoundingClientRect().height;

                itemRef.current.classList.add(toggleClass);

                const endHeight = contentRef.current.getBoundingClientRect().height;

                contentRef.current.style.height = `${startHeight}px`;
                contentRef.current.getBoundingClientRect(); // force reflow
                contentRef.current.style.height = `${endHeight}px`;
            }
        },
        [toggleClass, itemRef, contentRef]
    );

    const collapse = useCallback(
        (immediate = false) => {
            if (!itemRef.current || !contentRef.current) {
                return;
            }

            if (immediate) {
                itemRef.current.classList.remove(toggleClass);
                contentRef.current.style.height = "";
            } else {
                const startHeight = contentRef.current.getBoundingClientRect().height;

                contentRef.current.style.height = `${startHeight}px`;
                itemRef.current.classList.remove(toggleClass);

                contentRef.current.getBoundingClientRect(); // force reflow
                contentRef.current.style.height = "";
            }
        },
        [toggleClass, itemRef, contentRef]
    );

    const handleToggle = useCallback(() => {
        if (!itemRef.current || !contentRef.current) {
            return;
        }

        if (itemRef.current.classList.contains(toggleClass)) {
            collapse();
        } else {
            expand();
        }
    }, [toggleClass, itemRef, contentRef]);

    useEffect(() => {
        if (typeof open === "boolean") {
            if (open) {
                expand(!init);
            } else {
                collapse(!init);
            }
        }

        setInit(true);
    }, [open, init]);

    useEffect(() => {
        if (!contentRef.current) {
            return () => {};
        }

        const handleTransitionEnd = (event: TransitionEvent) => {
            if (contentRef.current && event.propertyName === "height") {
                contentRef.current.style.height = "";
            }
        };

        contentRef.current.addEventListener("transitionend", handleTransitionEnd);

        return () => {
            if (!contentRef.current) {
                return;
            }

            contentRef.current.removeEventListener("transitionend", handleTransitionEnd);
        };
    }, [contentRef]);

    const render = ({ toggle, setItemRef, setContentRef }: any) => {
        if (customRender) {
            return customRender({ toggle, setItemRef, setContentRef });
        }
        return (
            <div className={toggleClass} ref={itemRef as any}>
                <Button className="flex-center-y w-100 justify-content-between" variant="trans" onClick={handleToggle}>
                    <div>{label || "N/A"}</div>
                    {customIcon || <Icon name="expand_more" className="d-collapse__arrow" />}
                </Button>
                <div className="d-collapse__body" ref={contentRef as any}>
                    <div className="filter__container">{children}</div>
                </div>
            </div>
        );
    };

    if (render) {
        return (
            <Fragment>
                {useMemo(
                    () =>
                        render({
                            toggle: handleToggle,
                            setItemRef: itemRef,
                            setContentRef: contentRef,
                        }),
                    [render, handleToggle, itemRef, contentRef]
                )}
            </Fragment>
        );
    }

    return null;
}

export default Collapse;
