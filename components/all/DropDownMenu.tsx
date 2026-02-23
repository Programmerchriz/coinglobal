
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
          className="uppercase text-sm text-white/50 px-2 hover:bg-white/10 rounded-lg"
        >
          {curr}
          <ChevronDown className="h-4 w-4 text-white/30" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#111827] border border-white/5 rounded-xl shadow-xl"
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
                ${isActive ? 'bg-indigo-500 text-white' : 'text-white/70'}
                hover:bg-white/10
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
