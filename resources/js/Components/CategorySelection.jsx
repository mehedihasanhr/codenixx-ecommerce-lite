import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
// import { categories } from '@/data/product.data';
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import _ from "lodash";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function CategorySelection({ categories, value, onChange }) {
    const [data, setData] = React.useState({});
    const [selected, setSelected] = React.useState("");
    const [previousActive, setPreviousActive] = React.useState("");
    const [activeMenu, setActiveMenu] = React.useState("null");
    const [height, setHeight] = React.useState();

    React.useEffect(() => {
        // group by parents
        const _categories = _.groupBy(categories, "parent_id");
        setData(_categories);
    }, [categories]);

    return (
        <Popover>
            <PopoverTrigger className="w-full h-10 px-3 py-2 border rounded-md text-sm text-left">
                <span className="flex items-center gap-2">
                    <span className="flex-1">
                        {selected ? selected : "Select Category"}
                    </span>
                    <CaretSortIcon />
                </span>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandList
                        className="w-64 max-h-auto transition-[height] duration-300 ease-linear overflow-hidden relative"
                        style={{ height }}
                    >
                        <CommandGroup>
                            {[...Object.keys(data)].map((item, index) => (
                                <React.Fragment key={index}>
                                    <CategoryGroup
                                        item={item.toString()}
                                        value={value}
                                        categories={data[item]}
                                        activeMenu={activeMenu}
                                        setActiveMenu={setActiveMenu}
                                        selected={selected}
                                        setSelected={setSelected}
                                        setHeight={setHeight}
                                        onChange={onChange}
                                        data={data}
                                        previousActive={previousActive}
                                        setPreviousActive={setPreviousActive}
                                    />
                                </React.Fragment>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function CategoryGroup({
    categories,
    activeMenu,
    setActiveMenu,
    onChange,
    setSelected,
    selected,
    value,
    item,
    setHeight,
    data,
    previousActive,
    setPreviousActive,
}) {
    const ref = React.useRef(null);

    const handleHeight = () => {
        const height = ref?.current?.offsetHeight;
        setHeight(height + 10);
    };

    return (
        <CSSTransition
            in={activeMenu === item}
            timeout={100}
            unmountOnExit
            nodeRef={ref}
            onEnter={handleHeight}
            classNames={{
                enter:
                    item === "null"
                        ? "absolute -translate-x-[110%]"
                        : "absolute translate-x-[110%]",
                enterActive: "translate-x-0 transition-all ease-linear",
                exit: "",
                exitActive:
                    item === "null"
                        ? "absolute -translate-x-[110%] transition-all ease-linear"
                        : "absolute translate-[110%] transition-all ease-linear",
            }}
        >
            <div ref={ref} className="bg-popover w-[248px]">
                {activeMenu !== "null" ? (
                    <div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="ml-2 h-7 px-2 text-muted-foreground"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(previousActive);
                            }}
                        >
                            <IconChevronLeft size={15} />
                            <span>Back</span>
                        </Button>
                        <Separator className="mt-2" />
                    </div>
                ) : null}
                {categories.map((category) => (
                    <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={(currentValue) => {
                            setSelected(currentValue);
                            onChange(category.id);
                        }}
                        className="flex items-center"
                    >
                        <IconCheck
                            size={15}
                            className={
                                value === category.id
                                    ? "opacity-6"
                                    : "opacity-0"
                            }
                        />
                        <span className="flex-1 px-1">{category.name} </span>
                        {data.hasOwnProperty(category.id) ? (
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="w-7 h-7"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviousActive(activeMenu);
                                    setActiveMenu(category.id.toString());
                                }}
                            >
                                <IconChevronRight size={15} />
                            </Button>
                        ) : null}
                    </CommandItem>
                ))}
            </div>
        </CSSTransition>
    );
}
