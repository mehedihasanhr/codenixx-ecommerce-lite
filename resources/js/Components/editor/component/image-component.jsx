import { Toggle } from "@/Components/ui/toggle";
import {
    IconFloatCenter,
    IconFloatLeft,
    IconFloatNone,
    IconFloatRight,
} from "@tabler/icons-react";
import _ from "lodash";
import React from "react";
import { useClickAway } from "react-use";

const textFormat = [
    {
        title: "Image Default",
        Icon: IconFloatNone,
        style: {
            position: "relative",
        },
        type: "imageFloatNone",
    },
    {
        title: "Image Left",
        Icon: IconFloatLeft,
        style: {
            position: "relative",
            zIndex: "1",
            float: "left",
            paddingRight: "1rem",
            paddingBottom: "1rem",
        },
        type: "imageLeft",
    },
    {
        title: "Image Center",
        Icon: IconFloatCenter,
        style: {
            position: "relative",
            width: "fit-content",
            marginInline: "auto",
        },
        type: "imageCenter",
    },
    {
        title: "Image Right",
        Icon: IconFloatRight,
        style: {
            position: "relative",
            zIndex: "1",
            float: "right",
            paddingLeft: "1rem",
            paddingBottom: "1rem",
        },
        type: "imageRight",
    },
];

export function EditorImageRenderComponent(props) {
    const [activeKey, setActiveKey] = React.useState("imageLeft");
    const [style, setStyle] = React.useState({
        position: "relative",
        zIndex: "1",
    });

    // data
    const data = props.contentState
        .getEntity(props.block.getEntityAt(0))
        .getData();

    // ref
    const imageWrapperRef = React.useRef(null);
    const popoverRef = React.useRef(null);

    // open image editing popover
    const handleImageClick = (e) => {
        e.preventDefault();
        const clientX = e.clientX;
        const clientY = e.clientY;

        const element = popoverRef.current;

        if (element !== null) {
            if (element.getAttribute("data-show") != null) {
                element.toggleAttribute("data-show");
            } else {
                element.toggleAttribute("data-show");
                element.style.position = "fixed";
                element.style.left = `${clientX}px`;
                element.style.top = `${clientY}px`;
            }
        }
    };

    // hide image customization toolbar when click away!
    useClickAway(imageWrapperRef, (event) => {
        const element = popoverRef.current;
        if (element !== null && !element.contains(event.target)) {
            popoverRef?.current?.removeAttribute("data-show");
        }
    });

    return (
        <div style={{ ...style }}>
            {/* Render Image */}
            <div
                className={"relative w-fit h-fit border-primary rounded-sm"}
                ref={imageWrapperRef}
                onClick={handleImageClick}
                aria-hidden
            >
                {data.url !== undefined ? (
                    <img
                        src={data.url}
                        alt={data.alt}
                        className="rounded-sm w-full h-full object-fill"
                    />
                ) : null}
            </div>

            {/* Image customization inline toolbar */}
            <div
                ref={popoverRef}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="z-10 hidden data-[show]:flex w-fit p-1 pb-0.5 gap-0.5 bg-white shadow-md border rounded-lg"
            >
                {_.map(textFormat, ({ title, Icon, style, type }, index) => (
                    <Toggle
                        key={index}
                        size="sm"
                        pressed={activeKey === type}
                        onPressedChange={() => {
                            setStyle(style);
                            setActiveKey(type);
                        }}
                        aria-label={`Toggle ${title}`}
                        className="flex items-center h-8 space-x-1.5 w-full px-2.5 py-1 justify-start"
                    >
                        <Icon size={23} stroke={1.5} opacity={0.6} />
                    </Toggle>
                ))}
            </div>
        </div>
    );
}
