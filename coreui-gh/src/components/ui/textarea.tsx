import React, { useCallback, ChangeEvent } from 'react';
import noop from 'lodash/noop';

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  trim?: boolean;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    trim = false,
    onValueChange = noop,
    ...props
  }, ref) => {

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let inputValue = e.target.value;
        if (inputValue && trim) inputValue = inputValue.trim();
        onValueChange(inputValue);
      },
      [onValueChange],
    );

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
