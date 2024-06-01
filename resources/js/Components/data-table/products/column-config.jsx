import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { IconSettings } from "@tabler/icons-react";

export default function ColumnsConfig({table}) {
  return (
    <Popover>
        <PopoverTrigger asChild className="flex items-center gap-1">
           <Button variant="outline" size="sm">
                <IconSettings size={17} />
                <span>Columns</span>
           </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-fit flex flex-col gap-1.5">
            {table.getAllColumns().map(column => (
                <Label key={column.id} className="flex items-center gap-2 font-normal">
                    <Checkbox
                        checked={column.getIsVisible()}
                        disabled={!column.getCanHide()}
                        onCheckedChange={(checked) => column.toggleVisibility(checked)}
                    />
                    {column.columnDef.header}
                </Label>
            ))}
        </PopoverContent>
    </Popover>
  )
}
