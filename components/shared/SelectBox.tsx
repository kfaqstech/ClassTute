import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { ThemedView } from '../ThemedView';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const SelectBox: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <ThemedView>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={{ height: 50 }}
      >
        {options.map((option) => (
          <Picker.Item key={option.value.toString()} label={option.label} value={option.value} />
        ))}
      </Picker>
    </ThemedView>
  );
};

export default SelectBox;
