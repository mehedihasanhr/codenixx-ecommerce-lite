import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { TextAlignLeftIcon, TriangleDownIcon } from "@radix-ui/react-icons";

import { Toggle } from "@/Components/ui/toggle";
import {
    IconAlignCenter,
    IconAlignJustified,
    IconAlignLeft,
    IconAlignRight,
} from "@tabler/icons-react";
import { EditorState, Modifier, SelectionState } from "draft-js";
import { Map } from "immutable";
import _ from "lodash";
import { getFocusedBlock } from "../utils";

const textFormat = [
    {
        title: "Align left",
        Icon: IconAlignLeft,
        style: "TEXTALIGNLEFT",
        align: "left",
    },
    {
        title: "Align center",
        Icon: IconAlignCenter,
        style: "TEXTALIGNCENTER",
        align: "center",
    },
    {
        title: "Align right",
        Icon: IconAlignRight,
        style: "TEXTALIGNRIGHT",
        align: "right",
    },
    {
        title: "Align justify",
        Icon: IconAlignJustified,
        style: "TEXTALIGNJUSTIFY",
        align: "justify",
    },
];

export function TextFormatting({ editorState, onChange }) {
    // toggle text alignment
    const toggleAlignment = (align) => {
        let newEditorState = editorState;

        const currentContent = editorState.getCurrentContent();
        const currentSelection = editorState.getSelection();

        const blockMap = currentContent.getBlockMap();

        // If the selection spans multiple blocks, adjust it to include the full blocks
        const startKey = currentSelection.getStartKey();
        const endKey = currentSelection.getEndKey();
        const startBlock = blockMap.get(startKey);
        const endBlock = blockMap.get(endKey);
        const startOffset = currentSelection.getStartOffset();
        const endOffset = currentSelection.getEndOffset();
        let newSelection = currentSelection;

        if (
            startKey !== endKey ||
            startOffset !== 0 ||
            endOffset !== endBlock.getLength()
        ) {
            newSelection = new SelectionState({
                anchorKey: startBlock.getKey(),
                anchorOffset: 0,
                focusKey: endBlock.getKey(),
                focusOffset: endBlock.getLength(),
            });
        }

        const newContentState = Modifier.setBlockData(
            currentContent,
            newSelection,
            Map({
                style: {
                    textAlign: align,
                },
            })
        );

        newEditorState = EditorState.push(
            newEditorState,
            newContentState,
            "change-inline-style"
        );

        onChange(newEditorState);
    };

    // check is active or not
    const isActive = (align) => {
        const block = getFocusedBlock(editorState);
        const blockStyle = block.getData().get("style");

        if (blockStyle === undefined || blockStyle.textAlign === undefined) {
            return align === "left";
        } else {
            return blockStyle.textAlign === align;
        }
    };

    return (
        <Popover>
            <PopoverTrigger className="text-sm pl-2 pr-1 text-muted-foreground hover:bg-primary/20 hover:text-foreground/80 h-8 rounded-sm flex items-center">
                <TextAlignLeftIcon className="h-4 w-4" />
                <TriangleDownIcon className="h-4 w-4 opacity-50" />
            </PopoverTrigger>
            <PopoverContent
                className="w-fit p-1 pb-0.5 flex gap-0.5"
                align="start"
            >
                {_.map(textFormat, ({ title, Icon, style, align }, index) => (
                    <Toggle
                        key={index}
                        size="sm"
                        pressed={isActive(align)}
                        onPressedChange={() => toggleAlignment(align)}
                        aria-label={`Toggle ${title}`}
                        className="flex items-center h-8 space-x-1.5 w-full px-2.5 py-1 justify-start"
                    >
                        <Icon size={23} stroke={1.5} opacity={0.6} />
                    </Toggle>
                ))}
            </PopoverContent>
        </Popover>
    );
}
