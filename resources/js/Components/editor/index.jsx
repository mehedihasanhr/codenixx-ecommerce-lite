"use client";

import { ScrollArea } from "@/Components/ui/scroll-area";
import { CompositeDecorator, ContentState, convertFromHTML, convertToRaw, DefaultDraftBlockRenderMap, Editor, EditorState, Modifier, SelectionState } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { EditorImageRenderComponent } from "./component/image-component";
import { blockRenderMap, styleMap } from "./config";
import "./styles/editor.css";
import { Toolbar } from "./toolbar";

// Function to find link entities
function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

// Component to render links with custom styles
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>
            {props.children}
        </a>
    );
};

// Create a composite decorator
const decorator = new CompositeDecorator([{
    strategy: findLinkEntities,
    component: Link,
}]);

export default function TextEditor({ defaultValue, onChange, ...props }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));

    useEffect(() => {
        if (defaultValue) {
            const blocksFormHtml = convertFromHTML(defaultValue);
            const state = ContentState.createFromBlockArray(
                blocksFormHtml.contentBlocks,
                blocksFormHtml.entityMap
            );
            setEditorState(EditorState.createWithContent(state, decorator));
        }
    }, []);

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        const raw = convertToRaw(editorState.getCurrentContent());

        const hashtagConfig = { trigger: "#", separator: ' ' };

        const markup = draftToHtml(
            raw,
            hashtagConfig,
            false
        );

        onChange(markup);
    };

    const handlePastedText = (text, html, editorState) => {
        if (html) {
            const blocksFromHTML = convertFromHTML(html);
            let newContentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

            const blockMap = newContentState.getBlockMap();
            blockMap.forEach((block) => {
                block.findEntityRanges(
                    (character) => {
                        const entityKey = character.getEntity();
                        return (
                            entityKey !== null &&
                            newContentState.getEntity(entityKey).getType() === 'LINK'
                        );
                    },
                    (start, end) => {
                        const entityKey = block.getEntityAt(start);
                        if (entityKey) {
                            const entity = newContentState.getEntity(entityKey);
                            const data = entity.getData();
                            const newEntityKey = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', data).getLastCreatedEntityKey();
                            newContentState = Modifier.applyEntity(
                                newContentState,
                                new SelectionState({
                                    anchorKey: block.getKey(),
                                    anchorOffset: start,
                                    focusKey: block.getKey(),
                                    focusOffset: end,
                                }),
                                newEntityKey
                            );
                        }
                    }
                );
            });

            const newState = EditorState.push(editorState, newContentState, 'insert-fragment');
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

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
                    blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
                    blockRendererFn={customBlockRenderer}
                    blockStyleFn={blockStyleFn}
                    handlePastedText={handlePastedText}
                    {...props}
                />
            </ScrollArea>
        </>
    );
}
