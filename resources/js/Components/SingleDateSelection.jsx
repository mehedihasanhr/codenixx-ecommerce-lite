import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function SingleDateSelection({ date, setDate }) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="flex items-center gap-2.5 border h-9 w-44 px-3 rounded-lg text-sm border-dashed hover:border-primary/50">
                <CalendarDays size={15} className="text-muted-foreground" />
                {date ? (
                    dayjs(date).format("MMM DD, YYYY")
                ) : (
                    <span className="text-sm text-muted-foreground">
                        Select Date
                    </span>
                )}
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={date => {
                        setDate(date);
                        setOpen(false)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
