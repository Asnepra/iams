import Picker from '@emoji-mart/react';
import { type PropsWithChildren, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import data from "@emoji-mart/data"

interface EmojiPopoverProps {
  hint?: string;
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPopover = ({ children, hint = 'Emoji', onEmojiSelect }: PropsWithChildren<EmojiPopoverProps>) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onSelect = (emojiData: any) => {
    console.log("Emoji", emojiData);
    onEmojiSelect(emojiData.emoji);

    setPopoverOpen(false);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>

          <TooltipContent className="border border-white/5 bg-black text-white">
            <p className="text-xs font-medium">{hint}</p>
          </TooltipContent>
        </Tooltip>

        <PopoverContent className="w-full border-none p-0 shadow-none">
          <Picker dataa={data} onEmojiClick={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};