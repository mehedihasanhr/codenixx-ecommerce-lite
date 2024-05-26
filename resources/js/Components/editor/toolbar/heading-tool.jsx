import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Toggle } from "@/Components/ui/toggle";
import { HeadingIcon } from "@radix-ui/react-icons";
import {
    IconH1,
    IconH2,
    IconH3,
    IconH4,
    IconH5,
    IconH6,
    IconLetterNSmall,
} from "@tabler/icons-react";
import _ from "lodash";
import { isActiveBlock, toggleBlock } from "../utils";

const headings = [
    {
        title: "Heading 1",
        Icon: IconH1,
        block: "header-one",
        content: <h1>Heading 1</h1>,
    },
    {
        title: "Heading 2",
        Icon: IconH2,
        block: "header-two",
        content: <h2>Heading 2</h2>,
    },
    {
        title: "Heading 3",
        Icon: IconH3,
        block: "header-three",
        content: <h3>Heading 3</h3>,
    },
    {
        title: "Heading 4",
        Icon: IconH4,
        block: "header-four",
        content: <h4>Heading 4</h4>,
    },
    {
        title: "Heading 5",
        Icon: IconH5,
        block: "header-five",
        content: <h5>Heading 5</h5>,
    },
    {
        title: "Heading 6",
        Icon: IconH6,
        block: "header-six",
        content: <h6>Heading 6</h6>,
    },
    {
        title: "Normal",
        Icon: IconLetterNSmall,
        block: "unstyled",
        content: <span>Normal</span>,
    },
];

export function HeadingButtons({ editorState, onChange }) {
    return (
        <Popover>
            <PopoverTrigger className="text-sm px-2.5 text-muted-foreground hover:bg-primary/20 hover:text-foreground/80 h-8 rounded-sm flex items-center">
                <HeadingIcon />
            </PopoverTrigger>
            <PopoverContent
                className="w-fit p-1 pb-0.5 flex flex-col gap-0.5"
                align="start"
            >
                {_.map(headings, ({ title, Icon, block, content }, index) => (
                    <Toggle
                        key={index}
                        size="sm"
                        pressed={isActiveBlock(editorState, block)}
                        onPressedChange={() =>
                            toggleBlock(editorState, onChange, block)
                        }
                        aria-label={`Toggle ${title}`}
                        className="flex items-center space-x-1.5 w-full px-2.5 py-1 h-fit justify-start"
                    >
                        <Icon />
                        {content}
                    </Toggle>
                ))}
                {/* StrikeThrough */}
            </PopoverContent>
        </Popover>
    );
}
