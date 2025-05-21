
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

// Ensure that we never have empty string values in SelectItem
const ensureValidSelectValue = (value: string): string => {
  return value?.trim() ? value : 'placeholder-value';
};

// Filter out any options with empty values before rendering
const getValidOptions = (options: SystemSelectOptionProps[]): SystemSelectOptionProps[] => {
  return options.map(option => ({
    ...option,
    value: ensureValidSelectValue(option.value)
  }));
};

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
  // Make sure we're using a valid value
  const safeValue = value?.trim() ? value : undefined;
  const validOptions = getValidOptions(options);
  
  return (
    <Select
      value={safeValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
          {validOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value} // This is now guaranteed to be non-empty
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
