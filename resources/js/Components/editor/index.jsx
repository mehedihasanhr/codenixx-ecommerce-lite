"use client";

import { ScrollArea } from "@/Components/ui/scroll-area";
import { DefaultDraftBlockRenderMap, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { useState } from "react";
import { EditorImageRenderComponent } from "./component/image-component";
import { blockRenderMap, styleMap } from "./config";
import "./styles/editor.css";
import { Toolbar } from "./toolbar";

export default function TextEditor({ defaultValue, onChange, ...props }) {
    const [editorState, setEditorState] = useState(
        () => defaultValue ?? EditorState.createEmpty()
    );

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        onChange(JSON.stringify(editorState));
    };

    // blockStyleFn
    const blockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        const blockStyle = contentBlock.getData().get("style");
        const BlockType = {
            BASIC_BLOCKS: [
                "unstyled",
                "header-one",
                "header-two",
                "header-three",
                "header-four",
                "header-five",
                "header-six",
                "blockquote",
                "code-block",
            ],
        };

        let cls = "";
        switch (type) {
            case "unstyled":
                cls = "RichEditor-style__initial-unstyled";
                break;
            case "atomic":
                cls = "RichEditor-style__initial-atomic";
                break;
            default:
        }

        if (
            Object.keys(BlockType.BASIC_BLOCKS).some(
                (key) => BlockType.BASIC_BLOCKS[key] === type
            )
        ) {
            cls += ` RichEditor-style__text-align-${
                blockStyle?.textAlign ?? "left"
            }`;
        }

        if (type === "blockquote") {
            cls += ` RichEditor-style__blockquote`;
        }

        return cls;
    };

    // custom render component
    function customBlockRenderer(contentBlock) {
        const type = contentBlock.getType();
        if (type === "atomic") {
            return {
                component: EditorImageRenderComponent,
                editable: false,
                props: {
                    editorState,
                    onChange,
                },
            };
        }
    }

    return (
        <>
            <Toolbar editorState={editorState} onChange={handleEditorChange} />

            <ScrollArea className="h-[300px] bg-background border border-border rounded-lg px-4">
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    customStyleMap={styleMap}
                    blockRenderMap={DefaultDraftBlockRenderMap.merge(
                        blockRenderMap
                    )}
                    blockRendererFn={customBlockRenderer}
                    blockStyleFn={blockStyleFn}
                    {...props}
                />
            </ScrollArea>
        </>
    );
}
