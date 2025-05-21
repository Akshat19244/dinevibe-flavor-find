
import React from 'react';
import { Input } from '@/components/ui/input';

type TimePickerInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TimePickerInput = React.forwardRef<HTMLInputElement, TimePickerInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="time"
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
TimePickerInput.displayName = "TimePickerInput";

type TimePickerProps = {
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
};

export const TimePicker = ({ value, onChange, disabled }: TimePickerProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) onChange(newValue);
  };

  return (
    <TimePickerInput
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
