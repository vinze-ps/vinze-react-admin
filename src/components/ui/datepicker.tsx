"use client";

import * as React from "react";

import moment from "moment";
import { pl } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import {Input} from "@/components/ui/input.tsx";

export function DatePicker() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <Input
        endContent={
          <PopoverTrigger>
            test
          </PopoverTrigger>
        }
        onValueChange={(value) => {
          setInputValue(value);
          moment(value).isValid() && setDate(moment(value).toDate());
        }}
        value={moment(date).isValid() ? moment(date).format("YYYY-MM-DD") : inputValue}
        size="sm"
        type="date"
      />
      {/* <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button> */}

      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} locale={pl} />
      </PopoverContent>
    </Popover>
  );
}
