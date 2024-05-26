import { Map } from "immutable";

export const styleMap = {
    STRIKETHROUGH: { textDecoration: "line-through" },
};

export const blockRenderMap = Map({
    "unordered-list-item-disc": {
        element: "li",
        wrapper: <ul style={{ listStyleType: "disc" }} />,
    },
    "unordered-list-item-square": {
        element: "li",
        wrapper: <ul style={{ listStyleType: "square" }} />,
    },
    "ordered-list-item-alpha": {
        element: "li",
        wrapper: <ol style={{ listStyleType: "lower-alpha" }} />,
    },
    "ordered-list-item-roman": {
        element: "li",
        wrapper: <ol style={{ listStyleType: "lower-roman" }} />,
    },
    "ordered-list-item": {
        element: "li",
        wrapper: <ol />,
    },
});
