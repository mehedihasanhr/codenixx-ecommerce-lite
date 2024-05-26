import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { ListBulletIcon, TriangleDownIcon } from "@radix-ui/react-icons";

import { Toggle } from "@/Components/ui/toggle";
import {
    IconList,
    IconListLetters,
    IconListNumbers,
} from "@tabler/icons-react";
import _ from "lodash";
import { isStyleActive, toggleBlock } from "../utils";

const textFormat = [
    {
        title: "List bullet",
        Icon: IconList,
        block: "unordered-list-item-disc",
        type: "UnOrderList-bullet",
    },

    {
        title: "List number",
        Icon: IconListNumbers,
        block: "ordered-list-item",
        type: "OrderList-numeric",
    },
    {
        title: "List letters",
        Icon: IconListLetters,
        block: "ordered-list-item-alpha",
        type: "OrderList-alphabet",
    },
];

export function ListFormatting({ editorState, onChange }) {
    return (
        <Popover>
            <PopoverTrigger className="text-sm pl-2 pr-1 text-muted-foreground hover:bg-primary/20 hover:text-foreground/80 h-8 rounded-sm flex items-center">
                <ListBulletIcon className="h-4 w-4" />
                <TriangleDownIcon className="h-4 w-4 opacity-50" />
            </PopoverTrigger>
            <PopoverContent
                className="w-fit p-1 pb-0.5 flex gap-0.5"
                align="start"
            >
                {_.map(textFormat, ({ title, Icon, block, type }, index) => (
                    <Toggle
                        key={index}
                        size="sm"
                        pressed={isStyleActive(editorState, block)}
                        onPressedChange={() =>
                            toggleBlock(editorState, onChange, block)
                        }
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
