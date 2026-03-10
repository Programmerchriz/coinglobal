
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function DropDown({
  list,
  value,
  onChange,
}: DropDownProps) {
  const [curr, setCurr] = useState(list[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="uppercase text-sm text-(--color-50) px-2 hover:bg-(--color-10) hover:cursor-pointer rounded-lg"
        >
          {curr}
          <ChevronDown className="h-4 w-4 text-(--color-30)" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-(--bg-surface) border border-(--color-5) rounded-xl shadow-xl"
      >
        {list.map((item) => {
          const isActive = curr === item;

          return (
            <DropdownMenuItem
              key={item}
              onClick={() => {
                setCurr(item);
                onChange(item);
              }}
              className={`
                uppercase cursor-pointer rounded-lg
                ${isActive ? "bg-(--color-primary) text-white hover:cursor-pointer" : "text-(--color-70)"}
                hover:bg-(--color-10)
              `}
            >
              {item.toUpperCase()}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
