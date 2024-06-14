// src/components/FilterComponent.tsx
import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface FilterComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<{ value: string; label: string }>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ value, onChange, options }) => {
  return (
    <TextField
      select
      label="Filter by Class"
      value={value}
      onChange={onChange}
      helperText="Select a class to filter"
      variant="outlined"
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterComponent;