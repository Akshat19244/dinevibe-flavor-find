
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SystemSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
  className?: string;
}

export const SystemSelect: React.FC<SystemSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  className = ""
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
