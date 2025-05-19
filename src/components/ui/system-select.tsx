
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// This is a utility wrapper component for the Select component
// that ensures all SelectItem elements have valid, non-empty value props

interface SystemSelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SystemSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  options: SystemSelectOptionProps[];
  disabled?: boolean;
  className?: string;
  groupLabel?: string;
}

export const SystemSelect: React.FC<SystemSelectProps> = ({
  value,
  onValueChange,
  placeholder = 'Select an option',
  label,
  options,
  disabled = false,
  className = '',
  groupLabel,
}) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value || 'placeholder-value'} // Ensure we never have empty string values
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
